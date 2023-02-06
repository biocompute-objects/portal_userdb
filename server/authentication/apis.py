# authentication/apis.py

from django.contrib.auth.models import User
from rest_framework import permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from authentication.services import custom_jwt_handler, google_authentication
from users.services import user_create
from users.selectors import user_from_username

class GoogleRegister(APIView):
    """Google Oauth Registration"""

    permission_classes = (permissions.AllowAny,)

    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField()
        first_name = serializers.CharField(required=False, default="")
        last_name = serializers.CharField(required=False, default="")
        username = serializers.CharField()

    def post(self, request):
        """Post"""
        try:
            user_from_username(request.data['data']['username'])
            return Response(
                status=status.HTTP_409_CONFLICT,
                data={"message": "A user with that username already exists."}
            )
        
        except User.DoesNotExist:
            user_serializer = self.InputSerializer(data=request.data['data'])
            user_serializer.is_valid(raise_exception=True)
            user = user_create(**user_serializer.validated_data)
            username = user.username
    
            return Response(
                status=status.HTTP_200_OK,
                data={"message":f"The user {username} was successfully created"}
            )


class GoogleLoginApi(APIView):
    """Google Oauth handeling"""

    permission_classes = (permissions.AllowAny,)

    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField()
        first_name = serializers.CharField(required=False, default="")
        last_name = serializers.CharField(required=False, default="")
        aud = serializers.CharField()

    def post(self, request):
        """Post"""
        google_response = google_authentication(request)
        if type(google_response) == Response:
            return google_response
        serializer = self.InputSerializer(data=google_response)
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
