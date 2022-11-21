from django.urls import path
from accounts import views

app_name = 'accounts'

urlpatterns = [
    path('hello/', views.HelloView.as_view(), name='hello'),
]
