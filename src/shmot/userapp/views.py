from django.urls import reverse_lazy
from django.views import generic
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext

# from .forms import CustomUserCreationForm

"""
class SignUp(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'
"""
 

def signupPage(request):
    context = {}
    return render(request, 'signup.html', context)
    
def signUp_submit(request):
    print("-------FILE--------")
    print(request.FILES)
    print("-------FILE--------")
    print("-------POST--------")
    print(request.POST)
    print("-------POST--------")
    context = {}
    return render(request, 'signup.html', context)
    
    
