from advapp.models import Advert
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.views.decorators.http import require_safe


def redirect_to_home(request):
    return redirect('/')


@require_safe
def index(request):
    context = {'on_sale': Advert.objects.filter(active_ad='True').count(),
               'sold': Advert.objects.filter(sold='True').count(),
               'user_count': User.objects.filter(is_active='True').count()}

    return_list = []

    for ad in Advert.objects.filter(active_ad='True').filter(sold='False').order_by('-number_of_likes').order_by('-price'):
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
    return render(request, 'index.html', context)
