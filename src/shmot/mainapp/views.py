from django.shortcuts import redirect, render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.http import require_safe



def redirect_to_home(request):
    return redirect('/')


@require_safe
def index(request):
    context = {}
    return render(request, 'index.html', context)



