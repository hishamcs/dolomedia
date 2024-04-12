from rest_framework import serializers
from .models import Posts,Comment, FollowList,Notification, CommentLike
from base.serializers import UserSerializer
from .utils import format_time




class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_time = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Posts
        fields = ['id', 'user', 'content', 'image', 'likeCount', 'post_time']

    def get_post_time(self, obj):
        return format_time(obj.update_at)
        


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    isUserLiked = serializers.SerializerMethodField(read_only=True)
    count_replies = serializers.SerializerMethodField(read_only=True)
    time = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'time', 'likeCount', 'parent','isUserLiked','count_replies']

    def get_isUserLiked(self, obj):
        user_id = self.context.get('user_id')
        ob = CommentLike.objects.filter(user__id=user_id,comment=obj)
        if ob:
            return True
        return False
    
    def get_count_replies(self, obj):
        replies = Comment.objects.filter(parent=obj)
        if replies:
            return replies.count()
        return 0
    
    def get_time(self, obj):
        return format_time(obj.timestamp)


class FollowListSerializer(serializers.ModelSerializer):
    following = UserSerializer(read_only=True)
    follower = UserSerializer(read_only=True)
    class Meta:
        model = FollowList
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'