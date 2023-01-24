# prefix/urls.py

from django.urls import path
from prefix.apis import SearchPrefixAPI, RegisterPrefixAPI

urlpatterns = [
    path("prefix/register/", RegisterPrefixAPI.as_view()),
    path("prefix/search/", SearchPrefixAPI.as_view()),
]
