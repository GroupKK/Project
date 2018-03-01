from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('signup/', views.signupPage, name='sign_up'),
    path('signup/signup_submit/', views.signUp_submit, name='sign_up_submit'),
    path('signup/upload_avatar/', views.upload_avatar, name='upload_avatar'),
    path('signin_submit/', views.signIn_submit, name='sign_in_submit'),
    path('logout/', views.logout, name='logout'),
    path('<str:username>/', views.profile, name='profile'),
    path('<str:username>/subscriptions/', views.subscriptions, name='subscriptions'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
