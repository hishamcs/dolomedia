from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    phone = models.CharField(max_length=10, unique=True)
    pro_pic = models.ImageField(blank=True, null=True, default='default/pro_pic.png')
    cover_pic = models.ImageField(blank=True, null=True, default='default/cover_pic.png')
    
