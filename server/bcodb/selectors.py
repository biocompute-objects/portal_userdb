from bcodb.models import BcoDb
from users.models import Profile

def get_bcodb(profile: Profile, database: dict) -> BcoDb:
    """Retriuevs a BCODB object"""

    try:
        bcodb = BcoDb.objects.get(
            owner=profile,
            bcodb_username=database['database']['bcodb_username'],
            hostname=database['database']['hostname'],
            token=database['database']['token']
        )
    except BcoDb.DoesNotExist:
        return 'DoesNotExist'
    return bcodb