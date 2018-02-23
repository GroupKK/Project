from django.shortcuts import render, redirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User

# from .forms import CustomUserCreationForm
 

def signupPage(request):
    context = {}
    return render(request, 'signup.html', context)
    
def profile(request):
    context = {}
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
        user.profile.vk = request.POST['vk']
        user.profile.fb = request.POST['fb']
        user.first_name = request.POST['first_name']
        user.last_name = request.POST['last_name']
        user.save()
        us = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, us)
            return redirect('../')
        else:
            return render(request, 'signup.html', context)
    else:
        return render(request, 'signup.html', context)
    
    
