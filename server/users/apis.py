from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from users.models import Profile
from bcodb.models import BcoDb


class ProfileSerializer(serializers.ModelSerializer):
    """ProfileGetDataApi
    getting User data after we are already logged in
    """
    class Meta:
        model = Profile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    """UserGetDataApi
    getting User data after we are already logged in
    """
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'groups', 'date_joined', 'last_login')
        ##you only need username here, but this is where you add extra options which maybe of benefit
     


class UserSerializerWithToken(serializers.ModelSerializer):
    """
    register and login to pass through the JSON token and user data
    """
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        """
        need to tell it to pass through the token in this model as that is not
        included within the internal workings of the ‘User’ class, so we
        create the def get_token method 
        """
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'email')
