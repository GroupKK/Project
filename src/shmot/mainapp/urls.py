from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    re_path(r'^index/$', views.redirect_to_home, name='redirect_to_home'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
