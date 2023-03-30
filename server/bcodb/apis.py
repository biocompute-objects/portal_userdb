#!/usr/bin/env python3 bcodb/apis.py

"""BCODB APIs
"""

from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from users.selectors import profile_from_username, user_from_username
from authentication.services import custom_jwt_handler
from bcodb.services import create_bcodb
from bcodb.selectors import get_bcodb


@api_view(["GET"])
def getRouts(request):
    routs = [{"GET": "api/bcodb"}, {"POST": "api/users/token"}]
    return Response(routs)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getBcoDb(request):
#     bcodb = BcoDb.objects.all()
#     serialize = BcoDbSerializer(bcodb, many=True)
#     return Response(serialize.data)

class AddBcodbApi(APIView):
    """Add BcoDb object"""

    @swagger_auto_schema(
        responses={
            200: "BCODB creation is successful.",
            409: "Conflict.",
        },
        tags=["BCODB Management"],
    )

    @transaction.atomic
    def post(self, request):
        """"""
        try:
            data = request.data["data"]
        except KeyError:
            data = request.data
        now = datetime.utcnow()
        profile = profile_from_username(request.user.username)
        input_fileter = {
            "hostname": data["hostname"],
            "bcodb_username": data["username"],
            "human_readable_hostname": data["human_readable_hostname"],
            "public_hostname": data["public_hostname"],
            "token": data["token"],
            "owner": profile.id,
            "user_permissions": data["other_info"]["permissions"]["user"],
            "group_permissions": data["other_info"]["permissions"]["groups"],
            "account_creation": data["other_info"]["account_creation"],
            "account_expiration": data["other_info"]["account_expiration"],
            "last_update": now.isoformat(),
            "recent_status": "200",
            "recent_attempt": now.isoformat(),
        }

        create_bcodb(data=input_fileter)
        user_info = custom_jwt_handler(
            request._auth, user_from_username(request.user.username)
        )

        return Response(status=status.HTTP_200_OK, data=user_info)

class RemoveBcodbApi(APIView):
    """Remove a BCODB from a user account"""

    @swagger_auto_schema(
        responses={
            200: "BCODB removal is successful.",
            409: "Conflict.",
        },
        tags=["BCODB Management"],
    )

    @transaction.atomic
    def post(self, request):
        """"""
        profile = profile_from_username(request.user.username)
        db = request.data['database']
        bcodb = get_bcodb(
            profile, db['bcodb_username'], db['hostname'], db['token']
        )
        if bcodb == 'DoesNotExist':
            return Response(status=status.HTTP_404_NOT_FOUND, data={'message': 'That BCO DB was not found'})
        bcodb.delete()
        user_info = custom_jwt_handler(
            request._auth, user_from_username(request.user.username)
        )

        return Response(status=status.HTTP_200_OK, data=user_info)