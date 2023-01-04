# Generated by Django 4.1.5 on 2023-01-04 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bcodb', '0003_alter_bcodb_account_creation_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bcodb',
            name='description',
        ),
        migrations.AlterField(
            model_name='bcodb',
            name='recent_attempt',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='bcodb',
            name='recent_status',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
