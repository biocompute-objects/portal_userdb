from django.urls import path
from rest_framework_jwt.views import (
    ObtainJSONWebTokenView,
    refresh_jwt_token,
    verify_jwt_token
)
from authentication.apis import Oauth

urlpatterns = [
    path('token/', ObtainJSONWebTokenView.as_view()),
    path('refresh/', refresh_jwt_token),
    path('verify/', verify_jwt_token),
    path('oauth/', Oauth.as_view())
]