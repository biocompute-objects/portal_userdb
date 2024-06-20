# prefix/selectors.py

from itertools import chain
from prefix.models import Prefix
from django.contrib.auth.models import User


return_values = ["username", "prefix", "registration_date", "public", "public_hostname"]


def all_prefix() -> dict:
    """Get All Prefixes"""

    prefix_list = list(chain(Prefix.objects.all().values(*return_values)))
    return prefix_list


def user_prefix(user: User) -> dict:
    """Get Prefixes for a user"""

    prefix_list = list(
        chain(Prefix.objects.filter(username_id=user.username).values(*return_values))
    )

    return prefix_list


def search_prefix(name: str) -> dict:
    """"""
    prefix_list = list(
        chain(Prefix.objects.filter(prefix__icontains=name).values(*return_values))
    )
    return prefix_list
