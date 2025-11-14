from rest_framework import serializers

from trophenix.serializers import DateTimeModelSerializerMixin

from .models import ConfidenceComment, ConfidenceCommentLike


class ConfidenceCommentSerializer(DateTimeModelSerializerMixin, serializers.ModelSerializer):
    """Serializer for ConfidenceComment model."""

    is_liked = serializers.SerializerMethodField()
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)

    class Meta:
        model = ConfidenceComment
        fields = [
            "id",
            "confidence",
            "content",
            "athlete",
            "is_liked",
            "likes_count",
        ]

        read_only_fields = [
            "id",
            "athlete",
            "confidence",
            "is_liked",
            "likes_count",
        ]

    def get_is_liked(self, obj: ConfidenceComment) -> bool:
        athlete = self.context["request"].user.athlete
        return ConfidenceCommentLike.objects.filter(comment=obj, athlete=athlete).exists()
