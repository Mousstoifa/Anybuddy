from django.urls import path

from .views import GetUserView, LoginView, RefreshTokenView, RegisterUserView

app_name = "authentication"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("login/refresh/", RefreshTokenView.as_view(), name="token_refresh"),
    path("register/", RegisterUserView.as_view(), name="register"),
    path("me/", GetUserView.as_view(), name="me"),
]
