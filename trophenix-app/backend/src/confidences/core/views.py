import boto3
from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.response import Response

from athletes.permissions import IsAthlete, IsAthleteObjectOwner
from confidences.comments.serializers import ConfidenceCommentSerializer

from .models import Confidence, ConfidenceLike
from .serializers import ConfidenceSerializer


@extend_schema(tags=["Confidences"])
class ConfidenceViewSet(viewsets.ModelViewSet):
    serializer_class = ConfidenceSerializer
    queryset = Confidence.objects.all()
    permission_classes = [IsAthleteObjectOwner]

    def get_permissions(self) -> list[BasePermission]:
        # return permission instances
        if self.action in ["create_like", "delete_like", "comments", "add_comment"]:
            return [IsAthlete()]  # instance
        return super().get_permissions()

    def get_serializer(self, *args, **kwargs) -> ConfidenceCommentSerializer | ConfidenceSerializer | None:
        # no serializer for streaming URLs
        if self.action in ["generate_stream_url", "save_stream_url", "create_like", "delete_like"]:
            return None
        if self.action in ["comments", "add_comment"]:
            return ConfidenceCommentSerializer(*args, **kwargs)  # type: ignore[no-untyped-call]

        return super().get_serializer(*args, **kwargs)

    s3_client = boto3.client("s3", region_name=settings.AWS_S3_REGION_NAME)

    def perform_create(self, serializer: ConfidenceSerializer) -> None:
        athlete = getattr(self.request.user, "athlete", None)
        serializer.save(athlete=athlete)

    @action(detail=True, methods=["get"], url_path="generate-stream-url")
    def generate_stream_url(self, request: Request, pk: int | None = None) -> Response:
        """Generate a pre-signed S3 URL for direct upload of the audio file."""
        confidence = self.get_object()

        # Generate S3 key
        file_key = self.__get_audio_file_key(confidence)

        # Create presigned URL for PUT
        presigned_url = self.s3_client.generate_presigned_url(
            ClientMethod="put_object",
            Params={
                "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                "Key": file_key,
            },
            ExpiresIn=3600,  # 1 hour
        )

        return Response({"upload_url": presigned_url, "file_key": file_key})

    @action(detail=True, methods=["post"], url_path="save-stream-url")
    def save_stream_url(self, request: Request, pk: int | None = None) -> Response:
        """Save the S3 key after the file is uploaded."""
        confidence = self.get_object()
        file_key = self.__get_audio_file_key(confidence)

        # Update the confidence instance with the S3 key
        confidence.audio_file = file_key
        confidence.save()

        return Response({"audio_file": confidence.audio_file.url})

    def __get_audio_file_key(self, confidence: Confidence) -> str:
        """Get the S3 key for the audio file."""
        if confidence.audio_file:
            return confidence.audio_file.name
        return f"confidences/audios/con_{confidence.pk}.mp3"

    @extend_schema(tags=["Confidences - Likes"])
    @action(detail=True, methods=["post"], url_path="like", url_name="like")
    def create_like(self, request: Request, pk: int | None = None) -> Response:
        """Like a confidence."""
        confidence = self.get_object()
        athlete = request.user.athlete

        # Restore a previously deleted like if it exists
        if ConfidenceLike.objects.all_and_deleted().filter(confidence=confidence, athlete=athlete).exists():
            like = ConfidenceLike.objects.all_and_deleted().get(confidence=confidence, athlete=athlete)
            like.restore()
            return Response(status=status.HTTP_201_CREATED)

        ConfidenceLike.objects.create(confidence=confidence, athlete=athlete)
        return Response(status=status.HTTP_201_CREATED)

    @extend_schema(tags=["Confidences - Likes"])
    @create_like.mapping.delete
    def delete_like(self, request: Request, pk: int | None = None) -> Response:
        """Unlike a confidence."""
        confidence = self.get_object()
        athlete = request.user.athlete

        # Delete the like if it exists
        if ConfidenceLike.objects.filter(confidence=confidence, athlete=athlete).exists():
            ConfidenceLike.objects.get(confidence=confidence, athlete=athlete).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"], url_path="comments", url_name="comments")
    def comments(self, request: Request, pk: int | None = None) -> Response:
        """Retrieve comments for a confidence."""
        confidence = self.get_object()
        comments = confidence.comments.all()
        serializer = self.get_serializer(comments, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @comments.mapping.post
    def add_comment(self, request: Request, pk: int | None = None) -> Response:
        """Add a comment to a confidence."""
        confidence = self.get_object()
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save(confidence=confidence, athlete=request.user.athlete)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
