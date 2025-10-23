from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameSessionViewSet, TokenConfigViewSet

router = DefaultRouter()
router.register(r'sessions', GameSessionViewSet, basename='session')
router.register(r'token-configs', TokenConfigViewSet, basename='token-config')

urlpatterns = [
	path('', include(router.urls)),
]


