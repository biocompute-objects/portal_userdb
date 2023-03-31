# users/urls.py

from django.urls import path
from users.apis import UserUpdateApi, UserInfoApi, ChangePasswordApi


urlpatterns = [
    path("update_user/", UserUpdateApi.as_view()),
    path("user_info/", UserInfoApi.as_view()),
    path("change_password/", ChangePasswordApi.as_view()),
]
