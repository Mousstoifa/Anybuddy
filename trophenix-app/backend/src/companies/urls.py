from __future__ import annotations

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CompanyEmployeeViewSet, CompanyViewSet

app_name = "companies"

router = DefaultRouter()
router.register(r"", CompanyViewSet, basename="company")
router.register(r"employees", CompanyEmployeeViewSet, basename="companyemployee")

urlpatterns = [
    path("", include(router.urls)),
]
