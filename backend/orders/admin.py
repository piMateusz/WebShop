from django.contrib import admin
from .models import Order, ProductOrder


# Register your models here.
class ProductOrderAdmin(admin.TabularInline):
    model = ProductOrder


class OrderAdmin(admin.ModelAdmin):
    inlines = [ProductOrderAdmin, ]


admin.site.register(Order, OrderAdmin)
