# urls.py

from django.urls import path
from .views import ImageUploadView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('image/', ImageUploadView.as_view(), name='image-upload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
