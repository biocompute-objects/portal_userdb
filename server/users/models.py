# users/modles.py

from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    username = models.CharField(max_length=200, blank=True, null=True)
    affiliation = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=200, blank=True, null=True)
    orcid = models.CharField(max_length=200, blank=True, null=True)
    public = models.BooleanField(blank=True, default=False)

    def __str__(self):
            return self.username