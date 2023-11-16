"""BcoDb Admin Pannel
"""

from django.contrib import admin
from bcodb.models import BcoDb, BCO

admin.site.register(BcoDb)
admin.site.register(BCO)
