from __future__ import annotations

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from athletes.factories import AthleteFactory
from authentication.factories import UserFactory

from .factories import ConfidenceFactory
from .models import Confidence


class ConfidenceViewSetTests(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()
        # Ensure athlete exists for permission class
        self.athlete = AthleteFactory(user=self.user)
        self.client.force_authenticate(self.user)  # type: ignore[no-untyped-call]

    def test_create_confidence_sets_athlete(self) -> None:
        """Creating a confidence should set the athlete from the authenticated user."""
        url = reverse("confidences-core:confidence-list")
        payload = {
            "title": "My Title",
            "description": "Desc",
            "category": "life",
        }
        resp = self.client.post(url, data=payload, format="multipart")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED, resp.content)
        confidence = Confidence.objects.get(id=resp.data["id"])  # type: ignore[no-untyped-call]
        self.assertEqual(confidence.athlete, self.athlete)
        self.assertEqual(confidence.title, "My Title")
        # Check there is no audio file since not provided in payload
        self.assertEqual(confidence.audio_file.name, "")

    def test_none_athlete_cannot_retrieve_confidences(self) -> None:
        """Non-athlete users cannot retrieve confidences."""
        self.other_user = UserFactory()
        self.client.force_authenticate(self.other_user)  # type: ignore[no-untyped-call]
        # Ensure this user has no athlete
        self.assertFalse(hasattr(self.other_user, "athlete"))
        url = reverse("confidences-core:confidence-list")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_other_athlete_can_retrieve_confidences(self) -> None:
        """Authenticated athlete can retrieve their own confidences."""
        conf = ConfidenceFactory(athlete=self.athlete)
        url = reverse("confidences-core:confidence-list")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(
            conf.id,
            resp.data["results"][0]["id"],  # type: ignore[no-untyped-call]
        )

    def test_retrieve_confidence_owner(self) -> None:
        """Authenticated user can retrieve their own confidence."""
        conf = ConfidenceFactory(athlete=self.athlete)
        url = reverse("confidences-core:confidence-detail", args=[conf.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], conf.id)  # type: ignore[no-untyped-call]

    def test_retrieve_confidence_forbidden_for_none_athletes(self) -> None:
        """Authenticated user cannot retrieve another athlete's confidence."""
        other_conf = ConfidenceFactory()
        other_user = UserFactory()
        self.client.force_authenticate(other_user)  # type: ignore[no-untyped-call]

        url = reverse("confidences-core:confidence-detail", args=[other_conf.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_confidence_owner(self) -> None:
        """Authenticated user can patch their own confidence."""
        conf = ConfidenceFactory(athlete=self.athlete)
        url = reverse("confidences-core:confidence-detail", args=[conf.id])
        resp = self.client.patch(url, {"title": "New Title"})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        conf.refresh_from_db()
        self.assertEqual(conf.title, "New Title")

    def test_cannot_access_other_confidence_patch(self) -> None:
        """Authenticated user cannot patch another athlete's confidence."""
        other_conf = ConfidenceFactory()
        url = reverse("confidences-core:confidence-detail", args=[other_conf.id])
        resp = self.client.patch(url, {"title": "Hack"})
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_generate_stream_url(self) -> None:
        """Authenticated user can generate stream URL for their own confidence."""
        conf = ConfidenceFactory(athlete=self.athlete)
        url = reverse("confidences-core:confidence-generate-stream-url", args=[conf.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertContains(resp, f"confidences/audios/con_{conf.pk}.mp3")
        self.assertIsNone(conf.audio_file.name)

    def test_cannot_access_other_confidence_get_stream_url(self) -> None:
        """Authenticated user cannot get stream URL for another athlete's confidence."""
        other_conf = ConfidenceFactory()
        url = reverse("confidences-core:confidence-generate-stream-url", args=[other_conf.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_save_stream_url(self) -> None:
        """Authenticated user can save stream URL for their own confidence."""
        conf = ConfidenceFactory(athlete=self.athlete, audio_file=None)
        url = reverse("confidences-core:confidence-save-stream-url", args=[conf.id])
        resp = self.client.post(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        conf.refresh_from_db()
        self.assertEqual(conf.audio_file.name, f"confidences/audios/con_{conf.pk}.mp3")
        self.assertIn(f"confidences/audios/con_{conf.pk}.mp3", resp.data["audio_file"])  # type: ignore[no-untyped-call]

    def test_save_stream_url_forbidden_for_other_confidence(self) -> None:
        """Authenticated user cannot save stream URL for another athlete's confidence."""
        other_conf = ConfidenceFactory()
        url = reverse("confidences-core:confidence-save-stream-url", args=[other_conf.id])
        resp = self.client.post(url, {"file_key": "test-key"})
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_like_confidence(self) -> None:
        """Authenticated athlete can like another confidence."""
        conf = ConfidenceFactory()
        url = reverse("confidences-core:confidence-like", args=[conf.id])
        resp = self.client.post(url)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        # Check the like was created
        self.assertTrue(conf.likes.filter(athlete=self.athlete).exists())

    def test_unlike_confidence(self) -> None:
        """Authenticated athlete can unlike a confidence they liked."""
        conf = ConfidenceFactory()
        conf.likes.create(athlete=self.athlete)  # Create like first
        url = reverse("confidences-core:confidence-like", args=[conf.id])
        resp = self.client.delete(url)

        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        # Check no other likes exist
        self.assertFalse(conf.likes.filter(athlete=self.athlete).exists())
        # Check like still exists but is marked as deleted
        self.assertTrue(conf.likes.deleted().filter(athlete=self.athlete).exists())

    def test_delete_confidence(self) -> None:
        """Authenticated athlete can delete their own confidence."""
        conf = ConfidenceFactory(athlete=self.athlete)
        url = reverse("confidences-core:confidence-detail", args=[conf.id])
        resp = self.client.delete(url)

        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        # Check confidence is marked as deleted
        conf.refresh_from_db()
        self.assertIsNotNone(conf.deleted_at)

    def test_deleted_confidences_not_listed(self) -> None:
        """Deleted confidences should not appear in the list."""
        conf = ConfidenceFactory(athlete=self.athlete)
        conf.delete()
        url = reverse("confidences-core:confidence-list")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data["results"]), 0)  # type: ignore[no-untyped-call]

    def test_cannot_delete_other_confidence(self) -> None:
        """Authenticated athlete cannot delete another athlete's confidence."""
        other_conf = ConfidenceFactory()
        url = reverse("confidences-core:confidence-detail", args=[other_conf.id])
        resp = self.client.delete(url)

        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        # Check confidence still exists and is not deleted
        other_conf.refresh_from_db()
        self.assertIsNone(other_conf.deleted_at)

    def test_like_a_confidence_when_like_was_deleted(self) -> None:
        """Authenticated athlete can like a confidence again if their previous like was deleted."""
        conf = ConfidenceFactory()
        like = conf.likes.create(athlete=self.athlete)
        like.delete()
        url = reverse("confidences-core:confidence-like", args=[conf.id])
        resp = self.client.post(url)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        # Check the like was restored (deleted_at is null)
        self.assertTrue(conf.likes.filter(athlete=self.athlete).exists())

    def test_liking_a_not_existing_confidence_returns_404(self) -> None:
        """Liking a non-existent confidence should return 404."""
        url = reverse("confidences-core:confidence-like", args=[9999])
        resp = self.client.post(url)
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
