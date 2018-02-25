# from .forms import CustomUserCreationForm
from advapp.models import Advert
from django.contrib.auth import login, authenticate
from django.contrib.auth import logout as django_logout
from django.contrib.auth.models import User
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from django.shortcuts import render, redirect


def signupPage(request):
    context = {}
    return render(request, 'signup.html', context)


def profile(request, username):
    us = get_object_or_404(User, username=username)
    ads = Advert.objects.filter(user=us).filter(active_ad='True')
    context = {'us': us, }
    if not ads:
        context['total'] = 0
        context['sold_num'] = 0
        context['likes'] = 0
    else:
        context['total'] = ads.count()
        context['likes'] = ads.annotate(likes=Sum('number_of_likes')).first().likes
        context['sold_num'] = ads.filter(sold=True).count()
        context['advapp_advert'] = ads.filter(sold=False).order_by('-creation_date')
        context['advapp_advert_1'] = ads.filter(sold=True).order_by('-creation_date')

    if not us.profile.following_people:
        context['followers'] = 0
    else:
        context['followers'] = us.profile.following_people.count()

    return render(request, 'profile.html', context)


def signUp_submit(request):
    context = {}
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password1']
        email = request.POST['email']
        user = User.objects.create_user(username, email, password)
        user.profile.phone_number = request.POST['phone_number']
        user.profile.city = request.POST['city']
        if request.POST['vk']:
            user.profile.vk = "https://vk.com/" + request.POST['vk']
        if request.POST['fb']:
            user.profile.fb = "https://www.facebook.com/" + request.POST['fb']
        user.first_name = request.POST['first_name']
        user.last_name = request.POST['last_name']
        if request.FILES:
            user.profile.avatar = request.FILES['file[0]']
        else:
            user.profile.avatar = 'user_images/default/avatar_placeholder.svg'
        user.save()
        us = authenticate(request, username=username, password=password)
        if us is not None:
            login(request, us)
            return redirect('/')
        else:
            return render(request, 'signup.html', context)
    else:
        return render(request, 'signup.html', context)


def signIn_submit(request):
    context = {}
    if request.method == 'POST':
        username = request.POST['login']
        password = request.POST['password']
        us = authenticate(username=username, password=password)
        if us is not None:
            login(request, us)
            return redirect('/')
        else:
            return redirect('/')
    else:
        return redirect('/')


def logout(request):
    django_logout(request)
    return redirect('/')
