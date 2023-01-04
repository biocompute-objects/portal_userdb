# BcoDb/models.py

from django.db import models
from django.contrib.auth.models import User
from users.models import Profile
import uuid

class BcoDb(models.Model):
    hostname = models.CharField(max_length=255)
    human_readable_hostname = models.CharField(max_length=255)
    public_hostname = models.CharField(max_length=255)
    token = models.CharField(max_length=255)
    owner = models.ForeignKey(
        Profile, null=True, blank=True, on_delete=models.SET_NULL
    )
    user_permissions = models.JSONField(null=True, blank=True)
    group_permissions = models.JSONField(null=True, blank=True)
    account_creation = models.DateTimeField(null=True, blank=True)
    account_expiration = models.DateTimeField(null=True, blank=True)
    last_update = models.DateTimeField(null=True, blank=True)
    recent_status = models.CharField(max_length=255, null=True, blank=True)
    recent_attempt = models.CharField(max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)