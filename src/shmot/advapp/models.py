from django.db import models 
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Advert(models.Model):

    def user_directory_path(instance, filename):
        now = datetime.datetime.now()
        # file will be uploaded to MEDIA_ROOT/ad_images/user_<id>/<year>/<month>/<day>/image_<hour>_<minute>_<second>
        return 'ad_images/user_{0}/{1}/{2}/{3}/image_{4}_{5}_{6}'.format(instance.user.id, now.year, now.month, now.day, now.hour, now.minute, now.second)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sex = models.CharField(max_length=7)
    category = models.CharField(max_length=30)
    c_type = models.CharField(max_length=30)
    size = models.CharField(max_length=10, blank=True)
    color = models.CharField(max_length=30)
    brand_name = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    price = models.IntegerField()
    city = models.CharField(max_length=15)
    forwarding = models.BooleanField()
    description = models.TextField()
    image1 = models.ImageField(upload_to=user_directory_path)
    image2 = models.ImageField(upload_to=user_directory_path, blank=True)
    image3 = models.ImageField(upload_to=user_directory_path, blank=True)
    image4 = models.ImageField(upload_to=user_directory_path, blank=True)
    