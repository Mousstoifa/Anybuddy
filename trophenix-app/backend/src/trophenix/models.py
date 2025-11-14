from django.db import models
from django.utils import timezone


class DateTimeModelMixinManager(models.Manager):
    def get_queryset(self) -> models.QuerySet:
        return super().get_queryset().filter(deleted_at__isnull=True)

    def deleted(self) -> models.QuerySet:
        """Return unfiltered queryset (deleted + alive)."""
        return super().get_queryset().filter(deleted_at__isnull=False)

    def all_and_deleted(self) -> models.QuerySet:
        """Return all objects, including deleted ones."""
        return super().get_queryset()


class DateTimeModelMixin(models.Model):
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="créé le",
        help_text="Date de création de l'objet.",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="modifié le",
        help_text="Date de la dernière modification de l'objet.",
    )
    deleted_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="supprimé le",
        help_text="Si non nul, l'objet est caché aux utilisateurs (soft delete).",
    )

    objects: DateTimeModelMixinManager = DateTimeModelMixinManager()

    class Meta:
        abstract = True

    def delete(self, *args, **kwargs) -> None:  # soft delete
        """Soft delete: mark timestamp instead of removing row."""
        if self.deleted_at is None:
            self.deleted_at = timezone.now()
            # Only update the deleted_at field to avoid race updating others unnecessarily
            self.save(update_fields=["deleted_at"])

    def restore(self, *args, **kwargs) -> None:
        """Restore the soft-deleted object."""
        self.deleted_at = None
        self.save(update_fields=["deleted_at"])

    def hard_delete(self, *args, **kwargs) -> tuple[int, dict[str, int]]:  # pragma: no cover
        """Irreversibly remove the row from the database."""
        return super().delete(*args, **kwargs)


class AthleteManyToOneModelMixin(models.Model):
    """Mixin to add athlete foreign key to models."""

    athlete = models.ForeignKey(
        "athletes.Athlete",
        on_delete=models.CASCADE,
        related_name="%(class)ss",
        verbose_name="sportif",
        help_text="Le sportif possédant cet objet.",
    )

    class Meta:
        abstract = True
