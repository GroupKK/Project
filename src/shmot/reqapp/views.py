from advapp.models import Advert
from django.contrib.auth.models import User
from django.http import HttpResponse


# Create your views here.
def like_post(request, username, adv_id):
    ad = Advert.objects.get(pk=adv_id)
    us = User.objects.get(username=username)
    ad.liked_by.add(us)
    ad.save()
    return HttpResponse('ok', content_type='text/html')
