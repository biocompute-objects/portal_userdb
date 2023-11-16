#!/usr/bin/env python3 bcodb/apis.py

"""BCODB APIs
"""

from django.conf import settings
from django.db import transaction
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from users.selectors import profile_from_username, user_from_username
from authentication.services import custom_jwt_handler
from bcodb.selectors import get_bcodb
from bcodb.models import BcoDb, BCO
from rest_framework import serializers
from authentication.services import CustomJSONWebTokenAuthentication
from django.contrib.auth.models import User
from authentication.selectors import get_temp_draft

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

class BcoSerializer(serializers.ModelSerializer):
    """Serializer for BCO objects"""
    class Meta:
        model = BCO
        fields = ("owner", "contents")

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

        bcodb_serializer = BcoDbSerializer(data=input_fileter)
        bcodb_serializer.is_valid(raise_exception=True)
        bcodb_serializer.save()
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

class AddTempDraftBcoAPI(APIView):
    """Saves a temp draft BCO
    """
    
    authentication_classes = [CustomJSONWebTokenAuthentication,]
    permission_classes = []
    
    schema = openapi.Schema(
        type=openapi.TYPE_OBJECT,
        title="Add Draft BCO",
        description="Adds a draft bco to the temp table",
        required=["contents"],
        properties={
            "contents": openapi.Schema(
                type=openapi.TYPE_OBJECT,
                description="The BCO contents in JSON",
            )
        }
    )
    
    @swagger_auto_schema(
        request_body=schema,
        responses={
            200: "BCO temp draft creation is successful.",
            400: "Bad request.",
            409: "Conflict.",
        },
        tags=["BCODB Management"],
    )

    def post(self, request):
        hostname = settings.PUBLIC_HOSTNAME
        try:
            user = User.objects.get(username=request.user)
        except User.DoesNotExist:
            user = None

        try:
            data_to_serialize = {"owner" : user, "contents": request.data["contents"]}
        except KeyError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data="Bad request. Unable to serialize submitted data"
            )
        bco_serializer = BcoSerializer(data=data_to_serialize)
        bco_serializer.is_valid(raise_exception=True)
        bco_pk = bco_serializer.save().id
        object_id = f"{hostname}/builder?{bco_pk}"
        bco = BCO.objects.get(pk=bco_pk)
        bco.contents['object_id'] = object_id
        bco.save()
        return Response(status=status.HTTP_200_OK, data={"object_id": object_id})

class DeleteTempDraftBco(APIView):
    """Saves a temp draft BCO
    """
    
    authentication_classes = [CustomJSONWebTokenAuthentication,]
    permission_classes = []

    def post(self, request):
        return Response(status=status.HTTP_200_OK)

class GetDraftBcoAPI(APIView):
    """Retrieves a draft BCO
    """
    
    authentication_classes = [CustomJSONWebTokenAuthentication,]
    permission_classes = []
    
    schema = openapi.Schema(
        type=openapi.TYPE_OBJECT,
        title="Add Draft BCO",
        description="Adds a draft bco to the temp table",
        required=["bco_id"],
        properties={
            "bco_id": openapi.Schema(
                type=openapi.TYPE_STRING,
                description="The BCO ID",
            )
        }
    )
    
    @swagger_auto_schema(
        request_body=schema,
        responses={
            200: "BCO draft retrieved.",
            401: "You are not authorized to access object {bco_id}",
            404: "Object {bco_id} not found",
            409: "Conflict.",
        },
        tags=["BCODB Management"],
    )

    def post(self, request):
        bco_id = request.data["bco_id"]
        contents = get_temp_draft(user=request.user, bco_id=bco_id)
        if contents == "not_authorized":
            return Response(
               status=status.HTTP_401_UNAUTHORIZED,
                data={f"You are not authorized to access object {bco_id}"}
            )
        if contents == "not_found":
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={f"Object {bco_id} not found"}
            )
    
        return Response(status=status.HTTP_200_OK, data=contents)
