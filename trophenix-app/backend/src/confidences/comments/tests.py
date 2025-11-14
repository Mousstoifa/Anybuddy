from __future__ import annotations

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from athletes.factories import AthleteFactory
from authentication.factories import UserFactory

from .factories import ConfidenceCommentFactory, ConfidenceCommentLikeFactory
from .models import ConfidenceComment, ConfidenceCommentLike


class ConfidenceCommentViewSetTests(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()
        self.athlete = AthleteFactory(user=self.user)
        self.client.force_authenticate(self.user)  # type: ignore[no-untyped-call]

    def test_retrieve_all_comment(self) -> None:
        """Authenticated user can retrieve the comments on a confidence."""
        comment = ConfidenceCommentFactory(athlete=self.athlete)
        url = reverse("confidences-core:confidence-comments", args=[comment.confidence.pk])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 1)  # type: ignore[no-untyped-call]
        self.assertEqual(resp.data[0]["id"], comment.pk)  # type: ignore[no-untyped-call]

    def test_create_comment(self) -> None:
        """Authenticated user can create a comment on a confidence."""
        confidence = ConfidenceCommentFactory().confidence
        url = reverse("confidences-core:confidence-comments", args=[confidence.pk])
        payload = {"content": "This is a test comment."}
        resp = self.client.post(url, data=payload)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertTrue(
            ConfidenceComment.objects.filter(
                content="This is a test comment.", athlete=self.athlete, confidence=confidence
            ).exists()
        )

    def test_update_own_comment(self) -> None:
        """Authenticated user can update their own comment."""
        comment = ConfidenceCommentFactory(athlete=self.athlete)
        url = reverse("confidences-comments:confidence-comment-detail", args=[comment.pk])
        resp = self.client.patch(url, {"content": "Edited"})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        comment.refresh_from_db()
        self.assertEqual(comment.content, "Edited")

    def test_update_other_comment_forbidden(self) -> None:
        """Authenticated user cannot update another athlete's comment."""
        comment = ConfidenceCommentFactory()
        url = reverse("confidences-comments:confidence-comment-detail", args=[comment.pk])
        resp = self.client.patch(url, {"content": "Hack"})
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_own_comment(self) -> None:
        """Authenticated user can delete their own comment."""
        comment = ConfidenceCommentFactory(athlete=self.athlete)
        url = reverse("confidences-comments:confidence-comment-detail", args=[comment.pk])
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(ConfidenceComment.objects.filter(pk=comment.pk).exists())

    def test_like_comment(self) -> None:
        """Authenticated user can like a comment."""
        comment = ConfidenceCommentFactory()
        url = reverse("confidences-comments:confidence-comment-like", args=[comment.pk])
        resp = self.client.post(url)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ConfidenceCommentLike.objects.filter(comment=comment, athlete=self.athlete).exists())

    def test_unlike_comment(self) -> None:
        """Authenticated user can unlike a comment they liked."""
        comment = ConfidenceCommentFactory()
        ConfidenceCommentLikeFactory(comment=comment, athlete=self.athlete)

        url = reverse("confidences-comments:confidence-comment-like", args=[comment.pk])
        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        # Like should be soft-deleted (deleted_at set), but not active
        self.assertFalse(ConfidenceCommentLike.objects.filter(comment=comment, athlete=self.athlete).exists())
        self.assertTrue(ConfidenceCommentLike.objects.deleted().filter(comment=comment, athlete=self.athlete).exists())

    def test_like_comment_that_was_previously_deleted(self) -> None:
        """Liking a comment that was previously unliked (soft-deleted) should restore the like."""
        comment = ConfidenceCommentFactory()
        like = ConfidenceCommentLikeFactory(comment=comment, athlete=self.athlete)
        like.delete()
        url = reverse("confidences-comments:confidence-comment-like", args=[comment.pk])
        resp = self.client.post(url)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

    def test_commenting_a_not_existing_confidence_returns_404(self) -> None:
        """Commenting on a non-existent confidence should return 404."""
        url = reverse("confidences-core:confidence-comments", args=[9999])
        resp = self.client.post(url, data={"content": "Test comment"})
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
