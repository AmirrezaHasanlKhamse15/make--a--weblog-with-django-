from rest_framework.permissions import BasePermission, SAFE_METHODS

class ReadOnlyOrAuthor(BasePermission):
    """
    Read-only access for everyone.
    Write access only for authenticated users with author or admin role.
    """

    def has_permission(self, request, view):
        # Allow read-only requests for everyone
        if request.method in SAFE_METHODS:
            return True

        # Allow write only for authenticated author/admin
        return (
            request.user and
            request.user.is_authenticated and
            request.user.role in ['author', 'admin']
        )

    def has_object_permission(self, request, view, obj):
        # Read-only permissions are allowed to any request
        if request.method in SAFE_METHODS:
            return True

        # Write permission only for post owner or admin
        return (
            obj.author == request.user or
            request.user.role == 'admin'
        )
