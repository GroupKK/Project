from django.shortcuts import redirect, render
from django.shortcuts import render_to_response
from django.template import RequestContext


def redirect_to_home(request):
    return redirect('/')


def index(request):
    context = {}
    return render(request, 'index.html', context)


