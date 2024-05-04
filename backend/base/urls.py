from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView
from .views import MyTokenObtainPairSerializer   

urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/profile/', views.getUserProfile, name='userprofile'),
    path('users/', views.getUsers, name='users'),
    path('users/register/', views.registerUser,name='register'),
    path('user/blo-unblo/<str:pk>/', views.blo_unblo_user, name='blo_unblo_user'),
    path('user-search/', views.search_user, name='search_user'),
    path('otp-generation/', views.generate_otp),
    path('user/profile/update-pic/', views.update_user_pic, name='user_pic_udpate'),
    path('user/profile/fetch-user-pics/', views.fetch_user_pic, name='user_pic'),
    path('chatroom/', views.chatroom, name='chatroom'),
    path('chatlist/',views.chatlist, name='chatlist'),
    path('chatroom/messages/', views.getChatroomMsg, name='getroom_msgs'),
]
