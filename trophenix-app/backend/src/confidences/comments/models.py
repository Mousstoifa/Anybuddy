from django.db import models

from confidences.core.models import Confidence
from trophenix.models import AthleteManyToOneModelMixin, DateTimeModelMixin


class ConfidenceComment(AthleteManyToOneModelMixin, DateTimeModelMixin):
    """A comment on a confidence."""

    confidence = models.ForeignKey(
        Confidence,
        on_delete=models.CASCADE,
        related_name="comments",
        verbose_name="confidence",
        help_text="La confidence associée au commentaire.",
    )
    content = models.TextField(
        verbose_name="contenu",
        help_text="Le contenu du commentaire.",
    )

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Commentaire d'une Confidence"
        verbose_name_plural = "Commentaire des Confidences"

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, confidence.pk={self.confidence.pk}, athlete.pk={self.athlete.pk}"


class ConfidenceCommentLike(AthleteManyToOneModelMixin, DateTimeModelMixin):
    """A like on a confidence comment."""

    comment = models.ForeignKey(
        ConfidenceComment,
        on_delete=models.CASCADE,
        related_name="likes",
        verbose_name="commentaire",
        help_text="Le commentaire qui a reçu le like.",
    )

    class Meta:
        constraints = [models.UniqueConstraint(fields=["comment", "athlete"], name="unique_comment_like")]
        ordering = ["-created_at"]
        verbose_name = "Like d'un Commentaire de Confidence"
        verbose_name_plural = "Likes des Commentaires de Confidence"

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, comment.pk={self.comment.pk}, athlete.pk={self.athlete.pk}"
