from django.urls import path
from .views import (
    PostListAPI,
    PostDetailAPI,
    RegisterAPI,
    LoginAPI,
    LogoutAPI
)

urlpatterns = [
    path('posts/', PostListAPI.as_view()),
    path('posts/<int:pk>/', PostDetailAPI.as_view()),

    path('auth/register/', RegisterAPI.as_view()),
    path('auth/login/', LoginAPI.as_view()),
    path('auth/logout/', LogoutAPI.as_view()),
]
