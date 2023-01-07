from django.db import models
from uuid import uuid4
from products.models import Product


class Order(models.Model):

    CODE_LENGTH = 8

    code = models.CharField(max_length=9, unique=True, blank=True)
    customer = models.ForeignKey('accounts.UserProfile', on_delete=models.CASCADE, related_name='orders')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date_created = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self._state.adding:
            self.code = self.generate_unique_code()
        super(Order, self).save(*args, **kwargs)

    def generate_unique_code(self):
        while True:
            code = uuid4().hex[:self.CODE_LENGTH].upper()
            if not Order.objects.filter(code=code):
                break
        return code

    def update_price(self):
        self.price = sum(self.products.values_list('price', flat=True))
        self.save()

    def __str__(self):
        return self.code


class ProductOrder(models.Model):
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='products')
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(default=0, max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.order} - {self.product}'

    def save(self, *args, **kwargs):
        self.price = self.quantity * self.product.price
        super(ProductOrder, self).save(*args, **kwargs)

    @classmethod
    def create_by_product_id(cls, product_id, quantity, order):
        product = Product.objects.get(id=product_id)
        product.stock -= quantity
        product.save()
        cls.objects.create(product=product, quantity=quantity, order=order)
