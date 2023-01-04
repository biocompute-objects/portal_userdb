# api/views.py

from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from users.apis import UserSerializer, UserSerializerWithToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from bcodb.models import BcoDb
# from api.serializers import BcoDbSerializer
from bcodb.apis import BcoDbSerializer

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

@api_view(['GET'])
def current_user(request):
    """Current User
    what we see when we are logged in successfully
    goes through the authentication process of ensuring a valid JWT token is
    there and allowing our frontend to ‘GET’ data from this view (it is
    currently limited to ‘GET’ requests but this can be changed).
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    """
    allows you to post data on successful registration to the backend to
    confirm and store a user to the site.
    passed through the serializer UserSerializerWithToken
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        nameset = User.objects.all()
        serializer = UserSerializerWithToken(nameset, many=True)
        return Response(serializer.data)

    # def get(self, request):
    # """ TODO
    # get request in here so that when you visit localhost:8000/user-list
    # you can see all the users. This could be used for BCO population
    # """
    #     serializer = UserSerializerWithToken.objects.all()
    #     return Reponse(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)