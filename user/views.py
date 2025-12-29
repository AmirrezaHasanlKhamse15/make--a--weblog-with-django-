from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer, UserCreateSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet برای کاربران:
    - لیست کاربران (فقط ادمین)
    - ثبت‌نام کاربر جدید
    - جزئیات کاربر
    """
    queryset = CustomUser.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # فقط ادمین می‌تواند لیست و جزئیات کاربران را ببیند
            permission_classes = [permissions.IsAdminUser]
        else:
            # سایر عملیات‌ها مانند create برای همه آزاد است
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """نمایش اطلاعات کاربر جاری"""
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


from rest_framework import generics, permissions
from .serializers import UserCreateSerializer

class RegisterView(generics.CreateAPIView):
    """
    ثبت‌نام کاربر جدید
    """
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]
