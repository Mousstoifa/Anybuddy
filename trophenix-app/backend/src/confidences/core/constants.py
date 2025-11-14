"""
Constants & enumerations for the confidences app.

Defines the fixed list of allowed confidence categories (kept simple for now).
If later you want dynamic / admin-managed categories, migrate this to a model
and adapt the field + validation logic.
"""

from __future__ import annotations

from django.db.models import TextChoices


class ConfidenceCategory(TextChoices):
    """Static vocabulary for confidence categorisation."""

    LIFE = "life"
    WORK = "work"
    RELATIONSHIPS = "relationships"
    HEALTH = "health"
    OTHER = "other"
