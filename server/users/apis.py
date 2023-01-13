from rest_framework import permissions, status, serializers

from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings
from rest_framework.views import APIView
from users.services import ProfileSerializer
from users.selectors import user_from_username, profile_from_username
from users.services import profile_update
from authentication.services import custom_jwt_handler

# def get(self, request):
# """ TODO
# get request in here so that when you visit localhost:8000/user-list
# you can see all the users. This could be used for BCO population
# """
#     serializer = UserSerializerWithToken.objects.all()
#     return Reponse(serializer.data)


class UserCreateApi(APIView):
    """
    allows you to post data on successful registration to the backend to
    confirm and store a user to the site.
    passed through the serializer UserSerializerWithToken
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        user_serializer = UserSerializerWithToken(data=request.data)
        if user_serializer.is_valid(raise_exception=True):
            profile_serializer = ProfileSerializer(data=request.data)
            if profile_serializer.is_valid():
                user_serializer.save()
                profile_serializer.save()
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            return Response(profile_serializer.errors, status=status.HTTP_409_CONFLICT)
        return Response(user_serializer.errors, status=status.HTTP_409_CONFLICT)


class UserSerializerWithToken(serializers.ModelSerializer):
    """
    register and login to pass through the JSON token and user data
    """

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        """
        need to tell it to pass through the token in this model as that is not
        included within the internal workings of the User class, so we
        create the def get_token method
        """

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        """Create Serialized User

        Parameters
        ----------
        validated_data: dict
            A dictionary of user values.
        Returns
        -------
        instance: django.contrib.auth.models.User
            Returns a User object
        """
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ("token", "username", "password", "email")


class UserUpdateApi(APIView):
    class ProfileUpdateSerializer(serializers.Serializer):
        username = serializers.CharField()
        first_name = serializers.CharField(allow_blank=True)
        last_name = serializers.CharField(allow_blank=True)
        email = serializers.EmailField()
        public = serializers.BooleanField(default=False, initial=False)
        affiliation = serializers.CharField(allow_blank=True)
        orcid = serializers.URLField(allow_blank=True)

    def post(self, request):
        """Current User
        what we see when we are logged in successfully
        goes through the authentication process of ensuring a valid JWT token is
        there and allowing our frontend to GET data from this view (it is
        currently limited to GET requests but this can be changed).
        """
        token = request.headers["Authorization"].removeprefix("Bearer ")
        profile_payload = self.ProfileUpdateSerializer(data=request.data)
        profile_payload.is_valid(raise_exception=True)
        data = profile_payload.data
        username = data["username"]
        user = user_from_username(username)
        profile = profile_from_username(username)
        profile_update(user, profile, data)
        user_info = custom_jwt_handler(token, user)

        return Response(status=status.HTTP_200_OK, data=user_info)

class UserRetrieveApi(APIView):
    """
    allows you to post data on successful registration to the backend to
    confirm and store a user to the site.
    passed through the serializer UserSerializerWithToken
    """

    def get(self, request):
        nameset = User.objects.all()
        serializer = UserSerializerWithToken(nameset, many=True)
        return Response(serializer.data)
