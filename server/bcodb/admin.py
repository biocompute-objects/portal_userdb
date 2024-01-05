"""BcoDb Admin Pannel
"""

from django.contrib import admin
from bcodb.models import BcoDb, BCO

class BcoAdmin(admin.ModelAdmin):
    list_display = ["id", "owner", "origin"]

class BcodbAdmin(admin.ModelAdmin):
    list_display = ["owner", "human_readable_hostname","bcodb_username"]

admin.site.register(BcoDb, BcodbAdmin)
admin.site.register(BCO, BcoAdmin)