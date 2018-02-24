from django.urls import include, path, re_path

from . import views

urlpatterns = [
    path('signup/', views.signupPage, name='sign_up'),
    path('signup/signup_submit/', views.signUp_submit, name='sign_up_submit'),
    path('profile/', views.profile, name='profile'),
    path('signin_submit/', views.signIn_submit, name='sign_in_submit'),
    path('logout/', views.logout, name='logout'),
]
