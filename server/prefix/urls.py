# prefix/urls.py

from django.urls import path
from prefix.apis import SearchPrefixAPI
# , RegisterPrefix

urlpatterns = [
    # path("prefix/register/", RegisterPrefix.as_view()),
    path("prefix/search/", SearchPrefixAPI.as_view()),
]
