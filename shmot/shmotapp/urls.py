from django.urls import path

from . import views

urlpatterns = [
    path('', views.redirect_to_home, name='redirect'),
    path('home/', views.index, name='index'),
    path('home/sign_up.html', views.sign_up, name='sign_up')
]
