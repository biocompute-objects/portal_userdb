# prefix/urls.py

from django.urls import path, re_path
from prefix.apis import SearchPrefixAPI, RegisterPrefixAPI

urlpatterns = [
    path("prefix/register/", RegisterPrefixAPI.as_view()),
    re_path(r'prefix/search/$', SearchPrefixAPI.as_view()),
]
