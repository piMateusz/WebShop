from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class UserProfile(AbstractUser):
    address = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.email})'
