# BcoDb/models.py

from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from users.models import Profile
import uuid


class BcoDb(models.Model):
    bcodb_username = models.CharField(max_length=255, default="null")
    hostname = models.CharField(max_length=255)
    human_readable_hostname = models.CharField(max_length=255)
    public_hostname = models.CharField(max_length=255)
    token = models.CharField(max_length=255)
    owner = models.ForeignKey(Profile, null=True, blank=True, on_delete=models.SET_NULL)
    user_permissions = models.JSONField(null=True, blank=True)
    group_permissions = models.JSONField(null=True, blank=True)
    account_creation = models.DateTimeField(null=True, blank=True)
    account_expiration = models.CharField(max_length=255, null=True, blank=True)
    last_update = models.DateTimeField(null=True, blank=True)
    recent_status = models.CharField(max_length=255, null=True, blank=True)
    recent_attempt = models.CharField(max_length=255, null=True, blank=True)
    created = models.CharField(max_length=255, null=True, blank=True)
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )

    def __str__(self):
        owner = self.owner
        url = self.public_hostname
        return f"{owner} at {url}"
