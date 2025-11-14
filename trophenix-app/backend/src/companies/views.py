from drf_spectacular.utils import extend_schema
from rest_framework import mixins, serializers, viewsets

from companies.permissions import IsCompanyMember, UserIsCompanyEmployeeOwner

from .models import Company, CompanyEmployee
from .serializers import CompanyEmployeeSerializer, CompanySerializer


@extend_schema(tags=["Companies"])
class CompanyViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    Expose create, retrieve, and update for Company.
    Only employees of the company can view/update it.
    Any company employee can create a company.
    """

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsCompanyMember]


@extend_schema(tags=["Company Employees"])
class CompanyEmployeeViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    """
    Expose create, retrieve, and update for CompanyEmployee.
    Only the employee themselves can view/update their details.
    """

    queryset = CompanyEmployee.objects.all()
    permission_classes = [UserIsCompanyEmployeeOwner]
    serializer_class = CompanyEmployeeSerializer

    def perform_create(self, serializer: serializers.Serializer) -> None:
        user = self.request.user
        serializer.save(user=user)
