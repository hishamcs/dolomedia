from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .serializers import *
from .models import User, ChatRoom, UserOnlineStatus
from django.contrib.auth.hashers import make_password
from rest_framework import status
from posts.models import OpenedNotification
import base64
from django.db.models import Q
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django.db.models import F

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user).data
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
    
# @api_view(['POST'])
# def registerUser(request):
#     data = request.data
#     print(data)
    
#     try:
#         user = User.objects.create(
#             first_name = data['name'],
#             username = data['email'],
#             email= data['email'],
#             password = make_password(data['password']),
#             phone = data['phoneNumber']
#         )
#         OpenedNotification.objects.create(user=user)
#         UserOnlineStatus.objects.create(user=user)
#         serializer = UserSerializer(user)
#         return Response(serializer.data)
#     except Exception as e:
#         print(e)
#         return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
    # except:
    #     message = {'detail':'User with this email already exists'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])    
def registerUser(request):
    print('request.data : ', request.data)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        OpenedNotification.objects.create(user=user)
        UserOnlineStatus.objects.create(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('not valid')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
@permission_classes([IsAuthenticated])
def search_user(request):
    search_name = request.GET.get('user').strip()
    if not search_name:
        return Response({'message':'please enter the username'}, status=status.HTTP_400_BAD_REQUEST)
    user_id = request.GET.get('userId')
    if not user_id or not user_id.isdigit():
        return Response({'message':'Invalid user id'}, status=status.HTTP_400_BAD_REQUEST)
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chatroom(request):
    
    user_id = request.data.get('userId')
    receiver_id = request.data.get('receiverId')
    try:
        user_id = int(user_id)
        receiver_id = int(receiver_id)
    except (TypeError, ValueError):
        return Response({'message':'Invalid user id or receiver id '}, status=status.HTTP_400_BAD_REQUEST)
    
    if user_id == receiver_id:
        return Response({'message':"user id and receiver id can't be same"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        chatroom = ChatRoom.objects.filter(Q(user1_id=user_id,user2_id=receiver_id) | Q(user1_id=receiver_id, user2_id=user_id)).first()
        if not chatroom:
            chatroom = ChatRoom.objects.create(user1_id=user_id,user2_id=receiver_id)
        serializer = ChatroomSerializer(chatroom)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except IntegrityError:
        return Response({'message':'Failed to create chatroom. Invalid user id or receiver id'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({'message':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chatlist(request):
    user_id = request.data.get('userId')
    try:
        user_id = int(user_id)
    except(ValueError, TypeError):
        return Response({'message':'Invalid user id'}, status=status.HTTP_400_BAD_REQUEST)
    
    chatlist = ChatRoom.objects.filter(Q(user1_id=user_id) | Q(user2_id=user_id))
    serializer = ChatroomSerializer(chatlist, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getChatroomMsg(request):
    try:
        room_id = request.GET.get('chatroomId')
        if not room_id:
            return Response({'detail':'Room id is required'}, status=status.HTTP_400_BAD_REQUEST)
        room = get_object_or_404(ChatRoom, id=room_id)
        messages = room.messages.all()
        # messages.update(is_read=True)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    except ValueError:
        return Response({'detail':'Invalid room id'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    