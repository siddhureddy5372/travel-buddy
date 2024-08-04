from rest_framework import viewsets
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import User_info,UserLoginSerializer,ProfileSavingSerializer
from .authenticate import Auth

class LoginView(APIView):
    def post(self, request):
        login_method = request.data.get('parameter')
        login_details = request.data.get('detail')
        auth = Auth()
        response = auth.handle_login_or_register(login_method, login_details)
        return response

class RegisterView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        auth = Auth()
        if serializer.is_valid():
            instance = serializer.save()
            message = auth._encode(instance.id)
            return message
        if 'phone_number' in serializer.errors and \
                'user with this phone number already exists.' in serializer.errors['phone_number']:
            return auth.handle_login_or_register(login_method="phone_number",
                                            login_details=request.data.get("phone_number"))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):

    def _handle_post_request(self, request):
        auth = Auth()
        user = auth._get_user(request)
        if not user:
            return Response({"error": "Authentication failed"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProfileSavingSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        return self._handle_post_request(request)

    def get(self, request):
        auth = Auth()
        user = auth._get_user(request)
        if not user:
            return Response({"error": "Authentication failed"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProfileSavingSerializer(user)
        return Response(serializer.data)



class UserLogout(APIView):
    def post(self,request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {
            "message": "Successfully Loged out"
        }
        return response

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = User_info
