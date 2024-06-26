
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('api/posts/', include('posts.urls')),
    # path('posts/', include('posts.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
