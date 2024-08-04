from django.contrib import admin
from .models import Categories,Item,UserPreference,User,UserCountries,Image

admin.site.register(Categories)
admin.site.register(Item)
admin.site.register(UserPreference)
admin.site.register(User)
admin.site.register(Image)
admin.site.register(UserCountries)
