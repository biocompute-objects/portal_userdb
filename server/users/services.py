# users/services.py


from users.apis import UserSerializer, ProfileSerializer
from bcodb.apis import BcoDbSerializer, BcoDb
from users.models import Profile

def custom_jwt_handler(token, user=None, request=None, public_key=None):
    """ JWT
    """
    import pdb; pdb.set_trace()
    return {
        'token': token,
        'user': {
            'userinfo': UserSerializer(user, context={'request': request}).data,
            'profile': ProfileSerializer(user).data,
            'bcodbs': []
        }

    }