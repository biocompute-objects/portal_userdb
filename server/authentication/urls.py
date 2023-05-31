from django.urls import path, include
from rest_framework_jwt.views import (
    ObtainJSONWebTokenView,
    refresh_jwt_token,
    verify_jwt_token,
)
from authentication.apis import GoogleLoginApi, GoogleRegisterApi, OrcidLoginApi, OrcidUserInfoApi, OrcidAddApi
from users.apis import UserCreateApi

urlpatterns = [
    path("auth/refresh/", refresh_jwt_token),
    path("auth/verify/", verify_jwt_token),
    path("auth/login/", ObtainJSONWebTokenView.as_view()),
    path("auth/register/", UserCreateApi.as_view()),
    path("google/login/", GoogleLoginApi.as_view()),
    path("google/register/", GoogleRegisterApi.as_view()),
    path("orcid/login/", OrcidLoginApi.as_view()),
    path("orcid/user_info/", OrcidUserInfoApi.as_view()),
    path("orcid/add/", OrcidAddApi.as_view()),
    # path("orcid/register/", GoogleRegisterApi.as_view()),
    path("password_reset/", include('django_rest_passwordreset.urls', namespace='password_reset')),
]
