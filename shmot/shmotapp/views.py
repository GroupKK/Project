from django.shortcuts import render
from django.shortcuts import redirect


def redirect_to_home(request):
    return redirect('home/')


def index(request):
    return render(request, 'index.html')


def sign_up(request):
    return render(request, 'sign_up.html')
