from django.urls import path
from rest_framework_jwt.views import (
    ObtainJSONWebTokenView,
    refresh_jwt_token,
    verify_jwt_token,
)
from authentication.apis import GoogleLoginApi, GoogleRegister
from users.apis import UserCreateApi

urlpatterns = [
    path("auth/register/", UserCreateApi.as_view()),
    path("auth/login/", ObtainJSONWebTokenView.as_view()),
    path("auth/verify/", verify_jwt_token),
    path("auth/refresh/", refresh_jwt_token),
    path("google/login/", GoogleLoginApi.as_view()),
    path("google/register/", GoogleRegister.as_view()),
]
