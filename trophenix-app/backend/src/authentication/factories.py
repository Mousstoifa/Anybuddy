from __future__ import annotations

from factory.declarations import Sequence, Trait
from factory.django import DjangoModelFactory, Password

from .models import User


class UserFactory(DjangoModelFactory):
    """
    Factory for the custom User model (email is the unique identifier).

    Usage examples:
        user = UserFactory()  # password == 'password123'
        admin = UserFactory(admin=True)
    """

    email = Sequence(lambda n: f"user{n}@example.com")
    password = Password("password123")

    is_active = True
    is_staff = False
    is_superuser = False

    class Meta:
        model = User
        django_get_or_create = ["email"]

    class Params:
        admin = Trait(is_staff=True, is_superuser=True)
