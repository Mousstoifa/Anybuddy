from typing import Self

from django.contrib import admin
from django.db.models import QuerySet
from django.http import HttpRequest, HttpResponseRedirect
from django.urls import URLPattern, path
from django.utils.safestring import SafeString

from .models import DateTimeModelMixin


class DateTimeAdminMixin(admin.ModelAdmin):
    """Mixin for Django admin classes to handle datetime fields (created_at, updated_at, deleted_at)."""

    list_display = []
    fieldsets = []
    list_filter = []
    readonly_fields = []

    ordering = ["-created_at"]

    # expose admin actions for soft-delete / restore
    actions = ["soft_delete", "restore"]

    date_fields = ["created_at", "updated_at", "deleted_at"]
    formatted_date_fields = ["created_at_formatted", "updated_at_formatted", "deleted_at_formatted"]
    dates_fieldset = [
        "Dates importantes",
        {"fields": date_fields, "description": "Informations temporelles automatiques"},
    ]

    change_form_template = "admin/change_form.html"

    def get_urls(self) -> list[URLPattern]:
        urls = super().get_urls()
        custom_urls = [
            path(
                "<path:object_id>/custom-delete/",
                self.admin_site.admin_view(self.custom_delete),
                name=f"{self.model._meta.app_label}_{self.model._meta.model_name}_custom_delete",  # noqa: SLF001
            ),
        ]
        return custom_urls + urls

    def custom_delete(self, request: HttpRequest, object_id: str) -> HttpResponseRedirect:
        obj: DateTimeModelMixin = self.get_object(request, object_id)  # type: ignore[assignment]
        if obj.deleted_at is None:
            obj.delete()
            self.message_user(request, f"{obj} a été désactivé.")
        else:
            obj.restore()
            self.message_user(request, f"{obj} a été réactivé.")
        return HttpResponseRedirect("../")

    @classmethod
    def __new__(cls, *args, **kwargs) -> Self:
        """Initialize the mixin with default configurations."""
        cls.list_display.extend(cls.formatted_date_fields)  # type: ignore[attr-defined]
        cls.list_filter.extend(cls.date_fields)  # type: ignore[attr-defined]
        cls.readonly_fields.extend(cls.date_fields)  # type: ignore[attr-defined]
        cls.fieldsets.append(cls.dates_fieldset)  # type: ignore[attr-defined]
        return super().__new__(cls)

    def created_at_formatted(self, obj: DateTimeModelMixin) -> SafeString:
        """Format created_at date for display."""
        if hasattr(obj, "created_at") and obj.created_at:
            return SafeString(obj.created_at.strftime("%d/%m/%Y à %H:%M"))
        return SafeString("-")

    created_at_formatted.short_description = "Créé le"
    created_at_formatted.admin_order_field = "created_at"

    def updated_at_formatted(self, obj: DateTimeModelMixin) -> SafeString:
        """Format updated_at date for display."""
        if hasattr(obj, "updated_at") and obj.updated_at:
            return SafeString(obj.updated_at.strftime("%d/%m/%Y à %H:%M"))
        return SafeString("-")

    updated_at_formatted.short_description = "Modifié le"
    updated_at_formatted.admin_order_field = "updated_at"

    def deleted_at_formatted(self, obj: DateTimeModelMixin) -> SafeString:
        """Format deleted_at date for display."""
        if hasattr(obj, "deleted_at") and obj.deleted_at:
            return SafeString(obj.deleted_at.strftime("%d/%m/%Y à %H:%M"))
        return SafeString("-")

    deleted_at_formatted.short_description = "Supprimé le"
    deleted_at_formatted.admin_order_field = "deleted_at"

    @admin.action(
        description=(
            "Restaure les objets sélectionnés s'ils ont été supprimés. Les utilisateurs pourront à nouveau les voir."
        )
    )
    def restore(self, request: HttpRequest, queryset: QuerySet[DateTimeModelMixin]) -> None:
        """Restore selected objects by clearing deleted_at."""
        updated = queryset.update(deleted_at=None)
        self.message_user(request, f"{updated} item(s) restored.")

    def get_queryset(self, request: HttpRequest) -> QuerySet:
        return self.model.objects.all_and_deleted()
