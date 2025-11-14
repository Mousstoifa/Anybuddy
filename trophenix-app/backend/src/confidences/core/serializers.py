from __future__ import annotations

from rest_framework import serializers

from trophenix.serializers import DateTimeModelSerializerMixin

from .models import Confidence, ConfidenceLike


class ConfidenceSerializer(DateTimeModelSerializerMixin):
    """
    Serialize Confidence objects.

    Adds timestamps via mixin; athlete inferred from request on create.
    """

    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Confidence
        fields = [
            "id",
            "athlete",
            "title",
            "description",
            "category",
            "audio_file",
            "cover_image",
            "likes_count",
            "is_liked",
        ]
        read_only_fields = [
            "id",
            "athlete",
            "audio_file",
            "likes_count",
            "is_liked",
        ]

    def get_is_liked(self, obj: Confidence) -> bool:
        request = self.context.get("request")
        athlete = getattr(getattr(request, "user", None), "athlete", None)
        if not athlete:
            return False
        return ConfidenceLike.objects.filter(confidence=obj, athlete=athlete).exists()

    def get_likes_count(self, obj: Confidence) -> int:
        """Return the number of likes for this confidence."""
        return obj.likes.all().count()
