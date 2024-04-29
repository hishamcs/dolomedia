from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    phone = models.CharField(max_length=10, unique=True)
    pro_pic = models.ImageField(blank=True, null=True, default='default/pro_pic.png')
    cover_pic = models.ImageField(blank=True, null=True, default='default/cover_pic.png')

class ChatRoom(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='user1',null=True)
    user2 = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='user2', null=True)
    
    def __str__(self):
        return f'{self.user1.username}<---->{self.user2.username}'
    

class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='send_msgs', null=True)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.sender.username
    
    
