#!/usr/bin/env python3
"""Authentication Services
Service functions for operations with the authentication app
"""

import jwt
import json
import uuid
import requests
from datetime import datetime
from django.conf import settings
from rest_framework import status, exceptions
from rest_framework.response import Response
from rest_framework_jwt.serializers import VerifyAuthTokenSerializer
from rest_framework_jwt.settings import api_settings
from bcodb.models import BcoDb
from users.models import Profile
from users.services import UserSerializer, ProfileSerializer
from users.selectors import profile_from_username
from rest_framework_jwt.utils import unix_epoch
from rest_framework_jwt.authentication import BaseAuthentication
from django.contrib.auth.models import AnonymousUser, User
from bcodb.services import update_bcodbs
from rest_framework import serializers

class BcoDbSerializer(serializers.ModelSerializer):
    """Serializer for BCODB objects"""
    class Meta:
        model = BcoDb
        fields = (
            "hostname",
            "bcodb_username",
            "human_readable_hostname",
            "public_hostname",
            "token",
            "owner",
            "user_permissions",
            "group_permissions",
            "account_creation",
            "account_expiration",
            "last_update",
            "recent_status",
            "recent_attempt",
        )

class CustomJSONWebTokenAuthentication(BaseAuthentication):
    """Class for custom authentication
    """

    def authenticate(self, request):
        print("CustomJSONWebTokenAuthentication")
        if "Authorization" in request.headers:
            kind, token = request.headers['Authorization'].split(' ')

            try:
                unverified_payload = jwt.decode(
                    token, None, False, options={"verify_signature": False}
                )
                if unverified_payload['iss'] == 'https://orcid.org' or unverified_payload['iss'] == 'https://sandbox.orcid.org':
                    user = authenticate_orcid(unverified_payload, token)
                    try:
                        return (user, token)
                    except UnboundLocalError as exp:
                        raise exceptions.AuthenticationFailed(
                            "Authentication failed. Token issuer not found.",
                            "Please contact the site admin"
                        )
                
                if unverified_payload['iss'] in [
                    'http://localhost:8080',
                    'https://test.portal.biochemistry.gwu.edu',
                    'https://biocomputeobject.org'
                ]:
                    user = self.authenticate_portal(unverified_payload, token)
                    try:
                        return (user, token)
                    except UnboundLocalError as exp:
                        raise exceptions.AuthenticationFailed(
                            "Authentication failed. Token issuer not found.",
                            "Please contact the site admin"
                        )
            except Exception as exp:
                raise exceptions.AuthenticationFailed(exp)
        else:
            pass
        pass

    def authenticate_portal(self, payload: dict, token:str)-> User:
        """Authenticate Portal
        Custom function to authenticate BCO Portal credentials.
        """
        
        response = requests.post(
            payload['iss']+'/users/auth/verify/', json={"token":token}
        )
        if response.status_code == 201:
            try:
                return User.objects.get(email=payload['email'])
            except User.DoesNotExist:
                return None
        else:
            print(response.reason)
            exceptions.AuthenticationFailed(response.reason)

def authenticate_orcid(payload:dict, token:str):
    """Authenticate ORCID
    
    Custom function to authenticate ORCID credentials.
    """
    try:
        orcid_jwks = {
            jwk['kid']: json.dumps(jwk)
            for jwk in requests.get(payload['iss']+'/oauth/jwks').json()['keys']
        }
        orcid_jwk = next(iter(orcid_jwks.values()))
        orcid_key = jwt.algorithms.RSAAlgorithm.from_jwk(orcid_jwk)    
    except Exception as exp:
        print('exp:', exp)
        raise exceptions.AuthenticationFailed(exp)
    
    try:
        verified_payload = jwt.decode(token, key=orcid_key, algorithms=['RS256'], audience=['APP-88DEA42BRILGEHKC', 'APP-ZQZ0BL62NV9SBWAX'])
    except Exception as exp:
        print('exp:', exp)
        raise exceptions.AuthenticationFailed(exp)
    user = User.objects.get(
        username=Profile.objects.get(orcid__icontains=verified_payload['sub'])
    )

    return user

def orcid_auth_code(code: str)-> Response:
    """
    """
    data = {
        "client_id": settings.ORCID_CLIENT,
        "client_secret": settings.ORCID_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": settings.CLIENT + "/login"
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    response = requests.post(settings.ORCID_URL + "/oauth/token", data=data, headers=headers)

    return response.json()

def google_authentication(request):
    """Google Authentication"""

    client_id = (
        "404409424650-a1hh4j6m9r3998v16siia2lum9un21ip.apps.googleusercontent.com"
    )
    response = requests.get(
        "https://www.googleapis.com/oauth2/v3/tokeninfo",
        params={"id_token": request.data["id_token"]},
    )

    if not response.ok:
        return Response(
            status=status.HTTP_401_UNAUTHORIZED,
            data={"message": "Authentication from Service failed"},
        )

    if response.json()["aud"] != client_id:
        return Response(
            status=status.HTTP_400_BAD_REQUEST, data={"message": "Invalid Client Id"}
        )

    return response.json()

def custom_jwt_create_payload(user):
    """Create custom JWT claims token.

    To be more standards-compliant please refer to the official JWT standards
    specification: https://tools.ietf.org/html/rfc7519#section-4.1

    Needed additional feilds in the JWT payload so this overrides the default.
    """

    issued_at_time = datetime.utcnow()
    expiration_time = issued_at_time + api_settings.JWT_EXPIRATION_DELTA
    payload = {
        'username': user.get_username(),
        'email': user.email,
        'iss': settings.ORIGIN,
        'iat': unix_epoch(issued_at_time),
        'exp': expiration_time
    }

    if api_settings.JWT_TOKEN_ID != 'off':
        payload['jti'] = uuid.uuid4()

    if api_settings.JWT_PAYLOAD_INCLUDE_USER_ID:
        payload['user_id'] = user.pk

    # It's common practice to have user object attached to profile objects.
    # If you have some other implementation feel free to create your own
    # `jwt_create_payload` method with custom payload.
    if hasattr(user, 'profile'):
        payload['user_profile_id'] = user.profile.pk if user.profile else None,

    # Include original issued at time for a brand new token
    # to allow token refresh
    if api_settings.JWT_ALLOW_REFRESH:
        payload['orig_iat'] = unix_epoch(issued_at_time)

    if api_settings.JWT_AUDIENCE is not None:
        payload['aud'] = api_settings.JWT_AUDIENCE

    if api_settings.JWT_ISSUER is not None:
        payload['iss'] = api_settings.JWT_ISSUER

    return payload

def custom_jwt_handler(token, user=None, request=None, public_key=None):
    """Custom JWT Handler
    Triggered by any user authentication. This will gater all the associated
    user information and return that along with the validated JWT
    """

    serialized_user = UserSerializer(user).data
    profile, created = Profile.objects.get_or_create(
        username=serialized_user["username"], email=serialized_user["email"]
    )
    update_bcodbs(profile=profile)
    bcodbs = BcoDb.objects.filter(owner=profile)
    serialized_dbs = BcoDbSerializer(bcodbs, many=True)
    return {
        "token": token,
        "user": {
            "userinfo": serialized_user,
            "profile": ProfileSerializer(profile_from_username(user.username)).data,
            "bcodbs": serialized_dbs.data,
        },
    }
