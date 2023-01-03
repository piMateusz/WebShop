from rest_framework import serializers
from .models import Order, ProductOrder


class ProductOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductOrder
        fields = (
            'product', 'quantity', 'price'
        )


class OrderSerializer(serializers.ModelSerializer):
    products = ProductOrderSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            'id', 'code', 'customer', 'price', 'date_created', 'products'
        )
