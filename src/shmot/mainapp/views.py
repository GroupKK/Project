from django.shortcuts import redirect, render


def redirect_to_home(request):
    return redirect('/')


def index(request):
    context = {}
    return render(request, 'index.html', context)

