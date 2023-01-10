# bcodb/serializers.py

from rest_framework import serializers
from bcodb.models import BcoDb

class BcoDbSerializer(serializers.ModelSerializer):
    class Meta:
        model = BcoDb
        fields = ('hostname','bcodb_username','human_readable_hostname',
            'public_hostname','token','owner','user_permissions',
            'group_permissions','account_creation','account_expiration',
            'last_update','recent_status','recent_attempt'
        )
def create_bcodb(data: dict) -> BcoDb:
    """Create BcoDb
    Serialize data for BcoDb object and saves.
    """

    bcodb_serializer = BcoDbSerializer(data=data)
    bcodb_serializer.is_valid(raise_exception=True)
    bcodb_serializer.save()

    return 0