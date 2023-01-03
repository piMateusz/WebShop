# Generated by Django 4.1.3 on 2023-01-02 23:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_order_date_created_order_price_alter_order_code_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='productorder',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]