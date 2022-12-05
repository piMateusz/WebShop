from django.urls import path
from products.views import ProductList, ProductDetail, CreateProduct, UpdateProduct, DeleteProduct
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

app_name = 'api'

urlpatterns = [
    # Authorization Token endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Product endpoints
    path('products/', ProductList.as_view()),
    path('product/<int:id>/', ProductDetail.as_view()),
    path('product/create/', CreateProduct.as_view()),
    path('product/update/<int:id>/', UpdateProduct.as_view()),
    path('product/delete/<int:id>/', DeleteProduct.as_view())


]