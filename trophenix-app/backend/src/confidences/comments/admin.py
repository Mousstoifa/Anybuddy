from django.contrib import admin

from trophenix.admin import DateTimeAdminMixin

from .models import ConfidenceComment, ConfidenceCommentLike


@admin.register(ConfidenceComment)
class ConfidenceCommentAdmin(DateTimeAdminMixin, admin.ModelAdmin):
    """Admin interface for ConfidenceComment model."""

    list_display = ["id", "confidence", "athlete", "content"]
    search_fields = ["content"]
    list_filter = ["confidence", "athlete"]
    fieldsets = [
        (
            "Informations principales",
            {
                "fields": ("confidence", "athlete"),
                "description": "Commentaire associé à une confidence et un athlète",
            },
        ),
        ("Contenu du commentaire", {"fields": ("content",)}),
    ]


@admin.register(ConfidenceCommentLike)
class ConfidenceCommentLikeAdmin(DateTimeAdminMixin, admin.ModelAdmin):
    """Admin interface for ConfidenceCommentLike model."""

    list_display = ["id", "comment", "athlete"]
    list_filter = ["comment", "athlete"]
    fieldsets = [
        (
            "Informations principales",
            {
                "fields": ("comment", "athlete"),
                "description": "Like associé à un commentaire d'une confidence et un athlète",
            },
        ),
    ]
