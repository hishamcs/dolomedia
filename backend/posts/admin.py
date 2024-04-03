from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Posts)
admin.site.register(Comment)
admin.site.register(FollowList)
admin.site.register(PostLike)
admin.site.register(Notification)
admin.site.register(OpenedNotification)
