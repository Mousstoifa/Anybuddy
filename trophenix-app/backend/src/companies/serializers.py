from trophenix.serializers import DateTimeModelSerializerMixin

from .models import Company, CompanyEmployee


class CompanySerializer(DateTimeModelSerializerMixin):
    class Meta:
        model = Company
        fields = [
            "id",
            "name",
            "size",
            "sector",
            "logo",
            "description",
            "contact_email",
        ]
        read_only_fields = [
            "id",
        ]


class CompanyEmployeeSerializer(DateTimeModelSerializerMixin):
    class Meta:
        model = CompanyEmployee
        fields = [
            "id",
            "user",
            "company",
        ]
        read_only_fields = [
            "id",
            "user",
        ]
