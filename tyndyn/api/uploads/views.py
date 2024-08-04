from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import ImageSerializer
from api.authenticate import Auth
from api.models import Image

class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        auth = Auth()
        user_id = auth._get_user(request)
        print("BFKB",user_id)
        if user_id:
            images = Image.objects.filter(user=user_id)
        else:
            images = Image.objects.all()

        serializer = ImageSerializer(images, many=True)
        image_data_list = [
            {'image_url': request.build_absolute_uri(image['image'])} 
            for image in serializer.data
        ]

        return Response(image_data_list, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        try:
            print(request.FILES)
            images = request.FILES.getlist('images')
            
            if not images:
                return Response({'error': 'No images provided.'}, status=status.HTTP_400_BAD_REQUEST)
            auth = Auth()
            user_id = auth._get_user(request)
            if not user_id:
                return Response({"error":"User not found"},status=status.HTTP_400_BAD_REQUEST)
            image_instances = []
            for image in images:
                image_instance = Image(user=user_id, image=image)
                image_instance.save()
                image_instances.append(image_instance)

            serializer = ImageSerializer(image_instances, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print('Error in post:', e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)