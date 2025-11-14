from drf_spectacular.utils import extend_schema
from rest_framework import mixins, serializers, viewsets

from athletes.permissions import IsAthleteOrCompanyEmployee, UserIsAthleteOwner

from .models import Athlete
from .serializers import AthleteSerializer


@extend_schema(tags=["Athletes"])
class AthleteViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """
    Expose list and retrieve for Athlete.

    List is accessible to both athletes and company employees.
    Retrieve is restricted to the athlete owner only.
    """

    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer

    def get_permissions(self):
        """Use different permissions based on action."""
        if self.action == 'list':
            permission_classes = [IsAthleteOrCompanyEmployee]
        else:
            permission_classes = [UserIsAthleteOwner]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer: serializers.Serializer) -> None:
        user = self.request.user
        serializer.save(user=user)
