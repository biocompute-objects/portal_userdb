# authentication/services.py

import requests
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from users.services import UserSerializer, ProfileSerializer
from bcodb.models import BcoDb
from bcodb.services import BcoDbSerializer
from users.models import Profile



def googleAuthentication(request):
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
    """JWT"""
    serialized_user = UserSerializer(user).data
    profile, created = Profile.objects.get_or_create(
        username=serialized_user["username"], email=serialized_user["email"]
    )
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
