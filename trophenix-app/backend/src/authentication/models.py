from __future__ import annotations

from typing import TYPE_CHECKING

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from trophenix.models import DateTimeModelMixin, DateTimeModelMixinManager

if TYPE_CHECKING:
    from athletes.models import Athlete
    from companies.models import CompanyEmployee


class UserManager(DateTimeModelMixinManager, BaseUserManager):
    """Custom manager to handle user & superuser creation with email as unique id."""

    use_in_migrations = True

    def create_user(self, email: str, password: str | None = None, **extra) -> User:
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user: User = self.model(email=email, **extra)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def create_superuser(self, email: str, password: str | None = None, **extra) -> User:
        extra.setdefault("is_superuser", True)
        extra.setdefault("is_staff", True)
        if extra.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")
        if extra.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        return self.create_user(email, password, **extra)


class User(AbstractBaseUser, PermissionsMixin, DateTimeModelMixin):
    """Model resonsible for authentication only."""

    athlete: Athlete | None
    company_employee: CompanyEmployee | None
    objects: UserManager = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    email = models.EmailField(
        max_length=100,
        unique=True,
        verbose_name="adresse email",
        help_text="Adresse email de l'utilisateur (unique).",
    )
    is_superuser = models.BooleanField(
        default=False,
        verbose_name="status administrateur",
        help_text="permet d'accéder et d'administrer toutes les parties du site.",
    )

    # Fields not used, but kept since Django heavily relies on them
    is_active = models.BooleanField(
        default=True,
        verbose_name="actif",
        help_text="Permet de désactiver le compte sans le supprimer. Non utilisé pour l'instant.",
    )
    is_staff = models.BooleanField(
        default=False,
        verbose_name="staff status",
        help_text="Permet d'accéder à l'interface d'administration. Non utilisé pour l'instant.",
    )

    def clean(self) -> None:
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def delete(self, *args, **kwargs) -> None:
        self.is_active = False
        self.save(update_fields=["is_active"])
        return super().delete(*args, **kwargs)

    def restore(self, *args, **kwargs) -> None:
        self.is_active = True
        self.save(update_fields=["is_active"])
        return super().restore(*args, **kwargs)

    def save(self, *args, **kwargs) -> None:
        self.is_staff = self.is_superuser
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, email={self.email}"
