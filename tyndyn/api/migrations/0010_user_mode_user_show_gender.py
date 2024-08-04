# Generated by Django 5.0.6 on 2024-06-05 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_user_notifications'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='mode',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='show_gender',
            field=models.BooleanField(default=False),
        ),
    ]
