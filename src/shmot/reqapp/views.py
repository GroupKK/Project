from advapp.models import Advert
from django.contrib.auth.models import User
from django.http import HttpResponse


# Create your views here.
def like_post(request, username, advert_id):
    ad = Advert.objects.get(pk=advert_id)
    us = User.objects.get(username=username)
    if ad.liked_by.filter(username=username):
        ad.liked_by.remove(us)
        ad.number_of_likes -= 1
        ad.save()
    else:
        ad.liked_by.add(us)
        ad.number_of_likes += 1
        ad.save()
    return HttpResponse('ok', content_type='text/html')
