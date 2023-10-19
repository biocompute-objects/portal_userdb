"""portaluserdb URL Configuration
"""

from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from bcodb.apis import AddBcodbApi
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

VERSION = settings.VERSION

schema_view = get_schema_view(
    openapi.Info(
        title="BioCompute Portal UserDB API",
        default_version=VERSION,
        description="User database for BioCompute Portal",
        terms_of_service="https://github.com/biocompute-objects/userdb/blob/main/LICENSE",
        contact=openapi.Contact(email="object.biocompute@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    re_path(
        r"^users/doc(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),  # Here
    path(
        "users/docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),  # Here
    path(
        "users/redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),  # Here
    path("users/admin/", admin.site.urls),
    path("users/", include("users.urls")),
    path("users/", include("bcodb.urls")),
    #Legacy path for new account
    path("users/", include("authentication.urls")),
    path("users/", include("prefix.urls")),
]
