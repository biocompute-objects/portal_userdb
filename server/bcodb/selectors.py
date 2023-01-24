import requests
from bcodb.models import BcoDb
from users.models import Profile

def get_bcodb(profile: Profile, bcodb_username: str, hostname: str, token: str ) -> BcoDb:
    """Retriuevs a BCODB object. Requires Profile and a db object."""

    try:
        bcodb = BcoDb.objects.get(
            owner=profile,
            bcodb_username=bcodb_username,
            hostname=hostname,
            token=token
        )
    except BcoDb.DoesNotExist:
        return 'DoesNotExist'
    return bcodb

def find_bcodb(profile: Profile, public_hostname: str) -> BcoDb:
    """Retriuevs a BCODB object. Requires Profile and a public hostname."""
    try:
        bcodb = BcoDb.objects.get(owner=profile, public_hostname=public_hostname)
    except:
        return 'DoesNotExist'
    
    return bcodb

def accounts_describe(public_hostname: str, token: str) -> requests.Response :
    """Describe Account
    Using the URL and token, retrieves the BCODB information
    """

    bco_api_response = requests.post(
        url=public_hostname + "/api/accounts/describe/",
        data={},
        headers= {
            "Authorization": "Token " + token,
            "Content-type": "application/json; charset=UTF-8",
        },
    )

    return bco_api_response