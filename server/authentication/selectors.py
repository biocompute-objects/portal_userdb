#!/usr/bin/env python3
"""Authentication Selectors
Selector functions for operations with the authentication app
"""

from bcodb.models import BCO
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response

def get_all_temp_drafts():
    return 0

def get_temp_draft(user: User, bco_id: str) -> dict:
    try:
        bco = BCO.objects.get(id=bco_id)
    except BCO.DoesNotExist:
        return "not_found"
    if bco.owner == None:
        return bco.contents
    if bco.owner != user:
        import pdb; pdb.set_trace()
        return "not_authorized"
    
    return bco.contents