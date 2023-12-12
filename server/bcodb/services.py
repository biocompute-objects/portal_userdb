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
from django.utils.timezone import make_aware
from users.models import Profile

def update_bcodbs(profile: Profile) -> query.QuerySet:
    """Updates the information for a BcoDb object"""

    bcodbs = get_all_bcodbs(profile)
    now = make_aware(datetime.utcnow())
    
    for db in bcodbs:
        bco_api_response = accounts_describe(db.public_hostname, db.token)
        try:
            update = bco_api_response.json()
            BcoDb.objects.filter(id=db.id).update(
                token = update['token'],
                user_permissions = update['other_info']['permissions']['user'],
                group_permissions = update['other_info']['permissions']['groups'],
                account_expiration =  update['other_info']['account_expiration'],
                last_update = now.isoformat(),
                recent_status = bco_api_response.status_code,
                recent_attempt = now.isoformat()
            )

        except:
            BcoDb.objects.filter(id=db.id).update(
                recent_status = bco_api_response.status_code,
                recent_attempt = now.isoformat()
            )

    updated_bcodbs = BcoDb.objects.filter(owner=profile)
    return updated_bcodbs

def add_authentication(token: str, auth_object: dict, bcodb: BcoDb):
    """Add Authentication
    Adds an authentication object to the BCODB object.
    """
    try: 
        bco_api_response = requests.post(
            url=bcodb.public_hostname + "/api/auth/add/",
            data=json.dumps(auth_object),
            headers= {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json; charset=UTF-8",
            }
        )
        return bco_api_response.status_code

    except Exception as err:
        print(err)

def remove_authentication(token: str, auth_object: dict, bcodb: BcoDb):
    """Remove Authentication
    Removes an authentication object to the BCODB object.
    """
    try:
        bco_api_response = requests.post(
            url=bcodb.public_hostname + "/api/auth/remove/",
            data=json.dumps(auth_object),
            headers= {
                "Authorization": "Bearer " + token,
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