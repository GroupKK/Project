from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    re_path(r'^index/$', views.redirect_to_home, name='redirect_to_home'),
]
