from advapp.models import Advert
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.views.decorators.http import require_safe


def redirect_to_home(request):
    return redirect('/')


@require_safe
def index(request):
    context = {'advapp_advert': Advert.objects.filter(active_ad='True').filter(sold='False').order_by('-number_of_likes'),
               'on_sale': Advert.objects.filter(active_ad='True').count(),
               'sold': Advert.objects.filter(sold='True').count(),
               'user_count': User.objects.filter(is_active='True').count()}
    if request.user.is_authenticated:
        print('User authenticated')
        print('Username: ', request.user.username)
        print('First name: ', request.user.first_name)
    return render(request, 'index.html', context)
