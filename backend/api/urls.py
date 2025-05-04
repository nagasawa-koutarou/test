from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MemoViewSet, signup, user_info  

router = DefaultRouter()
router.register(r'memos', MemoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup),  
    path('user/', user_info),  
    path('api/', include('api.urls')),
]