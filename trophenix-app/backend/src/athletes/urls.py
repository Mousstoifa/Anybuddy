from __future__ import annotations

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AthleteViewSet

app_name = "athletes"

router = DefaultRouter()
router.register(r"", AthleteViewSet, basename="athlete")

urlpatterns = [
    path("", include(router.urls)),
]
