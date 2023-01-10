# users/modles.py

from django.db import models
from django.contrib.auth.models import User
import uuid


class Profile(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4, unique=True, primary_key=True, editable=False
    )
    username = models.CharField(unique=True, max_length=200, default="")
    affiliation = models.CharField(max_length=255, default="")
    email = models.CharField(max_length=200, default="")
    orcid = models.CharField(max_length=200, default=" ")
    public = models.BooleanField(blank=True, default=False)

    def __str__(self):
        return self.username
