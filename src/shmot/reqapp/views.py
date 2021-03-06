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


def add_fav(request, username, advert_id):
    ad = Advert.objects.get(pk=advert_id)
    us = User.objects.get(username=username)
    if ad.favourited_by.filter(username=username):
        ad.favourited_by.remove(us)
        ad.save()
    else:
        ad.favourited_by.add(us)
        ad.save()
    return HttpResponse('ok', content_type='text/html')


def subscribe(request, username_from, username_to):
    user_from = User.objects.get(username=username_from)
    user_to = User.objects.get(username=username_to)
    if user_to.profile.followed_by.filter(user=user_from):
        user_to.profile.followed_by.remove(user_from.profile)
    else:
        user_to.profile.followed_by.add(user_from.profile)
    user_to.profile.save()
    return HttpResponse('ok', content_type='text/html')
