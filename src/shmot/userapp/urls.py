from django.urls import include, path, re_path

from . import views

urlpatterns = [
    path('', views.signupPage, name='sign_up'),
    path('signup_submit', views.signUp_submit, name='sign_up_submit'),
]
