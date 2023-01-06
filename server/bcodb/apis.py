# bcodb/apis.py

from rest_framework import serializers
from bcodb.models import BcoDb
from rest_framework import permissions, status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from bcodb.models import BcoDb
from datetime import datetime
from users.selectors import profile_from_username

@api_view(['GET'])
def getRouts(request):
    routs = [
        {'GET': 'api/bcodb'},
        {'POST': 'api/users/token'}
    ]
    return Response(routs)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBcoDb(request):
    bcodb = BcoDb.objects.all()
    serialize = BcoDbSerializer(bcodb, many=True)
    return Response(serialize.data)

class BcoDbSerializer(serializers.ModelSerializer):
    class Meta:
        model = BcoDb
        fields = ('hostname','bcodb_username','human_readable_hostname',
            'public_hostname','token','owner','user_permissions',
            'group_permissions','account_creation','account_expiration',
            'last_update','recent_status','recent_attempt'
        )

class AddBcodbApi(APIView):
    """Add BcoDb object
    """
    def post(self, request):
        """"""
        data = request.data['data']
        now = datetime.utcnow()
        profile = profile_from_username(request.user.username)
        input_fileter = {
            'hostname': data['hostname'],
            'bcodb_username': data['username'],
            'human_readable_hostname': data['human_readable_hostname'],
            'public_hostname': data['public_hostname'],
            'token': data['token'],
            'owner': profile.id,
            'user_permissions': data['other_info']['permissions']['user'],
            'group_permissions': data['other_info']['permissions']['groups'],
            'account_creation': data['other_info']['account_creation'],
            'account_expiration': data['other_info']['account_expiration'],
            'last_update': now.isoformat(),
            'recent_status': '200',
            'recent_attempt': now.isoformat()
        }
        bcodb_serializer = BcoDbSerializer(data=input_fileter)
        import pdb; pdb.set_trace()
        bcodb_serializer.is_valid(raise_exception=True)
        bcodb_serializer.save()
        
        return Response(status=status.HTTP_200_OK)