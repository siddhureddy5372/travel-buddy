from django.urls import path
from api.views import RegisterView, ProfileView,UserViewSet,LoginView

urlpatterns = [
  
path("profile/",ProfileView.as_view(),name="Profile"),
]