from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('index.html', views.redirect_to_home, name='redirect'),
    path('sign_up.html', views.sign_up, name='sign_up')
]
