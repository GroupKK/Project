from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.signupPage, name='sign_up'),
]
