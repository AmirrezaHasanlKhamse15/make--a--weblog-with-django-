from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('phone_number', 'full_name', 'role', 'is_staff', 'profile_picture')
    ordering = ('phone_number',)  # <- به جای 'username'
    
    fieldsets = (
        (None, {'fields': ('phone_number', 'password', 'profile_picture')}),
        ('Personal info', {'fields': ('full_name', 'email', 'birth_date', 'address')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2', 'profile_picture', 'role')}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)
