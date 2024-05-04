from .models import User, ChatRoom, Message, UserOnlineStatus
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from drf_extra_fields.fields import Base64ImageField 
import base64
from posts.utils import format_time
from django.shortcuts import get_object_or_404



class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    is_online = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id','email', 'name','is_active','isAdmin','pro_pic', 'cover_pic', 'is_online']

    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_is_online(self, obj):
        status = get_object_or_404(UserOnlineStatus, user=obj)
        return status.is_online
    

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','email', 'name','token','isAdmin', 'pro_pic', 'cover_pic']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class UserPictureSerailzer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['pro_pic', 'cover_pic']


class ChatroomSerializer(serializers.ModelSerializer):
    user1 = UserSerializer(read_only=True)
    user2 = UserSerializer(read_only=True)
    last_message = serializers.SerializerMethodField(read_only=True)
    last_msg_read = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ChatRoom
        fields = ['id', 'user1', 'user2', 'last_message', 'last_msg_read']

    def get_last_message(self, obj):
        last_message = obj.messages.order_by('-id').first()
        if last_message:
            return last_message.message
        return None
        
    def get_last_msg_read(self, obj):
        last_message = obj.messages.order_by('-id').first()
        if last_message and last_message.is_read:
            return True
        return False
        
    


class MessageSerializer(serializers.ModelSerializer):
    timestamp =serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Message
        fields = '__all__'

    def get_timestamp(self, obj):
        return format_time(obj.timestamp)

    