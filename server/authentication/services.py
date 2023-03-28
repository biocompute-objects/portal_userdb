# authentication/services.py

import uuid
import requests
from datetime import datetime
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from bcodb.models import BcoDb
from bcodb.services import BcoDbSerializer, update_bcodbs
from users.models import Profile
from users.services import UserSerializer, ProfileSerializer
from users.selectors import profile_from_username
from rest_framework_jwt.utils import unix_epoch

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
