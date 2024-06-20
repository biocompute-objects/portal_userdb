#!/usr/bin/env python3 authentication/apis.py

"""Authentication APIs
"""

import jwt
from bcodb.services import add_authentication, remove_authentication
from bcodb.selectors import get_all_bcodbs
from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, status, serializers, exceptions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.blacklist.models import BlacklistedToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.blacklist.serializers import BlacklistTokenSerializer
from authentication.services import (
    custom_jwt_handler,
    google_authentication,
    orcid_auth_code,
    authenticate_orcid,
)
from users.models import Profile
from users.services import user_create
from users.selectors import user_from_email, user_from_orcid, profile_from_username


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    """
    Create the token for a password reset.
    """
    email_plaintext_message = "{}?token={}".format(
        reverse("password_reset:reset-password-request"), reset_password_token.key
    )
    token = reset_password_token.key
    activation_link = ""
    template = ""

    activation_link = settings.PUBLIC_HOSTNAME + "/password/confirm/?" + f"{token}"

    template = '<html><body><p>Please click this link within the next 10 minutes to reset your BioCompute Portal password: <a href="{}" target="_blank">{}</a>.</p></body></html>'.format(
        activation_link, activation_link
    )

    try:
        send_mail(
            subject="Password reset for BioCompute Portal",
            message=email_plaintext_message,
            html_message=template,
            from_email="mail_sender@portal.aws.biochemistry.gwu.edu",
            recipient_list=[reset_password_token.user.email],
            fail_silently=False,
        )

    except Exception as error:
        print("activation_link", reset_password_token)
        # print('ERROR: ', error)
        # TODO: Should handle when the send_mail function fails?
        # return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={
        # "message": "Not able to send authentication email: {}".format(error)})
        return Response(
            status=status.HTTP_201_CREATED,
            data={
                "message": "Reset token has been requested but email was not sent."
                f" Check with your database administrator for your token. {error}"
            },
        )


class OrcidUserInfoApi(APIView):
    auth = [
        openapi.Parameter(
            "Authorization",
            openapi.IN_HEADER,
            description="Authorization Token",
            type=openapi.TYPE_STRING,
        )
    ]

    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        manual_parameters=auth,
        responses={
            200: "Request is successful.",
            401: "A user with that ORCID does not exist.",
            403: "Authentication credentials were not provided, or were not valid.",
        },
        tags=["Account Management"],
    )
    def post(self, request):
        """Orcid User Info Api

        API view for getting user info in with ORCID OAuth authentication.
        """

        if "Authorization" in request.headers:
            type, token = request.headers["Authorization"].split(" ")

            try:
                unverified_payload = jwt.decode(
                    token, None, False, options={"verify_signature": False}
                )
            except Exception as exp:
                raise exceptions.AuthenticationFailed(exp)

            if request.META["HTTP_REFERER"] == "http://localhost:8080/users/docs/":
                unverified_payload["iss"] = "https://sandbox.orcid.org/"
            else:
                unverified_payload["iss"] = "https://orcid.org/"

            try:
                user = authenticate_orcid(unverified_payload, token)
            except Exception as exp:
                raise exceptions.AuthenticationFailed(exp)

            return Response(
                status=status.HTTP_200_OK, data=custom_jwt_handler(token, user)
            )
        return Response(
            status=status.HTTP_403_FORBIDDEN,
            data={"message": "Authentication credentials were not provided."},
        )


class OrcidLoginApi(APIView):
    permission_classes = (permissions.AllowAny,)
    auth = [
        openapi.Parameter(
            "Authorization",
            openapi.IN_HEADER,
            description="Authorization Token",
            type=openapi.TYPE_STRING,
        )
    ]

    @swagger_auto_schema(
        manual_parameters=auth,
        responses={
            200: "Login is successful.",
            401: "Unathorized.",
        },
        tags=["Account Management"],
    )
    def get(self, request):
        """Orcid Login Api

        API view for logging in with ORCID OAuth authentication.
        """

        auth_code = self.request.GET["code"]
        orcid_auth = orcid_auth_code(auth_code, path="/login")
        if "access_token" not in orcid_auth:
            return Response(
                status=status.HTTP_401_UNAUTHORIZED,
                data={"message": orcid_auth["error_description"]},
            )
        user = user_from_orcid(orcid_auth["orcid"])
        if user != 0:
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)

            return Response(
                status=status.HTTP_200_OK, data=custom_jwt_handler(token, user)
            )

        return Response(
            status=status.HTTP_401_UNAUTHORIZED,
            data={"message": "That account does not exist"},
        )


class OrcidAddApi(APIView):
    auth = [
        openapi.Parameter(
            "Authorization",
            openapi.IN_HEADER,
            description="Authorization Token",
            type=openapi.TYPE_STRING,
        )
    ]

    @swagger_auto_schema(
        manual_parameters=auth,
        responses={200: "Add ORCID successful.", 401: "Unathorized.", 500: "Error"},
        tags=["Account Management"],
    )
    def post(self, request):
        """Add Orcid API

        This API view allows for a user to add an ORCID for OAuth authentication. The
        request should include a valid JWT token in the authorization header.

        Returns the updated user information in the response body.
        """
        auth_code = self.request.GET["code"]
        orcid_auth = orcid_auth_code(auth_code, path="/profile")
        if "access_token" not in orcid_auth:
            return Response(
                status=status.HTTP_401_UNAUTHORIZED,
                data={"message": orcid_auth["error_description"]},
            )

        conflict = user_from_orcid(orcid_auth["orcid"])
        if conflict != 0:
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={"message": "A user with that ORCID already exists"},
            )

        user = request.user
        token = request.headers["Authorization"].removeprefix("Bearer ")
        profile = profile_from_username(user.username)
        bcodbs = get_all_bcodbs(profile)
        profile.orcid = settings.ORCID_URL + "/" + orcid_auth["orcid"]
        profile.save()
        auth_obj = {"iss": settings.ORCID_URL, "sub": orcid_auth["orcid"]}
        for bcodb in bcodbs:
            add_authentication(auth_obj, bcodb)
        return Response(status=status.HTTP_200_OK, data=custom_jwt_handler(token, user))


