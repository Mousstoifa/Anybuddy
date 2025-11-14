from __future__ import annotations

from factory.declarations import SelfAttribute, Sequence, SubFactory
from factory.django import DjangoModelFactory

from athletes.factories import AthleteFactory
from confidences.core.factories import ConfidenceFactory

from .models import ConfidenceComment, ConfidenceCommentLike


class ConfidenceCommentFactory(DjangoModelFactory):
    """
    Factory for ConfidenceComment.

    By default, the author (athlete) is the same as the confidence's athlete.
    Override athlete if you need a different commenter.
    """

    confidence = SubFactory(ConfidenceFactory)
    athlete = SelfAttribute("confidence.athlete")
    content = Sequence(lambda n: f"Comment content #{n}")

    class Meta:
        model = ConfidenceComment


class ConfidenceCommentLikeFactory(DjangoModelFactory):
    """
    Factory for ConfidenceCommentLike.

    Defaults to a fresh athlete liking the generated comment. Override athlete/comment as needed.
    """

    comment = SubFactory(ConfidenceCommentFactory)
    athlete = SubFactory(AthleteFactory)

    class Meta:
        model = ConfidenceCommentLike
