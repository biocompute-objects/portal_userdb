#!/usr/bin/env python3
"""Authentication Selectors
Selector functions for operations with the authentication app
"""

from bcodb.models import BCO
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

def get_all_temp_drafts():
    return 0

def get_temp_draft(user: User, bco_id: str) -> dict:
    if "?" in bco_id:
        bco_uuid = bco_id.split("?")[1]
    else:
        bco_uuid = bco_id
    try:
        bco = BCO.objects.get(id=bco_uuid)
    except BCO.DoesNotExist:
        return "not_found"
    except ValidationError: 
        return "bad_uuid"
    if bco.owner == None:
        return bco.contents
    if bco.owner != user:
        return "not_authorized"
    
    return bco.contents
