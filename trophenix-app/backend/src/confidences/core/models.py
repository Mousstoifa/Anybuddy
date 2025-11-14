from __future__ import annotations

from typing import TYPE_CHECKING

from django.db import models

from trophenix.models import AthleteManyToOneModelMixin, DateTimeModelMixin

from .constants import ConfidenceCategory

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager

    from confidences.comments.models import ConfidenceComment


class Confidence(AthleteManyToOneModelMixin, DateTimeModelMixin):
    """User-generated audio message ("confidence")."""

    likes: RelatedManager[ConfidenceLike]
    comments: RelatedManager[ConfidenceComment]

    # Core metadata
    title = models.CharField(
        max_length=255,
        verbose_name="titre",
        help_text="Le titre de la confidence",
    )
    description = models.TextField(
        blank=True,
        verbose_name="description",
        help_text="Description optionnelle",
    )
    category = models.CharField(
        max_length=32,
        blank=True,
        default="",
        choices=ConfidenceCategory.choices,
        verbose_name="catégorie",
        help_text="Catégorie normalisée (optionnelle)",
    )

    # Media assets
    audio_file = models.FileField(
        null=True,
        blank=True,
        upload_to="confidences/audios/",
        verbose_name="fichier audio",
        help_text="Lien du fichier audio de la confidence, stocké sur S3",
    )
    cover_image = models.FileField(
        blank=True,
        null=True,
        upload_to="confidences/covers/",
        verbose_name="image de couverture",
        help_text="lien de l'image de couverture (optionelle), stockée sur S3",
    )

    class Meta:
        verbose_name = "Confidence"
        verbose_name_plural = "Confidences"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, title={self.title!r}"


class ConfidenceLike(AthleteManyToOneModelMixin, DateTimeModelMixin):
    """
    A 'like' linking an athlete to a confidence.

    Unique per (confidence, athlete).
    """

    confidence = models.ForeignKey(
        Confidence,
        on_delete=models.CASCADE,
        related_name="likes",
        help_text="La confidence qui a reçu le like.",
        verbose_name="Confidence",
    )

    class Meta:
        constraints = [models.UniqueConstraint(fields=["confidence", "athlete"], name="unique_confidence_like")]
        ordering = ["-created_at"]
        verbose_name = "Like d'une Confidence"
        verbose_name_plural = "Likes des Confidences"

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, confidence.pk={self.confidence.pk}, athlete.pk={self.athlete.pk}"
