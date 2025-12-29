from rest_framework import serializers
from blog.models import Post
from user.models import CustomUser  
# =========================
# Serializer برای نویسنده
# =========================
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'full_name', 'phone_number')


# =========================
# Serializer برای پست
# =========================
class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'content',
            'author',
            'created_at',
            'is_published',
        )


# =========================
# Serializer برای ثبت نام کاربر
# =========================
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ('phone_number', 'full_name', 'password')

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', '')
        )


# =========================
# Serializer برای لاگین کاربر
# =========================
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            phone_number=data['phone_number'],
            password=data['password']
        )

        if not user:
            raise serializers.ValidationError("شماره یا رمز عبور نادرست است")

        refresh = RefreshToken.for_user(user)

        return {
            'user_id': user.id,
            'phone_number': user.phone_number,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
