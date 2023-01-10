# bcodb/urls.py

from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from bcodb.apis import getRouts, AddBcodbApi  # getBcoDb

urlpatterns = [
    path("", getRouts),
    # path('bcodb/', getBcoDb),
    path("bcodb/add/", AddBcodbApi.as_view()),
    # path('bcodb/', remove_bcodb),
]
