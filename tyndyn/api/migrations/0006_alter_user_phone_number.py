# Generated by Django 5.0.6 on 2024-05-29 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_hobby_remove_userprofile_user_login_user_message_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
    ]
