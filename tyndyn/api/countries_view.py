from rest_framework import viewsets
from .models import UserCountries
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .authenticate import Auth
from .serializers import UserCountriesSerializer

class UserCountriesSaving(APIView):
    def post(self,request):
        auth = Auth()
        user = auth._get_user(request)
        if user is not None: 
            serializer = UserCountriesSerializer(data=request.data,context={"user":user})
            print(serializer.initial_data)
            if serializer.is_valid():
                user_preferences = serializer.save()
                print(user_preferences.has_been)
                return Response({"Success":"Countries have been saved"},status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "User Not Found"}, status=status.HTTP_400_BAD_REQUEST)

class UserCountriesViewSet(viewsets.ModelViewSet):
    queryset = UserCountries.objects.all()
    serializer_class = UserCountriesSerializer