import jwt
import datetime
from .models import User
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status

class Auth():
    def authenticate(self,request):
        try:
            token = request.COOKIES.get('jwt')
            if not token:
                raise ValueError("Refresh token is required")
            
            payload = jwt.decode(token, "secret", algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError("Invalid token format")
        except jwt.ExpiredSignatureError:
            raise ValueError("JWT token has expired")
        except (jwt.DecodeError, User.DoesNotExist):
            raise ValueError("Invalid JWT token")
        
    def handle_login_or_register(self,login_method, login_details):
        user = None
        if login_method == 'phone_number':
            user = get_object_or_404(User, phone_number=login_details)
        elif login_method == 'facebook':
            user = get_object_or_404(User, facebook_token=login_details)
        elif login_method == "apple_id":
            user = get_object_or_404(User, apple_id=login_details)
        
        if user is None:
            return Response({"message": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # payload = {
            #     "id": user.id,
            #     "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=600),
            #     "iat": datetime.datetime.utcnow()
            # }
            # jwt_token = jwt.encode(payload, "secret", algorithm="HS256")
            if self._get_user_profile(user.id):
                response = self._encode(user.id)
                response.data = {"message":"Profile Found."}
                response.status_code = status.HTTP_200_OK
                return response
            else:
               return self._encode(user.id) 
            

    def _encode(self,user_id):
        payload = {
            "id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=600),
            "iat": datetime.datetime.utcnow()
        }
        jwt_token = jwt.encode(payload, "secret", algorithm="HS256")
        response_data = {"message": "Login successful"}
        response = Response(response_data, status=status.HTTP_201_CREATED)
        response.set_cookie(key='jwt', value=jwt_token, httponly=True)
        return response
    def _get_user_profile(self,user_id):
        profile = get_object_or_404(User,id = user_id)
        return profile.has_created_profile
        
        
    def _get_user(self, request):
        try:
            payload = self.authenticate(request)
            user_id = payload["id"]
            return User.objects.filter(pk=user_id).first()
        except ValueError as e:
            return None