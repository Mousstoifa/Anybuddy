import pytest
from django.urls import reverse

pytestmark = pytest.mark.django_db

def test_company_list(client_logged, company):
    url = reverse("companies:list")
    res = client_logged.get(url)
    assert res.status_code == 200
    assert "Acme" in res.content.decode()

def test_company_employee_create(client_logged, company, user):
    url = reverse("companies:employee-create")
    res = client_logged.post(url, data={"user": user.pk, "company": company.pk})
    assert res.status_code in (302, 201)
