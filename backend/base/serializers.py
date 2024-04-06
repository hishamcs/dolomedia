from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from drf_extra_fields.fields import Base64ImageField 
import base64



class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id','email', 'name','is_active','isAdmin','pro_pic', 'cover_pic']

    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','email', 'name','token','isAdmin']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


    

    