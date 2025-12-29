from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import login, logout

from blog.models import Post
from .serializers import (
    PostSerializer,
    RegisterSerializer,
    LoginSerializer
)
from .permissions import ReadOnlyOrAuthor


class PostListAPI(APIView):
    permission_classes = [ReadOnlyOrAuthor]

    def get(self, request):
        posts = Post.objects.filter(is_published=True).order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)

class PostDetailAPI(APIView):
    permission_classes = [ReadOnlyOrAuthor]

    def get_object(self, pk):
        return Post.objects.get(pk=pk, is_published=True)

    def get(self, request, pk):
        post = self.get_object(pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        post = Post.objects.get(pk=pk)
        self.check_object_permissions(request, post)

        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        post = Post.objects.get(pk=pk)
        self.check_object_permissions(request, post)
        post.delete()
        return Response(status=204)


class RegisterAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=201
            )
        return Response(serializer.errors, status=400)

class LoginAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({"message": "Login successful"})
        return Response(serializer.errors, status=400)


class LogoutAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"})
