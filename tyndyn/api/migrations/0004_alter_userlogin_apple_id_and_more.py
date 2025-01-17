# Generated by Django 5.0.6 on 2024-05-27 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_userlogin_apple_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userlogin',
            name='apple_id',
            field=models.CharField(blank=True, max_length=250, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='userlogin',
            name='facebook_token',
            field=models.CharField(blank=True, max_length=250, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='userlogin',
            name='phone_number',
            field=models.CharField(blank=True, max_length=15, null=True, unique=True),
        ),
    ]
