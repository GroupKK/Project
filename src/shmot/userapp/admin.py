from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Profile

class ProfileInLine(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'
    
class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInLine, )
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_phonenumber', 'get_city', 'get_numberofposts')
    list_select_related = ('profile', )

    def get_phonenumber(self, instance):
        return instance.profile.phone_number
    get_phonenumber.short_description = 'Phone Number'
    
    def get_city(self, instance):
        return instance.profile.city
    get_city.short_description = 'City'
    
    def get_numberofposts(self, instance):
        return instance.profile.number_of_posts
    get_numberofposts.short_description = 'Number of posts'
    
    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


