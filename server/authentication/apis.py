# authentication/apis.py

import requests
from django.contrib.auth.models import User
from rest_framework import permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from authentication.services import custom_jwt_handler, googleAuthentication
from users.apis import UserSerializerWithToken, ProfileSerializer

class Oauth(APIView):
    """Google Oauth handeling
    """

    permission_classes = (permissions.AllowAny,)
    
    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField()
        first_name = serializers.CharField(required=False, default='')
        last_name = serializers.CharField(required=False, default='')
        aud = serializers.CharField()

    class ProfileInputSerializer(serializers.Serializer):
        username = serializers.CharField()
        email = serializers.EmailField()
        first_name = serializers.CharField(required=False, default='')
        last_name = serializers.CharField(required=False, default='')

    def post(self, request):
        """Some docs
        """
        google_response = googleAuthentication(request)
        if type(google_response) == Response:
            return google_response
        serializer = self.InputSerializer(data=google_response)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(email=serializer.data['email']).first()

        if user:
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)

            return Response(
                status=status.HTTP_200_OK,
                data=custom_jwt_handler(token, user))
                
        return Response(status=status.HTTP_401_UNAUTHORIZED, data={'message': 'That account does not exist'})