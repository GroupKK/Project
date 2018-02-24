from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator
from advapp.models import Advert

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=25, default=000000000)
    city = models.CharField(max_length=20, null=True)
    vk = models.CharField(max_length=30, null=True)
    fb = models.CharField(max_length=30, null=True)
    number_of_posts = models.IntegerField(blank=False, default=0) # active + inactive
    posts = models.ForeignKey(Advert, on_delete=models.CASCADE, related_name='posts', null=True)
    selled = models.IntegerField(default=0)
    liked_posts = models.ForeignKey(Advert, on_delete=models.CASCADE, related_name='liked_posts', null=True)
    favourite_posts = models.ForeignKey(Advert, on_delete=models.CASCADE, related_name='favourite_posts', null=True)
    following_people = models.ForeignKey(User, on_delete=models.CASCADE, related_name='folloing_people', null=True)
    number_of_sold_items = models.IntegerField(default=0)
    # rating
    followers = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers', null=True)
    number_of_likes_recieved = models.IntegerField(default=0)
    
@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()

