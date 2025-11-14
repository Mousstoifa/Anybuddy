from django.contrib import admin
from django.contrib.auth.models import Group
from rest_framework.authtoken.models import TokenProxy as DRFToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from trophenix.admin import DateTimeAdminMixin

from .models import User


@admin.register(User)
class UserAdmin(DateTimeAdminMixin):
    list_display = [
        "email",
    ]
    list_display_links = ["email"]
    list_filter = [
        "is_superuser",
    ]
    search_fields = ["email"]

    fieldsets = [
        (
            "Informations utilisateur",
            {
                "fields": ("email",),
                "description": "Informations de base de l'utilisateur",
            },
        ),
        (
            "Permissions",
            {
                "fields": ("is_superuser",),
                "description": "Permissions de l'utilisateur",
            },
        ),
    ]


# Unregister default models we don't want to see in admin
admin.site.unregister(Group)
admin.site.unregister([DRFToken, OutstandingToken, BlacklistedToken])

# Customize admin site headers and titles
admin.site.site_header = "Administration Trophénix"
admin.site.site_title = "Admin Trophénix"
admin.site.index_title = "Tableau de bord - Administration Trophénix"
