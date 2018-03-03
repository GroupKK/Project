from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('like_post/<str:username>/<int:advert_id>/', views.like_post, name='like_post'),
    path('add_to_fav/<str:username>/<int:advert_id>/', views.add_fav, name='add_fav'),
    path('subscribe/<str:username_from>/<str:username_to>/', views.subscribe, name='subscribe'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)