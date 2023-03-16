# authentication/apis.py

from django.contrib.auth.models import User
from rest_framework import permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from authentication.services import custom_jwt_handler, google_authentication
from users.services import user_create
from users.selectors import user_from_username, user_from_email


class GoogleUsername(serializers.CharField):
    """
    Custom serializer field for Google username that removes whitespace from
    the input value.
    """
    def convert(self, value):
        username = value.replace(" ", "")
        return super().convert(username)


class GoogleInputSerializer(serializers.Serializer):
    """
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

        if not data.get('username'):
            username = (data.get('given_name', '') + data.get('family_name', ''))
            username = username.replace(" ", "")
            data['username'] = username

        return super().to_internal_value(data)

class GoogleRegister(APIView):
    """
    API view for registering a user with Google OAuth authentication.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """
        Handle POST requests for user registration with Google OAuth
        authentication.
        Remove whitespace from username input
        Validate input data using the GoogleInputSerializer
        Check if user with the same email already exists
        Create a new user with the validated user data
        """
        user_data = request.data['data']
        user_data['username'] = user_data['username'].replace(" ","")
        user_serializer = GoogleInputSerializer(data=request.data["data"])
        user_serializer.is_valid(raise_exception=True)

        try:
            user_from_email(user_data['email'])
            return Response(
                status=status.HTTP_409_CONFLICT,
                data={"message": "A user with that email address already exists."}
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
    """
    API view for logging in with Google OAuth authentication.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """Post"""
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
