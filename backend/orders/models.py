from django.db import models
from accounts.models import UserProfile
from products.models import Product

# Create your models here.


class Order(models.Model):
    code = models.CharField(max_length=9)
    customer = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='orders')
    price = models.DecimalField(max_digits=10, decimal_places=2)


class ProductOrder(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name='products')
    quantity = models.IntegerField(default=0)
