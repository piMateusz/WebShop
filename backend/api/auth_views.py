from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.serializers import UserSerializer
from accounts.models import UserProfile
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = self.request.data['email']
        password = self.request.data['password']
        user = UserProfile.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found.')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password.')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

