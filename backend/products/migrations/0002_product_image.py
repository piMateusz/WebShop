# Generated by Django 4.1.3 on 2023-01-03 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, height_field=100, upload_to='products/', width_field=100),
        ),
    ]