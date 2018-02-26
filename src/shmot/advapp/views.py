from django.contrib.auth.models import User
from django.db.models import Sum
from django.http import Http404
from django.shortcuts import render

from .models import Advert


def ad_page(request, advert_id):
    context = {}

    try:
        ad = Advert.objects.get(id=advert_id, active_ad='True')
    except Advert.DoesNotExist:
        raise Http404()

    user = User.objects.get(id=ad.user_id)
    ads = Advert.objects.filter(user=user).filter(active_ad='True')

    context['advert'] = ad
    context['us'] = user

    if request.user.is_authenticated:
        if request.user.profile.following_people.filter(user_id=user.id).exists():
            context['subscribed'] = True
        else:
            context['subscribed'] = False

    if not user.profile.following_people:
        context['followers'] = 0
    else:
        context['followers'] = user.profile.following_people.count()

    if not ads:
        print('hi')
        context['likes'] = 0
    else:
        context['likes'] = ads.annotate(likes=Sum('number_of_likes')).first().likes

    return render(request, 'ad_page.html', context)
