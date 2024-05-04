from django.contrib import admin
from .models import User, ChatRoom, Message, UserOnlineStatus
from django.contrib.auth.admin import UserAdmin
# Register your models here.
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('phone','pro_pic', 'cover_pic')


admin.site.register(User,UserAccountAdmin)
admin.site.register(ChatRoom)
admin.site.register(Message)
admin.site.register(UserOnlineStatus)

