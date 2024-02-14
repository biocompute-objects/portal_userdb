#!/usr/bin/env python3
# /prefix/apis.py
import json
from django.db import transaction
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework_jwt.serializers import VerifyAuthTokenSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from bcodb.selectors import find_bcodb
from users.selectors import profile_from_username
from prefix.selectors import all_prefix, user_prefix, search_prefix
from prefix.services import create_prefix_bcodb, register_prefix

class SearchPrefixAPI(APIView):
    """Search Prefix DB"""

    authentication_classes = []
    permission_classes = []

    parameters = []
    parameters.append(
        openapi.Parameter(
            "name",
            openapi.IN_PATH,
            description="Prefix name to search for.",
            type=openapi.TYPE_STRING,
        )
    )
    parameters.append(
        openapi.Parameter(
            "type",
            openapi.IN_PATH,
            description="Type of search to exicute.",
            type=openapi.TYPE_STRING,
        )
    )

    @swagger_auto_schema(
        manual_parameters=parameters,
        responses={
            200: "Search is successful.",
            401: "Unathorized.",
        },
        tags=["Prefix Management"],
    )

    def get(self, request):
        """Search Prefix DB
        
        Search Prefix DB
        """

        if self.request.GET['type'] == 'all':
            prefix_list = all_prefix()

        if self.request.GET['type'] == 'mine':
            token = request.META.get("HTTP_AUTHORIZATION", " ").split(" ")[1]
            token_verify = VerifyAuthTokenSerializer(data={'token':token})
            if token_verify.is_valid() is True:
                user = token_verify.validated_data['user']
                prefix_list = user_prefix(user)
            else:
                return Response(
                    data={'message': "Token is not valied"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        if self.request.GET['type'] == 'search':
            prefix_list = search_prefix(self.request.GET['name'])

        return Response(
            data=prefix_list,
            status=status.HTTP_200_OK
        )

class RegisterPrefixAPI(APIView):
    @transaction.atomic
    @swagger_auto_schema(
        responses={
            200: "Prefix registration is successful.",
            401: "Unathorized.",
            409: "Conflict.",
        },
        tags=["Prefix Management"],
    )

    def post(self, request):
        """Register Prefix
        
        Post for registering a BCO prefix
        """

        prefix = request.data['prefix'].upper()
        if len(search_prefix(prefix)) > 0:
            return Response(
                data={"message": f"The Prefix provided, {prefix}, is not available."},
                status=status.HTTP_409_CONFLICT
            )
        url = request.data['bcodb'].removesuffix('/api/')
        bcodb = find_bcodb(profile=profile_from_username(request.user.username), public_hostname=url)
        if bcodb == 'DoesNotExist':
            return Response(
                data={"message": f"The user deos not have a BCODB account."},
                status=status.HTTP_404_NOT_FOUND
            )
        bco_api_response = create_prefix_bcodb(bcodb, request.data)
        message = json.loads(bco_api_response.text)[0]['message']
        if bco_api_response.status_code == 400:
            return Response(data={'message': message}, status=status.HTTP_400_BAD_REQUEST)
        
        if bco_api_response.status_code == 401:
            return Response(data={'message': message}, status=status.HTTP_401_UNAUTHORIZED)

        if bco_api_response.status_code == 403:
            return Response(data={'message': message}, status=status.HTTP_403_FORBIDDEN)

        if bco_api_response.status_code == 409:
            return Response(data={'message': message}, status=status.HTTP_409_CONFLICT)
        registration = register_prefix(request.user, prefix)
        if registration == True:
            return Response(data=message, status=status.HTTP_200_OK)
        else:
            return Response(data={'message':[message, f'The prefix {prefix} was not able to be written to the user db' ]}, status=status.HTTP_207_MULTI_STATUS)
