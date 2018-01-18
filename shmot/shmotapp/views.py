from django.shortcuts import redirect
from django.shortcuts import render


def redirect_to_home(request):
    return redirect('/')


def index(request):
    return render(request, 'index.html')


def sign_up(request):
    return render(request, 'sign_up.html')
