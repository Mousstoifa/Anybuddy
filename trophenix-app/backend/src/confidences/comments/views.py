from drf_spectacular.utils import extend_schema
from rest_framework import mixins, status
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from athletes.permissions import IsAthlete, IsAthleteObjectOwner

from .models import ConfidenceComment, ConfidenceCommentLike
from .serializers import ConfidenceCommentSerializer


@extend_schema(tags=["Confidence - Comments"])
class ConfidenceCommentViewSet(mixins.UpdateModelMixin, mixins.DestroyModelMixin, GenericViewSet):
    queryset = ConfidenceComment.objects.all()
    serializer_class = ConfidenceCommentSerializer
    permission_classes = [IsAthleteObjectOwner]

    def get_permissions(self) -> list:
        if self.action in ["create_like", "delete_like"]:
            return [IsAthlete()]
        return super().get_permissions()

    @action(detail=True, methods=["post"], url_path="like", url_name="like")
    def create_like(self, request: Request, pk: int | None = None) -> Response:
        """Create a like for a confidence comment."""
        comment = self.get_object()
        athlete = request.user.athlete

        if ConfidenceCommentLike.objects.all_and_deleted().filter(comment=comment, athlete=athlete).exists():
            like = ConfidenceCommentLike.objects.all_and_deleted().get(comment=comment, athlete=athlete)
            like.restore()
            return Response(status=status.HTTP_201_CREATED)

        ConfidenceCommentLike.objects.create(comment=comment, athlete=athlete)
        return Response(status=status.HTTP_201_CREATED)

    @create_like.mapping.delete
    def delete_like(self, request: Request, pk: int | None = None) -> Response:
        """Delete a like for a confidence comment."""
        comment = self.get_object()
        athlete = request.user.athlete

        like = ConfidenceCommentLike.objects.filter(comment=comment, athlete=athlete).first()
        if like:
            like.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
