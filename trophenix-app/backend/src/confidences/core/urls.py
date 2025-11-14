from __future__ import annotations

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ConfidenceViewSet

app_name = "confidences-core"

router = DefaultRouter()
router.register(r"", ConfidenceViewSet, basename="confidence")

urlpatterns = [
    path("", include(router.urls)),
]
