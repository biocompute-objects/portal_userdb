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
        fields = ("username", "prefix", "registration_date", "registration_certificate")


def create_prefix_bcodb(bcodb: BcoDb, data: dict) -> Response:
    """Creates prefix on BCODB"""

    prefix_serializer = PrefixSerializer(
        data={
            "username": data["username"],
            "prefix": data["prefix"],
            "registration_certificate": uuid4().hex,
            "registration_date": datetime.now(),
            "public_hostname": data["public_hostname"],
        }
    )
    prefix_serializer.is_valid(raise_exception=True)
    prefix_data = prefix_serializer.validated_data

    bco_api_response = requests.post(
        url=bcodb.public_hostname + "/api/prefixes/create/",
        data=json.dumps(
            [
                {
                    "prefix": prefix_data["prefix"],
                    "description": data["description"],
                    "certifying_key": prefix_data["registration_certificate"],
                    "public": data["public"],
                }
            ]
        ),
        headers={
            "Authorization": "Token " + bcodb.token,
            "Content-type": "application/json; charset=UTF-8",
        },
    )

    if bco_api_response.status_code == 201:
        prefix_serializer.save()
        return bco_api_response
    return bco_api_response
