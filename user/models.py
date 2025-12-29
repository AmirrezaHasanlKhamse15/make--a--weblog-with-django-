from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
    Group,
    Permission,
)

# =========================
# Roles
# =========================
USER_ROLES = (
    ('admin', 'مدیر'),
    ('author', 'نویسنده'),
    ('reader', 'کاربر عادی'),
)


# =========================
# Custom User Manager
# =========================
class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number is required")

        user = self.model(
            phone_number=phone_number,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        # اتصال role به Group
        role = user.role
        if role:
            group, _ = Group.objects.get_or_create(name=role)
            user.groups.add(group)

        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        return self.create_user(phone_number, password, **extra_fields)


# =========================
# Custom User Model
# =========================
class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(max_length=15, unique=True)
    full_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True, null=True)

    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True)

    role = models.CharField(
        max_length=20,
        choices=USER_ROLES,
        default='reader'
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # ⚠️ override برای جلوگیری از clash با User پیش‌فرض
    groups = models.ManyToManyField(
        Group,
        related_name='custom_users',
        blank=True,
        verbose_name='groups'
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        verbose_name='user permissions'
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.phone_number} - {self.get_role_display()}"
