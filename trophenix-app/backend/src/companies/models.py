from __future__ import annotations

from typing import TYPE_CHECKING

from django.db import models

from authentication.models import User
from trophenix.models import DateTimeModelMixin

if TYPE_CHECKING:
    from django.db.models.manager import RelatedManager


class Company(DateTimeModelMixin):
    """Model representing a company."""

    class CompanySize(models.TextChoices):
        MICRO = "micro", "Micro-entreprise (1 salarié)"
        TPE = "tpe", "TPE (2-9 salariés)"
        PME = "pme", "PME (10-249 salariés)"
        ETI = "eti", "ETI (250-4999 salariés)"
        GE = "ge", "Grande entreprise (5000+ salariés)"

    employees: RelatedManager[CompanyEmployee]

    name = models.CharField(
        max_length=200,
        verbose_name="nom de l'entreprise",
        help_text="Le nom de l'entreprise.",
    )
    size = models.CharField(
        max_length=10,
        choices=CompanySize.choices,
        verbose_name="taille",
        help_text="La taille de l'entreprise selon le nombre de salariés.",
    )
    sector = models.CharField(
        max_length=100,
        verbose_name="secteur d'activité",
        help_text="Le secteur d'activité de l'entreprise.",
    )
    logo = models.ImageField(
        upload_to="company_logos/",
        blank=True,
        null=True,
        verbose_name="logo",
        help_text="Le logo de l'entreprise.",
    )
    description = models.TextField(
        verbose_name="description",
        help_text="Description de l'entreprise.",
    )
    contact_email = models.EmailField(
        verbose_name="email de contact",
        help_text="Email de contact de l'entreprise.",
    )

    class Meta:
        verbose_name = "Entreprise"
        verbose_name_plural = "Entreprises"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, name={self.name!r}"


class CompanyEmployee(DateTimeModelMixin):
    """Model representing a company employee."""

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="company_employee",
        verbose_name="utilisateur",
        help_text="L'utilisateur associé à cet employé d'entreprise.",
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="company_employees",
        verbose_name="entreprise",
        help_text="L'entreprise associée à cet employé.",
    )

    class Meta:
        verbose_name = "Employé d'entreprise"
        verbose_name_plural = "Employés d'entreprise"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        pk = getattr(self, "pk", None)
        return f"{pk}, user.email={self.user.email!r}, company={self.company.name!r}"
