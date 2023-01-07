from rest_framework import generics
from rest_framework.views import APIView
from .serializers import OrderSerializer
from .models import Order, ProductOrder
from accounts.models import UserProfile
from rest_framework.response import Response
from products.models import Product
from django.http import Http404


class OrderList(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.all()


class CreateOrder(APIView):
    """
    params:
    - user: id of user
    - products: product_id, quantity
    """

    def post(self, request):
        user_id = self.request.data.get('user')
        products = self.request.data.get('products')

        if not self.can_be_ordered(products):
            return Response(status=400, data={'error': 'Too high quantity'})

        # Create order
        try:
            user = UserProfile.objects.get(id=user_id)
        except UserProfile.DoesNotExist:
            raise Http404
        order = Order.objects.create(customer=user)

        # Create product orders
        for product_data in products:
            product_id = product_data.get('id')
            quantity = product_data.get('quantity')
            ProductOrder.create_by_product_id(product_id, quantity, order)

        order.update_price()

        response = Response()
        response.data = {
            'message': 'Order created',
            'order_code': order.code
        }

        return response

    @staticmethod
    def can_be_ordered(products):
        for product_data in products:
            product_id = product_data.get('id')
            quantity = product_data.get('quantity')
            product = Product.objects.get(id=product_id)

            if quantity > product.stock:
                return False
        return True
