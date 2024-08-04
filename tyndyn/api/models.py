from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class User(AbstractUser):
    phone_number = models.CharField(max_length=50, blank=True, null=True, unique=True)
    facebook_token = models.CharField(max_length=250, blank=True, null=True, unique=True)
    apple_id = models.CharField(max_length=250, blank=True, null=True, unique=True)
    username = models.CharField(max_length=250,null = True)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=100, null=True)
    location = models.CharField(max_length=250, blank=True, null=True)
    bio = models.CharField(max_length=350, blank=True, null=True)
    mode = models.CharField(max_length=50,blank=True,null=True)
    show_gender = models.BooleanField(default=False)
    notifications = models.BooleanField(default=False)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    has_created_profile = models.BooleanField(default=False)

    def __str__(self):
        return self.username if self.username else 'No Name'

    def clean(self):
        if self.phone_number and (self.facebook_token or self.apple_id):
            raise ValidationError("Only one of phone_number, facebook_token, or apple_id can be set.")
        if self.facebook_token and (self.phone_number or self.apple_id):
            raise ValidationError("Only one of phone_number, facebook_token, or apple_id can be set.")
        if self.apple_id and (self.phone_number or self.facebook_token):
            raise ValidationError("Only one of phone_number, facebook_token, or apple_id can be set.")
        
    
    groups = models.ManyToManyField('auth.Group', related_name='+')
    user_permissions = models.ManyToManyField('auth.Permission', related_name='+')


class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class UserCountries(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    has_been = models.JSONField(default=list,blank=True,null=True)
    want_to_go = models.JSONField(default=list,blank=True,null=True)

    def __str__(self):
        return f"{self.user} - Countries"  if f"{self.user}" else 'No Name'

class Categories(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name if self.name else 'No Name'

class Item(models.Model):
    category = models.ForeignKey(Categories,on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name if self.name else 'No Name'

class UserPreference(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    preference = models.ForeignKey(Item,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} - {self.preference}" if f"{self.user} - {self.preference}" else 'No Name'


class Match(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="matches_as_user1")
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="matches_as_user2")
    matched_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
