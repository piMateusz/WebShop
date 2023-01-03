from django.urls import path
from products.views import ProductList, ProductDetail, CreateProduct, UpdateProduct, DeleteProduct
from orders.views import OrderList
from api.auth_views import RegisterView, LoginView, LogoutView

app_name = 'api'

urlpatterns = [
    # Authorization Token endpoints
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    # Product endpoints
    path('products/', ProductList.as_view()),
    path('product/<int:id>/', ProductDetail.as_view()),
    path('product/create/', CreateProduct.as_view()),
    path('product/update/<int:id>/', UpdateProduct.as_view()),
    path('product/delete/<int:id>/', DeleteProduct.as_view()),

    # Order endpoints
    path('orders/', OrderList.as_view()),
]
