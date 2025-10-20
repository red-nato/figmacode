# quiz_game/urls.py
# Configuración de URLs para la aplicación

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuizGameView,
    GameSessionViewSet,
    PhaseResultViewSet,
    TokenConfigurationViewSet,
    PhaseConfigurationViewSet,
    QuestionViewSet
)

# Router para API REST
router = DefaultRouter()
router.register(r'sessions', GameSessionViewSet, basename='session')
router.register(r'phases', PhaseResultViewSet, basename='phase')
router.register(r'token-configs', TokenConfigurationViewSet, basename='token-config')
router.register(r'phase-configs', PhaseConfigurationViewSet, basename='phase-config')
router.register(r'questions', QuestionViewSet, basename='question')

app_name = 'quiz_game'

urlpatterns = [
    # Vista principal de React
    path('', QuizGameView.as_view(), name='home'),
    
    # API endpoints
    path('api/', include(router.urls)),
]
