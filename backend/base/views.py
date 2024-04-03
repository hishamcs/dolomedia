from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer, UserSerializerWithToken
from .models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from posts.models import OpenedNotification


# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get(self.username_field)
        password = attrs.get("password")
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.filter(is_superuser=False)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
def registerUser(request):
    data = request.data

    
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email= data['email'],
            password = make_password(data['password']),
            phone = data['phoneNumber']
        )
        OpenedNotification.objects.create(user=user)
        serializer = UserSerializerWithToken(user)
        return Response(serializer.data)
    except:
        message = {'detail':'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])    
def blo_unblo_user(request, pk):
    user = User.objects.get(pk=pk)
    if user.is_active:
        user.is_active = False
        user.save()
        return Response({'message':'User is blocked...','title':'Blocked'})
    else:
        user.is_active = True
        user.save()
        return Response({'message':'User is unblocked...','title':'Unblocked'})
    
@api_view(['GET'])
def search_user(request):
    search_name = request.GET.get('user')
    user_id = request.GET.get('userId')
    users = User.objects.filter(first_name__contains=search_name).exclude(id=user_id)
    searilizer = UserSerializer(users, many=True)
    return Response(searilizer.data)

@api_view(['GET'])
def generate_otp(request):
    
    return Response({'message':'otp generated'})
