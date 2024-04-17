from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView
from base.models import User
from .serializers import PostSerializer,CommentSerializer,FollowListSerializer, NotificationSerializer
from base.serializers import UserSerializer
from .models import FollowList,Posts,PostLike,Comment,Notification, OpenedNotification, CommentLike
from django.db.models import F
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.conf import settings
from rest_framework import status
import os

# Create your views here.

class PostsView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def post(self, request):
        user_id = request.data.get('userId')
        if not user_id:
            return Response({'error : userId is required...'}, status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(User, id=user_id)
        serializer = self.serializer_class(data=request.data)
        content = request.data.get('content')
        image = request.data.get('image')
        video = request.data.get('video')
        if serializer.is_valid():
            serializer.save(user=user, image=image, content=content, video=video)
            return Response({'message':'success'}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response({'errors':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        print('request .data : ', request.data)
        user_id = request.GET.get('userId')
        if user_id is None:
            return Response({'error':'User id is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = get_object_or_404(User, id=user_id)
            user_following = list(user.following.all().values_list('following_id',flat=True))
            user_following.append(user.id)
            posts = Posts.objects.filter(user__in=user_following)
            serializer = self.serializer_class(posts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print('exception  :', e)
            return Response({'error':str(e)}, status=status.HTTP_404_NOT_FOUND)
        
        

    def delete(self, request):
        post_id = request.GET.get('postId')
        try:
            post = Posts.objects.get(id=post_id)
            if post.image:
                image_file_path = os.path.join(settings.MEDIA_ROOT, str(post.image))
                if os.path.exists(image_file_path):
                    os.remove(image_file_path)
                else:
                    return Response({'error':'Image file doesnot exist'}, status=status.HTTP_404_NOT_FOUND)
            
            if post.video:
                video_file_path = os.path.join(settings.MEDIA_ROOT, str(post.video))
                if os.path.exists(video_file_path):
                    os.remove(video_file_path)
                else:
                    return Response({'error':'Video file doesnot exist'},status=status.HTTP_404_NOT_FOUND)
            post.delete()
            posts = Posts.objects.all()
            serializer = self.serializer_class(posts, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Posts.DoesNotExist:
            return Response({'error':'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    
    def patch(self, request):
        print('daat : ', request.data)
        post_id = request.data.get('postId')
        if post_id is None:
            return Response({'error':'postid is required'}, status=status.HTTP_400_BAD_REQUEST)
        post = get_object_or_404(Posts, id=post_id)
        serializer = self.serializer_class(instance=post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'success'}, status=status.HTTP_200_OK)
        else:
            print('errors : ', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # post_id = request.data.get('postId')
        # post = Posts.objects.get(id=post_id)
        # post.report_count += 1
        # post.save()

class UserSuggestions(APIView):
    def get(self,request,user_id):
        user = User.objects.get(id=user_id)
        users = User.objects.filter(is_superuser=False).exclude(id=user_id)
        users_followings = user.following.all()
        suggestions = users.exclude(followers__in=users_followings)
        serializer = UserSerializer(suggestions, many=True)
        return Response(serializer.data)
    
class FollowUser(APIView):
    def post(self, request, user_id, fuser_id):
        user = User.objects.get(id=user_id)
        follows = User.objects.get(id=fuser_id)
        FollowList.objects.create(follower=user, following=follows)
        status = f'{user.username} started to following you'
        Notification.objects.create(sender=user, recipient=follows, action="Follow", noti_content=status)
        OpenedNotification.objects.filter(user=follows).update(noti_count=F('noti_count')+1)
        user_following = user.following.all()
        users = User.objects.filter(is_superuser=False).exclude(id=user_id)
        suggested_users = users.exclude(followers__in=user_following)
        serializer = UserSerializer(suggested_users, many=True)
        return Response(serializer.data)
    

class PostLikes(APIView):
    def get(self,request,user_id,post_id):
        post = Posts.objects.get(id=post_id)
        user = User.objects.get(id=user_id)
        post_like = PostLike.objects.filter(user__id=user_id, post__id=post_id)
        if post_like:
            post_like.delete()
            post.likeCount -= 1
            response = {'postliked':False,'likeCount':post.likeCount}
            if user!=post.user:
                notification = Notification.objects.get(sender=user, recipient=post.user, post=post, action="Like")
                OpenedNotification.objects.filter(user=post.user, noti_count__gt=0).update(noti_count=F('noti_count')-1)
                notification.delete()
        else:
            PostLike.objects.create(user_id=user_id,post_id=post_id, liked=True)
            post.likeCount += 1
            response = {'postliked':True,'likeCount':post.likeCount}
            ##########
            if user!=post.user:
                status = f'{user.username} Likes your post'
                notification = Notification.objects.create(sender=user, recipient=post.user, post=post, action="Like", noti_content=status)
                OpenedNotification.objects.filter(user=post.user).update(noti_count=F('noti_count')+1)
        post.save()
        return Response(response)
    
    def post(self, request):
        user_id = request.data.get('user_id')
        post_id = request.data.get('post_id')
        post = Posts.objects.get(id=post_id)
        comment_count = post.comment_post.filter(parent=None).count()
        like_count = post.likeCount
        like_post = PostLike.objects.filter(user__id=user_id, post__id=post_id)
        if like_post:
            islike_post = like_post[0].liked
        else:
            islike_post = False
        response = {'isLikePost':islike_post,'likeCount':like_count,'commentCount':comment_count}
        return Response(response)
    

class CommentView(APIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    def post(self,request):
        comment_id = request.data.get('commentId')
        
        if comment_id:
            parent = get_object_or_404(Comment, id=comment_id)
            user_id = request.data.get('userId')
            user = get_object_or_404(User, id=user_id)
            reply_id = request.data.get('replyId', None)
            reply = Comment.objects.filter(id=reply_id)
            post = parent.post
            content = request.data.get('content')
            serializer = self.serializer_class(data=request.data)
            print(f'user : {user} parent.user : {parent.user}')
            if serializer.is_valid():
                cmt = serializer.save(user=user, post=post, content=content, parent=parent)
                if user!=parent.user:
                    status = f'{user.username} is replied to your comment'
                    Notification.objects.create(sender=user, recipient=parent.user, post=post, comment=cmt, action="Reply", noti_content=status)
                    OpenedNotification.objects.filter(user=parent.user).update(noti_count=F('noti_count')+1)
                elif reply and reply[0].user!=user:
                    status = f'{user.username} is replied to your comment'
                    Notification.objects.create(sender=user, recipient=reply[0].user, post=post, comment=cmt, action="Reply", noti_content=status)
                    OpenedNotification.objects.filter(user=reply[0].user).update(noti_count=F('noti_count')+1)
                replies = Comment.objects.filter(parent=parent)
                serializer = self.serializer_class(replies, many=True)
                return Response(serializer.data)
            else:
                print(serializer.errors)
                return Response(serializer.errros)
            
            
        else:
            content = request.data.get('content')
            user_id = request.data.get('userId')
            post_id = request.data.get('postId')
            user = get_object_or_404(User, id=user_id) 
            post_instance = get_object_or_404(Posts, id=post_id)
            serializer = self.serializer_class(data=request.data)
            
            if serializer.is_valid():
                cmt = serializer.save(post=post_instance,content=content, user=user)
                if user_id != post_instance.user.id:
                    status = f'{user.username} commented on your post'
                    Notification.objects.create(sender=user, recipient=post_instance.user, post=post_instance, comment=cmt, action="Comment", noti_content=status)
                    OpenedNotification.objects.filter(user=post_instance.user).update(noti_count=F('noti_count')+1)
                comments = Comment.objects.filter(post__id=post_id, parent=None)
                serializer = self.serializer_class(comments, many=True)
                return Response(serializer.data)
            else:
                print(serializer.errors)
                return Response(serializer.errors)
            

    
    def get(self,request):
        comment_id = request.GET.get('commentId')
        post_id = request.GET.get('postId')
        user_id = request.GET.get('userId')
        if comment_id:
            comment = Comment.objects.get(id=comment_id)
            replies = comment.replies.all()
            # print('replies : ', replies)
            serializer = self.serializer_class(replies, many=True, context={'user_id':user_id})
            return Response(serializer.data)
        
        comments = Comment.objects.filter(post__id=post_id, parent=None)
        serializer = self.serializer_class(comments, many=True, context={'user_id':user_id})
        return Response(serializer.data)
    
    def delete(self, request):
        comment_id = request.GET.get('commentId')
        user_id = request.GET.get('userId')
        if not comment_id:
            return Response({'error':'comment id is required...'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_id:
            return Response({'error':'user id is required...'}, status=status.HTTP_400_BAD_REQUEST)
        comment = get_object_or_404(Comment, id=comment_id)
        parent = comment.parent
        comment_post = comment.post
        comment.delete()
        if parent:
            print('parent of the comment : ', parent)
            replies = parent.replies.all()
            serializer = self.serializer_class(replies, many=True, context={'user_id':user_id})
        else:
            print('post of the comment : ', comment_post)
            comments = Comment.objects.filter(post=comment_post, parent=None)
            serializer = self.serializer_class(comments, many=True, context={'user_id':user_id})

        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        comment_id = request.data.get('commentId')
        if not comment_id:
            return Response({'error':'Comment id is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            comment = get_object_or_404(Comment, id=comment_id)
        except Comment.DoesNotExist:
            return Response({'error':'Comment Doesnot exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(instance=comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            if comment.parent:
                comments = Comment.objects.filter(parent=comment.parent) # Replies
            else:
                comments = Comment.objects.filter(post=comment.post)
            serializer = self.serializer_class(comments, many=True)
            return Response({'message':'updated successfully', 'data':serializer.data}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({'error':serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    

class ProfileView(APIView):
    def get(self,request, user_id):
        
        user = User.objects.get(id=user_id)
        following = user.following.all().count()
        followers = user.followers.all().count()
        posts = Posts.objects.filter(user__id=user_id)
        post_serializer = PostSerializer(posts,many=True)
        user_serializer = UserSerializer(user)
        serializer_data = {
            'user':user_serializer.data,
            'posts':post_serializer.data,
            'followersCount':followers,
            'followingCount':following,
        }
        return Response(serializer_data) 

class FollowingList(APIView):
    serializer_class = FollowListSerializer
    def post(self, request):
        info = request.data.get('info')
        user_id = request.data.get('userId')
        user = User.objects.get(id=user_id)
        
        if info:
            followers_list = user.followers.all()
            serializer = self.serializer_class(followers_list, many=True)
            return Response(serializer.data)
        
        following_list = user.following.all()
        serializer = self.serializer_class(following_list, many=True)
        
        return Response(serializer.data)      



class NotificationView(APIView):
    serializer_class = NotificationSerializer

    def get(self,request):
        user_id = request.GET.get('userId')
        notifications = Notification.objects.filter(recipient_id=user_id).order_by('-timestamp')
        OpenedNotification.objects.filter(user_id=user_id).update(noti_count=0)
        not_seen_notif_count = OpenedNotification.objects.get(user_id=user_id)
        not_seen_notif_count.noti_count = 0
        not_seen_notif_count.save()
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'notification_{user_id}', {'type':'send.notifications', 'message':not_seen_notif_count.noti_count}
        )
        serializer = self.serializer_class(notifications, many=True)
        return Response({'notifications':serializer.data})
    


class CommentLikeView(APIView):
    def get(self, request):
        return Response({'message':'success'})
    def post(self, request):
        user_id = request.data.get('userId')
        comment_id = request.data.get('commentId')
        comment = Comment.objects.get(id=comment_id)
        comment_like = CommentLike.objects.filter(user__id=user_id, comment__id=comment_id)
        
        if comment_like:
            comment_like[0].delete()
            comment.likeCount -= 1
            if user_id != comment.user.id:
                notification = Notification.objects.get(sender__id=user_id,recipient=comment.user, comment=comment, action='Like')
                OpenedNotification.objects.filter(user=comment.user, noti_count__gt=0).update(noti_count=F('noti_count')-1)
                notification.delete()
            response = {'commentLike':False, 'likeCount':comment.likeCount}
        else:
            CommentLike.objects.create(user_id=user_id, comment_id=comment_id)
            comment.likeCount += 1
            if user_id != comment.user.id:
                user = User.objects.get(id=user_id)
                status = f'{user.username} Likes your comment'
                Notification.objects.create(sender=user, recipient=comment.user, comment=comment, action='Like', noti_content=status)
                OpenedNotification.objects.filter(user=comment.user).update(noti_count=F('noti_count')+1)
            response = {'commentLike':True, 'likeCount':comment.likeCount}
        comment.save()
            
        return Response(response)       