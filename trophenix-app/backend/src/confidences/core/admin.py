from django.contrib import admin

from trophenix.admin import DateTimeAdminMixin

from .models import Confidence, ConfidenceLike


@admin.register(Confidence)
class ConfidenceAdmin(DateTimeAdminMixin):
    list_display = [
        "title",
        "athlete",
        "category",
    ]
    list_display_links = ["title"]
    list_filter = [
        "category",
    ]
    search_fields = ["title", "description", "athlete__user__email"]

    fieldsets = [
        (
            "Informations principales",
            {
                "fields": ("athlete",),
            },
        ),
        (
            "Contenu de la confidence",
            {
                "fields": ("title", "description", "category"),
            },
        ),
        (
            "Médias",
            {
                "fields": ("audio_file", "cover_image"),
                "description": "Fichiers média associés",
            },
        ),
    ]

    readonly_fields = [
        "audio_file",
        "cover_image",
    ]


@admin.register(ConfidenceLike)
class ConfidenceLikeAdmin(DateTimeAdminMixin):
    list_display = ["id", "confidence", "athlete"]
    list_filter = ["confidence", "athlete"]
    fieldsets = [
        (
            "Informations principales",
            {
                "fields": ("confidence", "athlete"),
                "description": "Like associé à une confidence et un athlète",
            },
        ),
    ]
