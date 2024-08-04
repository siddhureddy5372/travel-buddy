from rest_framework import viewsets
from .models import UserPreference
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MultipleUserPreferencesSerializer,UserPreferenceSerializer
from .authenticate import Auth
from django.db import IntegrityError

class UserPreferenceSaving(APIView):
    def get(self, request):
        auth = Auth()
        user = auth._get_user(request)
        user_preferences = UserPreference.objects.filter(user=user)
        serializer = UserPreferenceSerializer(user_preferences, many=True)
        return Response(serializer.data)    
    def post(self, request):
        auth = Auth()
        user = auth._get_user(request) 
        try:
            serializer = MultipleUserPreferencesSerializer(data=request.data, context={'user': user})
            if serializer.is_valid():
                user_preferences = serializer.save()
                return Response({'user_preferences': [up.id for up in user_preferences]}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserPreferenceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserPreference.objects.all()
    serializer_class = UserPreferenceSerializer