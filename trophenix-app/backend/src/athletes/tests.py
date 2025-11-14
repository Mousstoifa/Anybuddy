from __future__ import annotations

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from companies.factories import CompanyEmployeeFactory

from .factories import AthleteFactory


class AthleteViewSetTests(APITestCase):
    def setUp(self) -> None:
        # Ensure athlete exists for permission class
        self.athlete = AthleteFactory()
        self.client.force_authenticate(self.athlete.user)  # type: ignore[no-untyped-call]

    def test_athlete_can_retrieve_own_details(self) -> None:
        """Authenticated athlete can retrieve their own details."""
        url = reverse("athletes:athlete-detail", args=[self.athlete.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], self.athlete.id)  # type: ignore[no-untyped-call]

    def test_athlete_cannot_retrieve_other_athlete_details(self) -> None:
        """Authenticated athlete cannot retrieve another athlete's details."""
        other_athlete = AthleteFactory()
        url = reverse("athletes:athlete-detail", args=[other_athlete.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def authenticated_user_cannot_retrieve_athlete_details(self) -> None:
        """Return error when authenticated user without athlete tries to retrieve athlete details."""
        other_user = UserFactory()
        self.client.force_authenticate(other_user)  # type: ignore[no-untyped-call]
        url = reverse("athletes-athlete-detail", args=[self.athlete.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


class AthleteListViewTests(APITestCase):
    def setUp(self) -> None:
        self.athlete1 = AthleteFactory()
        self.athlete2 = AthleteFactory()
        self.company_employee = CompanyEmployeeFactory()

    def test_athlete_can_list_athletes(self) -> None:
        """Authenticated athlete can list all athletes."""
        self.client.force_authenticate(self.athlete1.user)  # type: ignore[no-untyped-call]
        url = reverse("athletes:athlete-list")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data["results"]), 2)  # type: ignore[no-untyped-call]

    def test_company_employee_can_list_athletes(self) -> None:
        """Authenticated company employee can list all athletes."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("athletes:athlete-list")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data["results"]), 2)  # type: ignore[no-untyped-call]

    def test_unauthenticated_user_cannot_list_athletes(self) -> None:
        """Unauthenticated user cannot list athletes."""
        url = reverse("athletes:athlete-list")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_regular_user_cannot_list_athletes(self) -> None:
        """Authenticated user without athlete or company employee cannot list athletes."""
        regular_user = UserFactory()
        self.client.force_authenticate(regular_user)  # type: ignore[no-untyped-call]
        url = reverse("athletes:athlete-list")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
