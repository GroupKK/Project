# Generated by Django 2.0.2 on 2018-02-24 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0009_profile_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='number_of_sold_items',
        ),
    ]
