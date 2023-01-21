from django.urls import path
from products.views import ProductList, ProductDetail, CreateProduct, UpdateProduct, DeleteProduct, CategoryList
from orders.views import OrderList, CreateOrder, UserOrderList, OrderDetail
from api.auth_views import RegisterView, LoginView, LogoutView
from accounts.views import UserDetail

app_name = 'api'

urlpatterns = [
    # Authorization Token endpoints
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),

    path('user/<int:id>/', UserDetail.as_view()),

    # Product endpoints
    path('products/', ProductList.as_view()),
    path('product/<int:id>/', ProductDetail.as_view()),
    path('product/create/', CreateProduct.as_view()),
    path('product/update/<int:id>/', UpdateProduct.as_view()),
    path('product/delete/<int:id>/', DeleteProduct.as_view()),
    path('categories/', CategoryList.as_view()),


    # Order endpoints
    path('orders/', OrderList.as_view()),
    path('orders/create/', CreateOrder.as_view()),
    path('orders/user/<int:id>/', UserOrderList.as_view()),
    path('orders/<int:id>/', OrderDetail.as_view())
]
