# Generated by Django 2.0.2 on 2018-02-27 05:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import userapp.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(default=0, max_length=25)),
                ('city', models.CharField(max_length=20, null=True)),
                ('vk', models.CharField(max_length=100, null=True)),
                ('fb', models.CharField(max_length=100, null=True)),
                ('number_of_posts', models.IntegerField(default=0)),
                ('sold', models.IntegerField(default=0)),
                ('avatar', models.ImageField(default='/static/images/avatar_placeholder.svg', upload_to=userapp.models.Profile.user_directory_path)),
                ('following_people', models.ManyToManyField(related_name='followed_by', to='userapp.Profile')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
