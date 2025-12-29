from rest_framework.permissions import BasePermission, SAFE_METHODS



class IsAuthenticatedUser(BasePermission):
    """
    Allow access only to authenticated users
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)
class IsAdmin(BasePermission):
    """
    Allow access only to admin users
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == 'admin'
        )



class IsAuthorOrAdmin(BasePermission):
    """
    Allow access to authors and admins
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ['author', 'admin']
        )



from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReadOnlyOrAuthorAdmin(BasePermission):
    """
    Read for everyone
    Write only for author of the post or admin
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return (
            request.user.is_authenticated and
            request.user.role in ['author', 'admin']
        )

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        # admin همه‌چیز را می‌تواند
        if request.user.role == 'admin':
            return True

        # فقط نویسنده‌ی پست
        return obj.author == request.user
    






