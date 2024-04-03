from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
# Create your models here.


class Posts(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    image = models.ImageField(upload_to='posts/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    likeCount = models.IntegerField(default=0)
    report_count = models.IntegerField(default=0)
    


class FollowList(models.Model):
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='followers', on_delete=models.CASCADE)

    def __str__(self):
        return self.following.username
    

class PostLike(models.Model):
    post = models.ForeignKey(Posts,on_delete=models.CASCADE, related_name='liked_post')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='comment_post')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likeCount = models.IntegerField(default=0)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='replies')

class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='liked_comment')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)




class Notification(models.Model):


    notification_choices = [
        ("Like", "Like"),
        ("Comment", "Comment"),
        ("Follow", "Follow"),
        ("Reply", "Reply"),
    ]


    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='send_notifications')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_notifications')
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name='post_notifications', blank=True, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_notifications', blank=True, null=True)
    action = models.CharField(max_length=20, choices=notification_choices)
    noti_content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender} --> {self.recipient} : {self.action}'
    


class OpenedNotification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    noti_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username
    


    
    


