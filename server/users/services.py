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
    return user

@transaction.atomic
def profile_update(user: User, profile: Profile, data: dict) -> str:
    """Profile update
    Updates the user's profile and user model with the provided data and
    saves the changes to the database.

    Args:
    - user: User model instance to be updated.
    - profile: Profile model instance to be updated.
    - data: Dictionary of updated data.

    Returns:
    - 0 if the update was successful.
    """

    if data["public"] == False:
        profile.public = False
    if data["public"] == True:
        profile.public = True
    profile.affiliation = data["affiliation"]
    profile.email = data["email"]
    profile.orcid = data["orcid"]
    profile.full_clean()
    profile.save()

    user.last_name = data["last_name"]
    user.first_name = data["first_name"]
    user.email = data["email"]
    user.full_clean()
    user.save()

    return 0
