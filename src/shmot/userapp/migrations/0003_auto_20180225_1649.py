# Generated by Django 2.0.2 on 2018-02-25 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0002_auto_20180225_0426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='fb',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='vk',
            field=models.CharField(max_length=100, null=True),
        ),
    ]