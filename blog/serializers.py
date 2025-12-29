from rest_framework import serializers
from .models import Post

from rest_framework import serializers
from .models import Post

from rest_framework import serializers
from blog.models import Post
from user.models import CustomUser


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'full_name', 'phone_number')


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

