# bcodb/serializers.py
"""BCODB Services
"""

import json
import requests
from datetime import datetime
from bcodb.models import BcoDb, BCO
from bcodb.selectors import accounts_describe, get_all_bcodbs
from django.db.models import query
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone
from requests.exceptions import RequestException
from users.models import Profile

def update_bcodbs(profile: Profile) -> query.QuerySet:
    """Updates the information for a BcoDb object"""

    bcodbs = get_all_bcodbs(profile)
    now = timezone.now()  # Use Django's timezone.now() to get a timezone-aware datetime object
    
    for db in bcodbs:
        try:
            bco_api_response = accounts_describe(db.public_hostname, db.token)
            # Using .json() to parse JSON response directly
            update = bco_api_response.json()
            BcoDb.objects.filter(id=db.id).update(
                token=update['token'],
                user_permissions=update['permissions'],
                account_expiration=update.get('account_expiration', None),
                last_update=now,
                recent_status=bco_api_response.status_code,
                recent_attempt=now
            )
            print(BcoDb.objects.filter(id=db.id)[0])
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
        except RequestException as e:
            print(f"Request failed: {e}")
            # Update the DB with just the status and attempt timestamp if request fails
            BcoDb.objects.filter(id=db.id).update(
                recent_status=bco_api_response.status_code if bco_api_response else 'Failed',
                recent_attempt=now
            )

    updated_bcodbs = BcoDb.objects.filter(owner=profile)
    return updated_bcodbs


def add_authentication(auth_object: dict, bcodb: BcoDb):
    """Add Authentication
    Adds an authentication object to the BCODB object.
    """
    try: 
        bco_api_response = requests.post(
            url=bcodb.public_hostname + "/api/auth/add/",
            data=json.dumps(auth_object),
            headers= {
                "Authorization": "Token " + bcodb.token,
                "Content-type": "application/json; charset=UTF-8",
            }
        )
        return bco_api_response.status_code

    except Exception as err:
        print(err)

def remove_authentication(auth_object: dict, bcodb: BcoDb):
    """Remove Authentication
    Removes an authentication object to the BCODB object.
    """
    try:
        bco_api_response = requests.post(
            url=bcodb.public_hostname + "/api/auth/remove/",
            data=json.dumps(auth_object),
            headers= {
                "Authorization": "Token " + bcodb.token,
                "Content-type": "application/json; charset=UTF-8",
            }
        )
        return bco_api_response.status_code
    
    except Exception as err:
        print(err)
def delete_temp_draft(user: User, bco_id: str) -> dict:

    try:
        bco = BCO.objects.get(id=bco_id)
    except BCO.DoesNotExist:
        return "not_found"
    except ValidationError: 
        return "bad_uuid"
    
    object_id = bco.id
    
    if bco.owner == None:
        bco.delete()
        return object_id
    
    if bco.owner != user:
        return "not_authorized"
    
    bco.delete()
    return object_id