from django.contrib import admin

from trophenix.admin import DateTimeAdminMixin

from .models import Athlete


@admin.register(Athlete)
class AthleteAdmin(DateTimeAdminMixin):
    list_display = ["user", "firstname", "lastname"]
    list_display_links = ["user"]
    search_fields = ["user__email"]

    fieldsets = [
        (
            "Informations athlète",
            {
                "fields": ("user", "firstname", "lastname"),
                "description": "Association utilisateur -> athlète",
            },
        ),
    ]

    readonly_fields = []
