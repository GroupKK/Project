from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('<int:advert_id>/', views.ad_page, name='ad_page'),
    path('new_post/', views.new_ad, name='new_ad'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)