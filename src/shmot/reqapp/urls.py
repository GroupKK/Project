from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('<str:username>/<int:advert_id>/', views.like_post, name='like_post'),
    path('<str:username_from>/<str:username_to>/', views.subscribe, name='subscribe'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)