from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ConfidenceCommentViewSet

app_name = "confidences-comments"

router = DefaultRouter()
router.register(r"comments", ConfidenceCommentViewSet, basename="confidence-comment")

urlpatterns = [
    path("", include(router.urls)),
]
