# Generated by Django 4.1.5 on 2023-01-24 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bcodb", "0003_alter_bcodb_account_expiration_alter_bcodb_created"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bcodb",
            name="group_permissions",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="bcodb",
            name="user_permissions",
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
    ]
