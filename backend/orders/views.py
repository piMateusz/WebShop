from rest_framework import generics
from .serializers import OrderSerializer
from .models import Order


class OrderList(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.all()
