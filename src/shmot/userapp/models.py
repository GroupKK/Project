from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator
from advapp.models import Advert
import datetime

class Profile(models.Model):
    def user_directory_path(instance, filename):
        now = datetime.datetime.now()
        # file will be uploaded to MEDIA_ROOT/ad_images/user_<id>/<year>/<month>/<day>/image_<hour>_<minute>_<second>
        return 'ad_images/user_{0}/{1}/{2}/{3}/image_{4}_{5}_{6}.png'.format(instance.user.id, now.year, now.month, now.day, now.hour, now.minute, now.second)


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
    # rating
    followers = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers', null=True)
    number_of_likes_recieved = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to=user_directory_path, default='/static/images/avatar_placeholder.svg')
    
@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()

