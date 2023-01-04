from rest_framework import serializers
from bcodb.models import BcoDb

class BcoDbSerializer(serializers.ModelSerializer):
    class Meta:
        model = BcoDb
        fields = '__all__'