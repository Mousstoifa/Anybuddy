from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import RedirectView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from .views import health

prefix = "api/v1"

urlpatterns = [
    # Redirect root / to the API docs UI
    path("", RedirectView.as_view(url=f"/{prefix}/docs/", permanent=False)),
    # Liveness probe (accept both /health and /health/)
    re_path(r"^health/?$", health, name="health"),
    path(f"{prefix}/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(f"{prefix}/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path(f"{prefix}/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("admin/", admin.site.urls),
    path(f"{prefix}/auth/", include("authentication.urls")),
    path(f"{prefix}/athletes/", include("athletes.urls")),
    path(f"{prefix}/companies/", include("companies.urls")),
    path(f"{prefix}/confidences/", include("confidences.core.urls")),
    path(f"{prefix}/confidences/", include("confidences.comments.urls")),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
