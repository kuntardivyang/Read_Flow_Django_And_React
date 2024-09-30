
from django.contrib import admin
from .models import AppUser
from rest_framework_simplejwt.token_blacklist import admin as token_blacklist_admin
from rest_framework_simplejwt.token_blacklist import models as token_blacklist_models


# Register your models here.
admin.site.register(AppUser)

from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

class OutstandingTokenAdmin(OutstandingTokenAdmin):
    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want
    
    def get_actions(self, request):
        actions = super(OutstandingTokenAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

admin.site.unregister(OutstandingToken)
admin.site.register(OutstandingToken, OutstandingTokenAdmin)