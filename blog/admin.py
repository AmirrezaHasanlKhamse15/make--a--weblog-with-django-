from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Post, Category
# blog/admin.py
from django.contrib import admin
from .models import Post, Category
from user.models import CustomUser  # مطمئن شو مسیر درست باشد

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'is_published', 'created_at')
    list_filter = ('category', 'is_published', 'author')
    search_fields = ('title', 'content', 'author__full_name')
    ordering = ('-created_at',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug')
    prepopulated_fields = {"slug": ("title",)}
