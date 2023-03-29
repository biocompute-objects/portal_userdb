from django.urls import path
from rest_framework_jwt.views import (
    ObtainJSONWebTokenView,
    refresh_jwt_token,
    verify_jwt_token,
)
from authentication.apis import GoogleLoginApi, GoogleRegisterApi
from users.apis import UserCreateApi

urlpatterns = [
    path("auth/refresh/", refresh_jwt_token),
    path("auth/verify/", verify_jwt_token),
    path("auth/login/", ObtainJSONWebTokenView.as_view()),
    path("auth/register/", UserCreateApi.as_view()),
    path("google/login/", GoogleLoginApi.as_view()),
    path("google/register/", GoogleRegisterApi.as_view()),
]
