from django.db import models
from django.conf import settings
from django.utils import timezone

CATEGORY_CHOICES = (
    ('economy', 'اقتصادی'),
    ('politics', 'سیاسی'),
    ('world', 'جهانی'),
    ('other', 'سایر'),
)

class Category(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.title

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts'
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='posts'
    )

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    publish_date = models.DateTimeField(default=timezone.now)

    # فیلد تصویر
    image = models.ImageField(upload_to='posts/images/', blank=True, null=True)
    
    # فیلد ویدیو
    video = models.FileField(upload_to='posts/videos/', blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
