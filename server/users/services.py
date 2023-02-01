# users/services.py

from django.db import transaction
from django.contrib.auth.models import User
from rest_framework import serializers
from users.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    """Profile object serializer"""

    username = serializers.CharField()
    affiliation = serializers.CharField(default="", initial="")
    email = serializers.EmailField()
    orcid = serializers.CharField(default="", initial="")
    public = serializers.BooleanField(default=False, initial=False)

    class Meta:
        model = Profile
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    """User object serializer"""

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "groups",
            "date_joined",
            "last_login",
        )

@transaction.atomic
def user_create(
    email: str, username: str, passowrd:str=None, **data:dict
) -> User:
    """Create a user. Mostly with Google OAuth"""

    data = {'is_staff': False, 'is_superuser': False, **data}
    user = User(email=email, username=username, **data)
    profile = Profile(username=user.username, email=user.email)
    if user.password == '':
        user.set_unusable_password()
    user.full_clean()
    profile.full_clean()
    user.save()
    profile.save()
    import pdb; pdb.set_trace()
    return user

@transaction.atomic
def profile_update(user: User, profile: Profile, data: dict) -> str:
    """Profile update
    Takes a serilizedd object from the request, parses the values and writes
    to database
    """

    if data["public"] == False:
        profile.public = False
    if data["public"] == True:
        profile.public = True
    profile.affiliation = (data["affiliation"],)
    profile.orcid = (data["orcid"],)
    profile.email = data["email"]
    profile.full_clean()
    profile.save()

    user.last_name = data["last_name"]
    user.first_name = data["first_name"]
    user.full_clean()
    user.save()

    return 0
