from django.db import models
from accounts.models import UserProfile
from products.models import Product
from decimal import Decimal

# Create your models here.


class Order(models.Model):
    code = models.CharField(max_length=9)
    customer = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='orders')

    @property
    def price(self) -> Decimal:
        price = Decimal('0')
        for elem in self.products.all():
            price += elem.product.price * elem.quantity
        return price


class ProductOrder(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name='products')
    quantity = models.IntegerField(default=0)
