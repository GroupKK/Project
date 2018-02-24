from django.shortcuts import render, redirect
from django.shortcuts import render_to_response,  get_object_or_404
from django.template import RequestContext
from django.contrib.auth import login, authenticate
from django.contrib.auth import logout as django_logout
from django.contrib.auth.models import User

# from .forms import CustomUserCreationForm
 

def signupPage(request):
    context = {}
    return render(request, 'signup.html', context)
    
def profile(request, username):
    context = {'us' : get_object_or_404(User, username=username), }
    if request.user.profile.posts_id is None:
        context['total'] = 0
    else:
        context['total'] = request.user.profile.posts_id.count()
    
    if request.user.profile.followers_id is None:
        context['followers'] = 0
    else:
        context['followers'] = request.user.profile.followers_id.count()
    
    print(username)
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
        print(user)
        us = authenticate(request, username=username, password=password)
        print(us)
        if us is not None:
            login(request, us)
            print(request.FILES)
            print("Line 36")
            return redirect('/')
        else:
            print("Line 39")
            return render(request, 'signup.html', context)
    else:
        print("Line 42")
        return render(request, 'signup.html', context)
        
def signIn_submit(request):
    context = {}
    if request.method == 'POST':
        username = request.POST['login']
        password = request.POST['password']
        us = authenticate(request, username=username, password=password)
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
    
