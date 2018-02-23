from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, help_text='Required.')
    last_name = forms.CharField(max_length=30, required=True, help_text='Required.')
    city = forms.CharField(max_length=15, required=True)
    phone_number = forms.CharField(max_length=17, required=True)
    email = forms.EmailField(max_length=254, required=False, help_text='Optional.')
    vk = forms.CharField(max_length=20, required=False)
    fb = forms.CharField(max_length=20, required=False)
    

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'city', 'phone_number', 'email', 'vk', 'fb', 'password1', 'password2')

