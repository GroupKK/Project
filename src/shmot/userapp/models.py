import datetime

from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    def user_directory_path(instance, filename):
        now = datetime.datetime.now()
        # file will be uploaded to MEDIA_ROOT/ad_images/user_<id>/<year>/<month>/<day>/image_<hour>_<minute>_<second>
        return 'user_images/user_{0}/{1}/{2}/{3}/image_{4}_{5}_{6}'.format(instance.user.id, now.year, now.month,
                                                                               now.day, now.hour, now.minute,
                                                                               now.second)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=25, default=000000000)
    city = models.CharField(max_length=20, null=True)
    vk = models.CharField(max_length=30, null=True)
    fb = models.CharField(max_length=30, null=True)
    number_of_posts = models.IntegerField(blank=False, default=0)  # active + inactive
    sold = models.IntegerField(default=0)
    following_people = models.ManyToManyField('Profile', related_name='folloing_people')
    # rating
    avatar = models.ImageField(upload_to=user_directory_path, default='/static/images/avatar_placeholder.svg')


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
