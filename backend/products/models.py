from django.db import models
from django_resized import ResizedImageField
import os


class Product(models.Model):

    IMAGE_SIZE = 200

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    stock = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    image = ResizedImageField(size=[IMAGE_SIZE, IMAGE_SIZE], upload_to='products/', blank=True, null=True)

    def __str__(self):
        return self.name
