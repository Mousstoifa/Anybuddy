from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.views import APIView


class IsAthleteOrCompanyEmployee(IsAuthenticated):
    """Custom permission to allow access to authenticated athletes or company employees."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated athlete or company employee."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        is_athlete = hasattr(user, "athlete") and user.athlete is not None
        is_company_employee = hasattr(user, "company_employee") and user.company_employee is not None
        return is_athlete or is_company_employee

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        return True  # Allow access to all objects for authenticated athletes and company employees


class IsAthlete(IsAuthenticated):
    """Custom permission to allow access only to authenticated athletes."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated athlete."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        return hasattr(user, "athlete") and user.athlete is not None

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        return True  # Allow access to all objects for authenticated athletes


class UserIsAthleteOwner(IsAuthenticated):
    """Custom permission to allow access only to the owner of the athlete object."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated athlete."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        return hasattr(user, "athlete") and user.athlete is not None

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        user = request.user
        athlete = getattr(user, "athlete", None)
        return athlete is not None and getattr(obj, "id", None) == athlete.id


class IsAthleteObjectOwner(IsAuthenticated):
    """Custom permission to allow access only to authenticated athletes."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated athlete."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        return hasattr(user, "athlete") and user.athlete is not None

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        """Allow access if the user is an athlete and the object belongs to them."""
        if not super().has_object_permission(request, view, obj):
            return False
        user = request.user
        athlete = getattr(user, "athlete", None)
        return athlete is not None and getattr(obj, "athlete_id", None) == athlete.id
