from django.contrib import admin
from .models import Order, ProductOrder


class ProductOrderAdmin(admin.TabularInline):
    model = ProductOrder


class OrderAdmin(admin.ModelAdmin):
    inlines = [ProductOrderAdmin, ]
    list_display = ['code', 'price', 'customer', 'date_created']
    search_fields = ['code', 'customer']


admin.site.register(Order, OrderAdmin)
