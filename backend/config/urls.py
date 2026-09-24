from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_api(request):
    return JsonResponse({
        "status": "online",
        "message": "MU CSE Society Backend API is running successfully!",
        "endpoints": {
            "admin": "/admin/",
            "home": "/api/home/"
        }
    })

urlpatterns = [
    path('', root_api),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]