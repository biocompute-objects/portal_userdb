# users/selectors.py

from django.contrib.auth.models import User
from users.models import Profile

def user_from_username(username: str) -> User:
    """User from Username
    returns a user object from a username
    """
    return User.objects.get(username=username)

def profile_from_username(username: str) -> Profile:
    """Profile from Username
    returns a user object from a username
    """
    return Profile.objects.get(username=username)
