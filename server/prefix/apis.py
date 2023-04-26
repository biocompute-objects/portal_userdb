#!/usr/bin/env python3
# /prefix/apis.py
import json
from django.db import transaction
from django.core.exceptions import ValidationError
from rest_framework import serializers
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

    def get(self, request):
        """Get"""
        if self.request.GET['type'] == 'all':
            prefix_list = all_prefix()

        if self.request.GET['type'] == 'mine':
            token = request.META.get("HTTP_AUTHORIZATION", " ").split(" ")[1]
            token_verify = VerifyAuthTokenSerializer(data={'token':token})
            if token_verify.is_valid() is True:
                user = token_verify.validated_data['user']
                prefix_list = user_prefix(user)
            else:
                return Response(data={'message': "Token is not valied"}, status=status.HTTP_401_UNAUTHORIZED)

        if self.request.GET['type'] == 'search':
            prefix_list = search_prefix(self.request.GET['name'])

        return Response(data=prefix_list, status=status.HTTP_200_OK)

class RegisterPrefixAPI(APIView):
    """Register PRefix
    """
    @transaction.atomic
    def post(self, request):
        """Post"""
        
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


#     def search_db(value, user=None):
#         """
#         Arguments
#         ---------
#         value: string to look for
#         user: user object

#         Look in the database for a given value.
#         Get the entire db.
#         """

#         return_values = [
#             "username",
#             "prefix",
#             "registration_date",
#             "registration_certificate",
#         ]

#         if value == "all":
#             results = list(chain(Prefix.objects.all().values(*return_values)))
#         elif user is not None:

#             results = list(
#                 chain(
#                     Prefix.objects.filter(username_id=user.username).values(
#                         *return_values
#                     )
#                 )
#             )

#         else:
#             results = list(
#                 chain(
#                     Prefix.objects.filter(prefix__icontains=value).values(*return_values)
#                 )
#             )

#         return results


#     def write_db(values):
#         """
#         Arguments
#         ---------
#         values: dictionary with values

#         Write the values to the database.
#         Call full_clean to make sure we have valid input.
#         Source: https://docs.djangoproject.com/en/3.1/ref/models/instances/#validating-objects
#         """

#         writable = Prefix(
#             username=values["username"],
#             prefix=values["prefix"].upper(),
#             registration_date=values["registration_date"],
#             registration_certificate=values["registration_certificate"],
#         )
#         try:
#             writable.full_clean()
#             writable.save()
#         except ValidationError as error:
#             return error

#     def register_prefix(request):
#         """
#         Base the response on the request method.
#         Is the prefix available?
#         Prefix is available, so register it.
#         ```JSON
#         {
#             "POST_register_prefix": [
#             {
#                 "username": "anon",
#                 "prefix": "testR",
#                 "public": "true",
#                 "description":  "Just a test prefix.",
#             }
#             ]
#         }
#         ```
#         """

#         bulk_request = request.data["POST_register_prefix"]
#         return_data = []
#         any_failed = False
#         for new_prefix in bulk_request:

#             try:
#                 user = User.objects.get(username=new_prefix["username"])
#             except ObjectDoesNotExist:
#                 return_data.append(
#                     {
#                         "request_status": "FAILURE",
#                         "status_code": "401",
#                         "message": "The username provided does not match the user DB. "
#                         + "Please login or create an account and re-submit.",
#                     }
#                 )
#                 any_failed = True

#             results = list(chain(Prefix.objects.filter(prefix=new_prefix["prefix"])))

#             if len(results) == 0:
#                 api_object = ApiInfo.objects.get(
#                     local_username=user, human_readable_hostname="BCO Server (Default)"
#                 )
#                 if new_prefix["public"] == "false":
#                     owner_group = api_object.username
#                 else:
#                     owner_group = "bco_drafter"
#                 owner_user = api_object.username
#                 headers = {
#                     "Authorization": "Token " + api_object.token,
#                     "Content-type": "application/json; charset=UTF-8",
#                 }

#                 bco_api = requests.post(
#                     data=json.dumps(
#                         {
#                             "POST_api_prefixes_create": [
#                                 {
#                                     "owner_group": owner_group,
#                                     "owner_user": owner_user,
#                                     "prefixes": [
#                                         {
#                                             "description": new_prefix["description"],
#                                             "prefix": new_prefix["prefix"],
#                                         }
#                                     ],
#                                 }
#                             ]
#                         }
#                     ),
#                     headers=headers,
#                     url=api_object.public_hostname + "/api/prefixes/create/",
#                 )
#                 if bco_api.status_code != 200:
#                     return_data.append(bco_api.json()[0])
#                     any_failed = True
#                     continue

#                 if (
#                     write_db(
#                         {
#                             "username": user,
#                             "prefix": new_prefix["prefix"],
#                             "registration_date": datetime.now().strftime(
#                                 "%Y-%m-%d %H:%M:%S"
#                             ),
#                             "registration_certificate": uuid.uuid4().hex,
#                         }
#                     )
#                     is not None
#                 ):
#                     return_data.append(
#                         {
#                             "request_status": "FAILURE",
#                             "status_code": "400",
#                             "message": f"The {prefix} provided does not match the format required.",
#                         }
#                     )
#                     any_failed = True

#                 return_data.append(
#                     {
#                         "request_status": "SUCCESS",
#                         "status_code": "201",
#                         "message": f"The Prefix {prefix} provided was "
#                         + f"successfullyregistered for {owner_user}.",
#                     }
#                 )

#             else:
#                 return_data.append(
#                     {
#                         "request_status": "FAILURE",
#                         "status_code": "409",
#                         "message": f"The Prefix {prefix} provided is not available.",
#                     }
#                 )
#                 any_failed = True

#         if any_failed:
#             return Response(status=status.HTTP_207_MULTI_STATUS, data=return_data)

#         return Response(status=status.HTTP_200_OK, data=return_data)
