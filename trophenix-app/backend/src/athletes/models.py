from __future__ import annotations

from typing import TYPE_CHECKING

from django.db import models

from authentication.models import User
from trophenix.models import DateTimeModelMixin

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager

    from confidences.comments.models import ConfidenceCommentLike
    from confidences.core.models import Confidence, ConfidenceComment, ConfidenceLike


class Athlete(DateTimeModelMixin):
    """Model representing an athlete."""

    confidences: RelatedManager[Confidence]
    confidences_likes: RelatedManager[ConfidenceLike]
    confidences_comments: RelatedManager[ConfidenceComment]
    confidences_comments_likes: RelatedManager[ConfidenceCommentLike]

    firstname = models.CharField(
        max_length=150,
        verbose_name="prénom",
        help_text="Le prénom du sportif.",
    )
    lastname = models.CharField(
        max_length=150,
        verbose_name="nom",
        help_text="Le nom de famille du sportif.",
    )
    city =models.CharField(
        max_length=100,
        verbose_name="Ville",
        help_text="La ville du sportif.",
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="athlete",
        verbose_name="utilisateur",
        help_text="L'utilisateur associé à cet athlète.",
    )

    class Meta:
        verbose_name = "Sportif"
        verbose_name_plural = "Sportifs"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, user.email={self.user.email!r}"
