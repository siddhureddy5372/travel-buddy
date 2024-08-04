from rest_framework import serializers
from api.models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'uploaded_at']
        read_only_fields = ['uploaded_at']

    def create(self, validated_data):
        user = self.context['user'] 
        image = validated_data.pop('image')
        instance = Image.objects.create(user=user, image=image)
        return instance
    