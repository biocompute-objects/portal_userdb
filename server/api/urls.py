# api/urls.py

from django.urls import path
from api import views
from rest_framework_jwt.views import obtain_jwt_token
from api.views import current_user


urlpatterns = [
    path('', views.getRouts),
    path('bcodb/', views.getBcoDb),
    path('token/', obtain_jwt_token),
    path('current_user/', current_user)
]
