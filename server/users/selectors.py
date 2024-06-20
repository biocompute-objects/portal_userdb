# users/selectors.py

from django.contrib.auth.models import User
from users.models import Profile


def user_from_email(email: str) -> User:
    """User from email

    returns a user object from an email
    """
    return User.objects.get(email=email)


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


def user_from_orcid(orcid: str):
    """User from Orcid

    returns a user object from an ORCID
    """
    try:
        profile = Profile.objects.get(orcid__icontains=orcid)
        return user_from_username(username=profile.username)
    except:
        return 0
