from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    """نمایش اطلاعات کاربر"""
    class Meta:
        model = CustomUser
        fields = ['id', 'phone_number', 'full_name', 'email', 'role', 'profile_picture', 'birth_date', 'address', 'created_at']
        read_only_fields = ['id', 'role', 'created_at']


class UserCreateSerializer(serializers.ModelSerializer):
    """ثبت‌نام کاربر جدید"""
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ['phone_number', 'full_name', 'email', 'password', 'role']

    def create(self, validated_data):
        role = validated_data.get('role', 'reader')  # پیش‌فرض نقش reader
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(
            phone_number=validated_data['phone_number'],
            password=password,
            full_name=validated_data.get('full_name', ''),
            email=validated_data.get('email', ''),
            role=role
        )
        return user



