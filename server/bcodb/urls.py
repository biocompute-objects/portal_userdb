# bcodb/urls.py

from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from bcodb.apis import getRouts, AddBcodbApi, RemoveBcodbApi, ResetBcodbTokenApi  # getBcoDb

urlpatterns = [
    path("", getRouts),
    path("bcodb/add/", AddBcodbApi.as_view()),
    path("bcodb/remove/", RemoveBcodbApi.as_view()),
    path("bcodb/reset_token/", ResetBcodbTokenApi.as_view()),
]
