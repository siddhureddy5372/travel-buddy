from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ProfileView,UserViewSet,LoginView
from .hobbies_views import UserPreferenceViewSet,UserPreferenceSaving
from .views import UserLogout
from .countries_view import UserCountriesViewSet,UserCountriesSaving
from .response import urls as response_urls
from .uploads import urls as upload_urls

# Define the router for the UserViewSet
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'users_preferences', UserPreferenceViewSet, basename='user-preferences')
router.register(r"User_countries",UserCountriesViewSet)


# Define URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('ans/',include(response_urls)),
    path('upload/',include(upload_urls)),
    # USER 
    path("register/", RegisterView.as_view(), name="register"),
    path("login/",LoginView.as_view(),name = "Login"),
    path("logout/",UserLogout.as_view(),name="logout"),
    # Profile
    path("countries/",UserCountriesSaving.as_view(),name="countries"),
    path("profile/",ProfileView.as_view(),name="profile"),
    # Preferences
    path("preference/",UserPreferenceSaving.as_view(),name="preference")
]
