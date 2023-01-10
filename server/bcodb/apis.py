# bcodb/apis.py

from bcodb.models import BcoDb
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime
from users.selectors import profile_from_username, user_from_username
from authentication.services import custom_jwt_handler
from bcodb.services import create_bcodb

@api_view(['GET'])
def getRouts(request):
    routs = [
        {'GET': 'api/bcodb'},
        {'POST': 'api/users/token'}
    ]
    return Response(routs)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getBcoDb(request):
#     bcodb = BcoDb.objects.all()
#     serialize = BcoDbSerializer(bcodb, many=True)
#     return Response(serialize.data)

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
        create_bcodb(data=input_fileter)
        user_info = custom_jwt_handler(request._auth, user_from_username(request.user.username))
        return Response(status=status.HTTP_200_OK, data=user_info)