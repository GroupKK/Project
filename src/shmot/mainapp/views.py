from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import loader


def redirect_to_home(request):
    return redirect('/')


def index(request):
    template = loader.get_template('index.html')
    context = {

    }
    return HttpResponse(template.render(context, request))

