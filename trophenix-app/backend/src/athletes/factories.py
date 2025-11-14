from factory.declarations import SubFactory
from factory.django import DjangoModelFactory

from authentication.factories import UserFactory

from .models import Athlete


class AthleteFactory(DjangoModelFactory):
    """Factory for Athlete (creates related User automatically)."""

    user = SubFactory(UserFactory)

    class Meta:
        model = Athlete
        django_get_or_create = ["user"]
