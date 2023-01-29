# bcodb/serializers.py

import json
import requests
from datetime import datetime
from django.db.models import query
from django.utils.timezone import make_aware
from rest_framework import serializers
from bcodb.models import BcoDb
from users.models import Profile
from bcodb.selectors import accounts_describe


class BcoDbSerializer(serializers.ModelSerializer):
    """Serializer for BCODB objects"""
    class Meta:
        model = BcoDb
        fields = (
            "hostname",
            "bcodb_username",
            "human_readable_hostname",
            "public_hostname",
            "token",
            "owner",
            "user_permissions",
            "group_permissions",
            "account_creation",
            "account_expiration",
            "last_update",
            "recent_status",
            "recent_attempt",
        )

def update_bcodbs(profile: Profile) -> query.QuerySet:
    """Updates the information for a BcoDb object"""
    bcodbs = BcoDb.objects.filter(owner=profile)

    for db in bcodbs:
        bco_api_response = accounts_describe(db.public_hostname, db.token)
        update = bco_api_response.json()
        now = make_aware(datetime.utcnow())
        if bco_api_response.status_code == 200:
            BcoDb.objects.filter(id=db.id).update(
                token = update['token'],
                user_permissions = update['other_info']['permissions']['user'],
                group_permissions = update['other_info']['permissions']['groups'],
                account_expiration =  update['other_info']['account_expiration'],
                last_update = now.isoformat(),
                recent_status = bco_api_response.status_code,
                recent_attempt = now.isoformat()
            )

        else:
            BcoDb.objects.filter(id=db.id).update(
                recent_status = bco_api_response.status_code,
                recent_attempt = now.isoformat()
            )
    updated_bcodbs = BcoDb.objects.filter(owner=profile)
    return updated_bcodbs

def create_bcodb(data: dict) -> BcoDb:
    """Create BcoDb
    Serialize data for BcoDb object and saves.
    """

    bcodb_serializer = BcoDbSerializer(data=data)
    bcodb_serializer.is_valid(raise_exception=True)
    bcodb_serializer.save()

    return bcodb_serializer.data
