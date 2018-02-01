from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def createUser(usrname, pswd, mail, f_name, l_name):
    User.objects.create_user(usrname, mail, pswd, first_name=f_name, last_name=l_name)

def log_in(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
    else:
        # Return an 'invalid login' error message.
        pass

def log_out(request):
    logout(request)
