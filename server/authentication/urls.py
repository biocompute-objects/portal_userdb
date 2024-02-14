from django.urls import path, include
from rest_framework_jwt.views import (
    ObtainJSONWebTokenView,
    RefreshJSONWebTokenView,
    VerifyJSONWebTokenView,
)
from authentication.apis import (
    GoogleLoginApi,
    GoogleRegisterApi,
    LogOutApi,
    OrcidLoginApi,
    OrcidUserInfoApi,
    OrcidAddApi,
    OrcidRemoveApi
)
from users.apis import UserCreateApi

urlpatterns = [
    path("auth/refresh/", RefreshJSONWebTokenView.as_view()),
    path("auth/verify/", VerifyJSONWebTokenView.as_view()),
    path("auth/login/", ObtainJSONWebTokenView.as_view()),
    path("auth/logout/", LogOutApi.as_view({"post": "create"})),
    path("auth/register/", UserCreateApi.as_view()),
    path("google/login/", GoogleLoginApi.as_view()),
    path("google/register/", GoogleRegisterApi.as_view()),
    path("orcid/login/", OrcidLoginApi.as_view()),
    path("orcid/user_info/", OrcidUserInfoApi.as_view()),
    path("orcid/add/", OrcidAddApi.as_view()),
    path("orcid/remove/", OrcidRemoveApi.as_view()),
    # path("orcid/register/", GoogleRegisterApi.as_view()),
    path("password_reset/", include('django_rest_passwordreset.urls', namespace='password_reset')),
]
