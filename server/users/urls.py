# users/urls.py

from django.urls import path
from users.apis import UserCreateApi, UserUpdateApi, UserInfoApi


urlpatterns = [
    path("update_user/", UserUpdateApi.as_view()),
    path("register/", UserCreateApi.as_view()),
    path("user_info/", UserInfoApi.as_view()),
]
