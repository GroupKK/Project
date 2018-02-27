from django.contrib.auth.models import User
from django.db.models import Sum
from django.http import Http404
from django.http import HttpResponseRedirect
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
        if ad.liked_by.filter(username=request.user.username).exists():
            context['liked'] = True
        else:
            context['liked'] = False
        if ad.favourited_by.filter(username=request.user.username).exists():
            context['favourited'] = True
        else:
            context['favourited'] = False

    if not user.profile.following_people:
        context['followers'] = 0
    else:
        context['followers'] = user.profile.following_people.count()

    if not ads:
        print('hi')
        context['likes'] = 0
    else:
        context['likes'] = ads.annotate(likes=Sum('number_of_likes')).first().likes

    return_list = []

    for ad in Advert.objects.filter(active_ad='True').filter(sold='False').order_by('-number_of_likes'):
        try:
            if ad.favourited_by.get(username=request.user.username):
                try:
                    if ad.liked_by.get(username=request.user.username):
                        return_list.append((ad, True, True))
                except:
                    return_list.append((ad, True, False))
        except:
            try:
                if ad.liked_by.get(username=request.user.username):
                    return_list.append((ad, False, True))
            except:
                return_list.append((ad, False, False))

    context['advapp_advert'] = return_list

    return render(request, 'ad_page.html', context)


def new_ad(request):
    context = {}
    if request.user.is_authenticated:
        return render(request, 'new_ad.html', context)
    else:
        return HttpResponseRedirect('/')
