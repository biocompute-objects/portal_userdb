# Generated by Django 4.1.5 on 2023-01-24 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bcodb", "0005_alter_bcodb_user_permissions"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bcodb",
            name="group_permissions",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="bcodb",
            name="user_permissions",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
