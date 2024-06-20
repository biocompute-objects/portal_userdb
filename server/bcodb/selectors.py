import requests
from requests.models import Response
from users.models import Profile
from bcodb.models import BcoDb


def get_all_bcodbs(profile: Profile) -> dict:
    """Retrieve all BCODBs associated with a profile"""
    return BcoDb.objects.filter(owner=profile)


def get_bcodb(
    profile: Profile, bcodb_username: str, hostname: str, token: str
) -> BcoDb:
    """Retriuevs a BCODB object. Requires Profile and a db object."""

    try:
        bcodb = BcoDb.objects.get(
            owner=profile, bcodb_username=bcodb_username, hostname=hostname, token=token
        )
    except BcoDb.DoesNotExist:
        return "DoesNotExist"
    return bcodb


def find_bcodb(profile: Profile, public_hostname: str) -> BcoDb:
    """Retriuevs a BCODB object. Requires Profile and a public hostname."""
    try:
        bcodb = BcoDb.objects.get(owner=profile, public_hostname=public_hostname)
    except:
        return "DoesNotExist"

    return bcodb


def accounts_describe(public_hostname: str, token: str) -> requests.Response:
    """Describe Account
    Using the URL and token, retrieves the BCODB information
    """
    try:
        bco_api_response = requests.post(
            url=public_hostname + "/api/accounts/describe/",
            data={},
            headers={
                "Authorization": "Token " + token,
                "Content-type": "application/json; charset=UTF-8",
            },
        )
    except requests.exceptions.ConnectionError:
        bco_api_response = Response()
        bco_api_response.code = "Service Unavailable"
        bco_api_response.error_type = "Service Unavailable"
        bco_api_response.status_code = 503
        bco_api_response._content = (
            b'{ "message" : "The requested BCODB is unavailable." }'
        )

    return bco_api_response