class OrcidRemoveApi(APIView):
    permission_classes = [permissions.IsAuthenticated]
    auth = [
        openapi.Parameter(
            "Authorization",
            openapi.IN_HEADER,
            description="Authorization Token",
            type=openapi.TYPE_STRING,
        )
    ]

    @swagger_auto_schema(
        manual_parameters=auth,
        responses={
            200: "Remove ORCID successful.",
            401: "Unathorized.",
            403: "Bad request",
        },
        tags=["Account Management"],
    )
    def post(self, request):
        """Remove Orcid API

        This API view allows for a user to remove an ORCID for OAuth authentication. The
        request should include a valid JWT token in the authorization header.

        Returns the updated user information in the response body.
        """
        user = request.user
        profile = profile_from_username(user.username)
        token = request.headers["Authorization"].removeprefix("Bearer ")
        auth_obj = {"iss": settings.ORCID_URL, "sub": profile.orcid.split("/")[-1]}
        profile.orcid = ""
        profile.save()
        bcodbs = get_all_bcodbs(profile)
        for bcodb in bcodbs:
            remove_authentication(auth_obj, bcodb)
        return Response(status=status.HTTP_200_OK, data=custom_jwt_handler(token, user))


class GoogleUsername(serializers.CharField):
    """Google Username Serializer
    Custom serializer field for Google username that removes whitespace from
    the input value.
    """

    def convert(self, value):
        username = value.replace(" ", "")
        return super().convert(username)


class GoogleInputSerializer(serializers.Serializer):
    """Google Input Serializer

    Serializer class for Google authentication input data, including email,
    first name, last name, and username.
    """

    email = serializers.EmailField()
    first_name = serializers.CharField(required=False, default="")
    last_name = serializers.CharField(required=False, default="")
    username = GoogleUsername()

    def to_internal_value(self, data):
        """
        Override the default method to generate a username if one is not provided.
        Check if the username field is empty
        Generate a username from the first and last name fields
        Remove any whitespace characters
        Set the generated username in the input data
        Call the parent method to handle validation and processing
        """

        if not data.get("username"):
            username = data.get("given_name", "") + data.get("family_name", "")
            username = username.replace(" ", "")
            data["username"] = username

        return super().to_internal_value(data)


class GoogleRegisterApi(APIView):
    """
    API view for registering a user with Google OAuth authentication.
    Handle POST requests for user registration with Google OAuth
    authentication.
    """

    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(
        responses={
            200: "Account creation is successful.",
            409: "A user with that email address already exists.",
        },
        tags=["Account Management"],
    )
    def post(self, request):
        """Google Register

        API view for registering a user with Google OAuth authentication.
        Handle POST requests for user registration with Google OAuth
        authentication.
        """
        user_data = request.data["data"]
        user_data["username"] = user_data["username"].replace(" ", "")
        user_serializer = GoogleInputSerializer(data=request.data["data"])
        user_serializer.is_valid(raise_exception=True)

        try:
            user_from_email(user_data["email"])
            return Response(
                status=status.HTTP_409_CONFLICT,
                data={"message": "A user with that email address already exists."},
            )

        except User.DoesNotExist:
            user = user_create(**user_serializer.validated_data)
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)

            return Response(
                status=status.HTTP_200_OK, data=custom_jwt_handler(token, user)
            )


class GoogleLoginApi(APIView):

    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(
        responses={
            200: "Login is successful.",
            401: "Unathorized.",
        },
        tags=["Account Management"],
    )
    def post(self, request):
        """Google Login

        API view for logging in with Google OAuth authentication.
        """

        google_response = google_authentication(request)
        if type(google_response) == Response:
            return google_response
        serializer = GoogleInputSerializer(data=google_response)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(email=serializer.data["email"]).first()

        if user:
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)

            return Response(
                status=status.HTTP_200_OK, data=custom_jwt_handler(token, user)
            )

        return Response(
            status=status.HTTP_401_UNAUTHORIZED,
            data={"message": "That account does not exist"},
        )


class LogOutApi(ModelViewSet):

    queryset = BlacklistedToken.objects.all()
    serializer_class = BlacklistTokenSerializer
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        responses={
            200: "Logout is successful.",
            401: "A user with that ORCID does not exist.",
            403: "Authentication credentials were not provided.",
        },
        tags=["Account Management"],
    )
    def create(self, request, *args, **kwargs):
        """Logout API
        Adds submited token to the list of blackli
        """
        if "token" not in request.data:
            request.data.update(
                {"token": JSONWebTokenAuthentication.get_token_from_request(request)}
            )

        return super(LogOutApi, self).create(request, *args, **kwargs)
