from factory.declarations import SubFactory
from factory.django import DjangoModelFactory
from factory.faker import Faker

from authentication.factories import UserFactory

from .models import Company, CompanyEmployee


class CompanyFactory(DjangoModelFactory):
    """Factory for Company."""

    name = Faker("company")
    size = Faker("random_element", elements=[choice[0] for choice in Company.CompanySize.choices])
    sector = Faker("bs")
    description = Faker("text")
    contact_email = Faker("email")

    class Meta:
        model = Company


class CompanyEmployeeFactory(DjangoModelFactory):
    """Factory for CompanyEmployee (creates related User and Company automatically)."""

    user = SubFactory(UserFactory)
    company = SubFactory(CompanyFactory)

    class Meta:
        model = CompanyEmployee
        django_get_or_create = ["user"]
