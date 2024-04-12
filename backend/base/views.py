from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer, UserSerializerWithToken, UserPictureSerailzer
from .models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from posts.models import OpenedNotification
import base64
import uuid


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


from django.core.files.base import ContentFile
import io
from PIL import Image

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def update_user_pic(request):
#     image_data = request.data.get('pro_pic')
#     user_id = request.data.get('id')
#     change_pic_type = request.data.get('changePicType')
#     user = User.objects.get(id=user_id)
#     format, imgstr = image_data.split(';base64,')
#     img_data = base64.b64decode(imgstr)
#     img = Image.open(io.BytesIO(img_data))
#     img.verify()
#     if 'profile picture' in change_pic_type:    
#         user.pro_pic.save(f'profile_picture_{user_id}.png', ContentFile(img_data), save=True)
#         return Response({'message':'Pic updated', 'profile_pic':user.pro_pic.url})
#     user.cover_pic.save(f'cover_picture_{user_id}.png', ContentFile(img_data), save=True)
#     return Response({'message':'Cover pic updated','cover_pic':user.cover_pic.url})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_user_pic(request):
    print('request data : ', request.data)
    user_id = request.data.get('userId')
    try:
        user = User.objects.get(id=user_id)
        serializer = UserPictureSerailzer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        return Response({'error': "User doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_pic(request):
    image_data = request.data.get('pro_pic')
    user_id = request.data.get('id')
    change_pic_type = request.data.get('changePicType')
    if not all([image_data, user_id, change_pic_type]):
        return Response({'error':'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(id=user_id)
        format, imgstr = image_data.split(';base64,')
        img_data = base64.b64decode(imgstr)
        img = Image.open(io.BytesIO(img_data))
        img.verify()

        if 'profile picture' in change_pic_type:
            user.pro_pic.save(f'profile_picture_{user_id}.png', ContentFile(img_data), save=True)
            return Response({'message':'Pic updated', 'profile_pic':user.pro_pic.url})
        elif 'Cover picture' in change_pic_type:
            user.cover_pic.save(f'cover_picture_{user_id}.png', ContentFile(img_data), save=True)
            return Response({'message':'Cover pic updated','cover_pic':user.cover_pic.url})
    except User.DoesNotExist:
        return Response({'error':'User not found'}, status=status.HTTP_404_NOT_FOUND)
    