from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

HOSTNAME = settings.PUBLIC_HOSTNAME


class Prefix(models.Model):
    """Prefix Table: core_prefixes

    Attributes
    ----------
    username: str
    prefix: str
    registration_date: datetime
    registration_certificate: str
    public_hostname: str
    public:str
    """

    prefix = models.CharField(max_length=5, primary_key=True, unique=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username")
    public = models.BooleanField(default=True)
    public_hostname = models.CharField(max_length=1000, default=HOSTNAME)
    registration_date = models.DateTimeField()
    registration_certificate = models.CharField(max_length=1000)

    def __str__(self):
        """String for representing the Prefix (in Admin site etc.)."""
        return str(self.prefix)
