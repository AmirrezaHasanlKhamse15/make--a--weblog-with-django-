from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrAdmin

from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthorOrAdmin(BasePermission):
    """
    فقط نویسنده یا ادمین اجازه ویرایش/حذف دارد
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user or request.user.is_staff



from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from .serializers import PostSerializer
from .permissions import IsAuthorOrAdmin

class PostViewSet(viewsets.ModelViewSet):
    """
    مدیریت پست‌ها:
    - کاربران ناشناس: فقط مشاهده (read-only)
    - نویسنده: ایجاد و ویرایش پست‌های خود
    - ادمین: مدیریت کامل (ویرایش/حذف همه پست‌ها)
    """

    queryset = Post.objects.all().order_by('-publish_date', '-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrAdmin]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'author__full_name']
    ordering_fields = ['publish_date', 'created_at']
    ordering = ['-publish_date']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
