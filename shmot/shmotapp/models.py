import datetime

from django.db import models
from django.utils import timezone


# Create your models here.

class Image(models.Model):
    image = models.ImageField(upload_to='img')


class Advert(models.Model):
    is_active = models.BooleanField()

    author = models.CharField(max_length=30)  # TODO: change it to ForeignKey field
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)

    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    updated_date = models.DateTimeField(blank=True, null=True)
    is_updated = models.BooleanField(default=False)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    number_of_likes = models.IntegerField(default=0)
    city_tmp = models.CharField(max_length=20)  # Temporary shit. Going to add choices from csv/database
    brand = models.CharField(max_length=30)
    size = models.IntegerField(default=0)  # TODO: add basic choices from tuple
    color = models.CharField(max_length=20)  # TODO: add basic choices from tuple

    images = models.ForeignKey(Image, related_name='images', on_delete=models.CASCADE)

    # TODO: Add here normal city field

    def publish(self):
        self.published_date = timezone.now()
        self.is_active = True
        self.save()

    def was_published_recently(self):
        return self.published_date >= timezone.now() - datetime.timedelta(days=1)

    def __str__(self):
        return self.title
