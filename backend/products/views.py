from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.permissions import BasePermission


class IsStaffUser(BasePermission):
    """
    Allows access only to staff users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class ProductVisibilityFilterMixin:
    def get_queryset(self):
        return Product.objects.filter(is_active=True, stock__gt=0)


class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')

        if category:
            return Product.objects.filter(is_active=True, stock__gt=0, category__slug=category)
        return Product.objects.filter(is_active=True, stock__gt=0)


class ProductDetail(ProductVisibilityFilterMixin, generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = 'id'


class CreateProduct(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = (IsStaffUser,)


class UpdateProduct(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = (IsStaffUser,)
    queryset = Product.objects.all()
    lookup_field = 'id'


class DeleteProduct(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = (IsStaffUser,)
    queryset = Product.objects.all()
    lookup_field = 'id'


class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()








