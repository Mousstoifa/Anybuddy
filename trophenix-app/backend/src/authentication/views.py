from rest_framework import generics, permissions, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import User
from .serializers import UserReadOnlySerializer, UserRegisterSerializer


class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class RefreshTokenView(TokenRefreshView):
    """Token refresh endpoint."""


class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_email = serializer.validated_data.get("email")

        if User.objects.filter(email=user_email).exists():
            return Response(
                {"email": ["Un utilisateur avec cette adresse email existe déjà."]},
                status=status.HTTP_409_CONFLICT,
            )

        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


class GetUserView(generics.RetrieveAPIView):
    """
    Retrieve authenticated user's profile information.

    Returns the profile data of the currently authenticated user.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserReadOnlySerializer

    def get_object(self) -> User:
        """Return the current authenticated user."""
        return self.request.user  # type: ignore
