# bcodb/urls.py

"""BCODB URLs
"""

from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from bcodb.apis import getRouts, AddBcodbApi, RemoveBcodbApi, AddDraftBcoAPI, GetDraftBcoAPI  # getBcoDb

urlpatterns = [
    path("", getRouts),
    path("bcodb/add/", AddBcodbApi.as_view()),
    path("bcodb/remove/", RemoveBcodbApi.as_view()),
    path("bcodb/draft_bco/add", AddDraftBcoAPI.as_view()),
    path("bcodb/draft_bco/get", GetDraftBcoAPI.as_view()),
]
