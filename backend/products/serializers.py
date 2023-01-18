from rest_framework import serializers
from .models import Product, Category


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'price', 'description', 'stock', 'is_active', 'image', 'category'
        )


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id', 'title', 'slug'
        )