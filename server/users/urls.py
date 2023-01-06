# users/urls.py

from django.urls import path
from rest_framework_jwt.views import ObtainJSONWebTokenView, refresh_jwt_token, verify_jwt_token
from users.apis import UserUpdateApi
from users.apis import UserCreateApi


urlpatterns = [
    # path('token/', ObtainJSONWebTokenView.as_view()),
    # path('refresh/', refresh_jwt_token),
    # path('verify/', verify_jwt_token),
    path('update_user/', UserUpdateApi.as_view()),
    path('register/', UserCreateApi.as_view())
]
