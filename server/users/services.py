# users/services.py

from django.db import transaction
from django.contrib.auth.models import User
from users.models import Profile


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
