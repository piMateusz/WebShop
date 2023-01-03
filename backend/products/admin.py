from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'is_active']
    list_filter = ['name', 'price', 'is_active']
    search_fields = ['name',]


admin.site.register(Product, ProductAdmin)
