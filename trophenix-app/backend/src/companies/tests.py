from __future__ import annotations

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory

from .factories import CompanyEmployeeFactory, CompanyFactory


class CompanyViewSetTests(APITestCase):
    def setUp(self) -> None:
        self.company = CompanyFactory()
        self.company_employee = CompanyEmployeeFactory(company=self.company)
        self.other_company = CompanyFactory()
        self.other_company_employee = CompanyEmployeeFactory(company=self.other_company)

    def test_company_employee_can_view_own_company(self) -> None:
        """Company employee can view their own company details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:company-detail", args=[self.company.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], self.company.id)  # type: ignore[no-untyped-call]

    def test_company_employee_can_update_own_company(self) -> None:
        """Company employee can update their own company details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:company-detail", args=[self.company.id])
        data = {"name": "Updated Company Name", "sector": "Updated Sector"}
        resp = self.client.patch(url, data)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["name"], "Updated Company Name")  # type: ignore[no-untyped-call]

    def test_company_employee_cannot_view_other_company(self) -> None:
        """Company employee cannot view other company details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:company-detail", args=[self.other_company.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_company_employee_cannot_update_other_company(self) -> None:
        """Company employee cannot update other company details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:company-detail", args=[self.other_company.id])
        data = {"name": "Hacked Company Name"}
        resp = self.client.patch(url, data)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_view_company(self) -> None:
        """Unauthenticated user cannot view company details."""
        url = reverse("companies:company-detail", args=[self.company.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_regular_user_cannot_view_company(self) -> None:
        """Regular user without company employee cannot view company details."""
        regular_user = UserFactory()
        self.client.force_authenticate(regular_user)  # type: ignore[no-untyped-call]
        url = reverse("companies:company-detail", args=[self.company.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


class CompanyEmployeeViewSetTests(APITestCase):
    def setUp(self) -> None:
        # Ensure company employee exists for permission class
        self.company_employee = CompanyEmployeeFactory()
        self.other_employee = CompanyEmployeeFactory()

    def test_company_employee_can_retrieve_own_details(self) -> None:
        """Authenticated company employee can retrieve their own details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:companyemployee-detail", args=[self.company_employee.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data["id"], self.company_employee.id)  # type: ignore[no-untyped-call]

    def test_company_employee_can_update_own_details(self) -> None:
        """Authenticated company employee can update their own details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:companyemployee-detail", args=[self.company_employee.id])
        data = {"company": self.company_employee.company.id}
        resp = self.client.patch(url, data)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_company_employee_cannot_retrieve_other_employee_details(self) -> None:
        """Authenticated company employee cannot retrieve another employee's details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:companyemployee-detail", args=[self.other_employee.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_company_employee_cannot_update_other_employee_details(self) -> None:
        """Authenticated company employee cannot update another employee's details."""
        self.client.force_authenticate(self.company_employee.user)  # type: ignore[no-untyped-call]
        url = reverse("companies:companyemployee-detail", args=[self.other_employee.id])
        data = {"company": self.company_employee.company.id}
        resp = self.client.patch(url, data)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_retrieve_employee_details(self) -> None:
        """Unauthenticated user cannot retrieve employee details."""
        url = reverse("companies:companyemployee-detail", args=[self.company_employee.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_regular_user_cannot_retrieve_employee_details(self) -> None:
        """Regular user without company employee cannot retrieve employee details."""
        regular_user = UserFactory()
        self.client.force_authenticate(regular_user)  # type: ignore[no-untyped-call]
        url = reverse("companies:companyemployee-detail", args=[self.company_employee.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
