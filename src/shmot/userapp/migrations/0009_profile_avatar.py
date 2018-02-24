# Generated by Django 2.0.2 on 2018-02-24 14:29

from django.db import migrations, models
import userapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0008_profile_selled'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='/static/images/avatar_placeholder.svg', upload_to=userapp.models.Profile.user_directory_path),
        ),
    ]
