# Generated by Django 4.1.5 on 2023-01-06 17:55

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("username", models.CharField(default="", max_length=200, unique=True)),
                ("affiliation", models.CharField(default="", max_length=255)),
                ("email", models.CharField(default="", max_length=200)),
                ("orcid", models.CharField(default=" ", max_length=200)),
                ("public", models.BooleanField(blank=True, default=False)),
            ],
        ),
    ]
