from .serializers import UserSerializer, UserProfile
from rest_framework import generics


class UserDetail(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return UserProfile.objects.all()
