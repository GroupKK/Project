from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('index', views.redirect_to_home, name='redirect'),
    path('sign_up', views.sign_up, name='sign_up')
]
