# prefix/services.py

import json
import requests
from datetime import datetime
from uuid import uuid4
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import serializers
from bcodb.models import BcoDb
from prefix.models import Prefix

class PrefixSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prefix
        fields = (
            "username",
            "prefix",
            "registration_date",
            "registration_certificate"
        )

def create_prefix_bcodb(bcodb: BcoDb, data: dict) -> Response:
    """Creates prefix on BCODB"""

    if data["public"] == "false":
        owner_group = bcodb.bcodb_username
    else:
        owner_group = "bco_drafter"

    bco_api_response = requests.post(
        url=bcodb.public_hostname + "/api/prefixes/create/",
        data=json.dumps(
            {
                "POST_api_prefixes_create": [
                    {
                        "owner_group": owner_group,
                        "owner_user": bcodb.bcodb_username,
                        "prefixes": [
                            {
                                "description": data["description"],
                                "prefix": data["prefix"],
                            }
                        ],
                    }
                ]
            }
        ),
        headers= {
            "Authorization": "Token " + bcodb.token,
            "Content-type": "application/json; charset=UTF-8",
        },
    )

    return bco_api_response

def register_prefix(user: User, prefix: str) -> str:
    """Writes prefix to DB"""
    
    prefix_serializer = PrefixSerializer(data={
        'username': user,
        'prefix': prefix,
        'registration_certificate': uuid4().hex,
        'registration_date': datetime.now(),
    })
    message = prefix_serializer.is_valid(raise_exception=True)

    return message

