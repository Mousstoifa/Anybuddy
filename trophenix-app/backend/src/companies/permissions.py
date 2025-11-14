from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.views import APIView


class IsCompanyEmployee(IsAuthenticated):
    """Custom permission to allow access only to authenticated company employees."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated company employee."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        return hasattr(user, "company_employee") and user.company_employee is not None

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        return True  # Allow access to all objects for authenticated company employees


class UserIsCompanyEmployeeOwner(IsAuthenticated):
    """Custom permission to allow access only to the owner of the company employee object."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated company employee."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        return hasattr(user, "company_employee") and user.company_employee is not None

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        user = request.user
        company_employee = getattr(user, "company_employee", None)
        return company_employee is not None and getattr(obj, "id", None) == company_employee.id


class IsCompanyMember(IsAuthenticated):
    """Custom permission to allow access only to employees of the same company."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated company employee."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        return hasattr(user, "company_employee") and user.company_employee is not None

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        """Allow access if the user is an employee of the same company."""
        user = request.user
        company_employee = getattr(user, "company_employee", None)
        if company_employee is None:
            return False

        # For Company objects, check if user belongs to this company
        if hasattr(obj, "company_employees"):  # Company object
            return obj.id == company_employee.company_id

        return False


class IsCompanyEmployeeObjectOwner(IsAuthenticated):
    """Custom permission to allow access only to authenticated company employees."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        """Check if the user is authenticated and has an associated company employee."""
        if not super().has_permission(request, view):
            return False
        user = request.user
        return hasattr(user, "company_employee") and user.company_employee is not None

    def has_object_permission(self, request: Request, view: APIView, obj: object) -> bool:
        """Allow access if the user is a company employee and the object belongs to them."""
        if not super().has_object_permission(request, view, obj):
            return False
        user = request.user
        company_employee = getattr(user, "company_employee", None)
        return company_employee is not None and getattr(obj, "company_employee_id", None) == company_employee.id
