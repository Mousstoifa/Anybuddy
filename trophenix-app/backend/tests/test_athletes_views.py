import pytest
from django.urls import reverse

pytestmark = pytest.mark.django_db

def test_athlete_list_requires_login(client):
    url = reverse("athletes:list")  # adapte à ton namespace
    res = client.get(url)
    assert res.status_code in (302, 401, 403)

def test_athlete_list_ok(client_logged):
    url = reverse("athletes:list")
    res = client_logged.get(url)
    assert res.status_code == 200
    assert "text/html" in res["Content-Type"]

def test_athlete_detail_ok(client_logged, athlete):
    url = reverse("athletes:detail", args=[athlete.pk])
    res = client_logged.get(url)
    assert res.status_code == 200
    assert str(athlete.firstname) in res.content.decode()

def test_athlete_create_post(client_logged, django_user_model):
    url = reverse("athletes:create")
    payload = {"firstname": "Ana", "lastname": "King", "city": "Lyon", "user": django_user_model.objects.create(email="z@test.com").pk}
    res = client_logged.post(url, data=payload)
    assert res.status_code in (302, 201)
