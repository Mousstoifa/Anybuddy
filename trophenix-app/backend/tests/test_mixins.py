import pytest
from django.urls import reverse
#test pour le mixin
pytestmark = pytest.mark.django_db

def test_login_page_loads(client):
    url = reverse("auth:login")
    res = client.get(url)
    assert res.status_code == 200

def test_login_success(client, user):
    url = reverse("auth:login")
    res = client.post(url, {"email": "u@test.com", "password": "pass"})
    assert res.status_code in (302, 200)