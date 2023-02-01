# authentication/services.py

import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from bcodb.models import BcoDb
from bcodb.services import BcoDbSerializer, update_bcodbs
from users.models import Profile
from users.services import UserSerializer, ProfileSerializer

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
            "profile": ProfileSerializer(user).data,
            "bcodbs": serialized_dbs.data,
        },
    }
