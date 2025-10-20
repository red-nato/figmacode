# quiz_game/views.py
# Views y ViewSets para Django

from django.shortcuts import render
from django.views.generic import TemplateView
from django.db.models import Count, Avg, Sum, Q
from django.utils import timezone
from datetime import timedelta
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import (
    GameSession, PhaseResult, TokenConfiguration,
    PhaseConfiguration, Question
)
from .serializers import (
    GameSessionSerializer, GameSessionListSerializer,
    PhaseResultSerializer, TokenConfigurationSerializer,
    PhaseConfigurationSerializer, QuestionSerializer,
    AnalyticsSerializer
)


class QuizGameView(TemplateView):
    """Vista principal para servir la aplicación React"""
    template_name = 'quiz_game/index.html'


class GameSessionViewSet(viewsets.ModelViewSet):
    """ViewSet para gestionar sesiones de juego"""
    queryset = GameSession.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return GameSessionListSerializer
        return GameSessionSerializer
    
    def get_queryset(self):
        queryset = GameSession.objects.all()
        
        # Filtrar por estado de completado
        completed = self.request.query_params.get('completed', None)
        if completed is not None:
            queryset = queryset.filter(completed=completed.lower() == 'true')
        
        # Filtrar por fase actual
        phase = self.request.query_params.get('phase', None)
        if phase is not None:
            queryset = queryset.filter(current_phase=phase)
        
        # Filtrar por rango de fechas
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        if date_from:
            queryset = queryset.filter(created_at__gte=date_from)
        if date_to:
            queryset = queryset.filter(created_at__lte=date_to)
        
        return queryset.prefetch_related('phases')
    
    @action(detail=True, methods=['post'])
    def complete_phase(self, request, pk=None):
        """Marcar una fase como completada y registrar tokens"""
        session = self.get_object()
        phase_number = request.data.get('phase_number')
        tokens_earned = request.data.get('tokens_earned', 0)
        time_spent = request.data.get('time_spent')
        answers_data = request.data.get('answers_data', {})
        
        if not phase_number:
            return Response(
                {'error': 'phase_number es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Crear o actualizar resultado de fase
        phase_result, created = PhaseResult.objects.update_or_create(
            session=session,
            phase_number=phase_number,
            defaults={
                'tokens_earned': tokens_earned,
                'time_spent': time_spent,
                'answers_data': answers_data
            }
        )
        
        # Actualizar sesión
        session.total_tokens = sum(
            phase.tokens_earned for phase in session.phases.all()
        )
        if phase_number >= session.current_phase:
            session.current_phase = phase_number + 1
        session.save()
        
        return Response({
            'session': self.get_serializer(session).data,
            'phase_result': PhaseResultSerializer(phase_result).data,
            'created': created
        })
    
    @action(detail=True, methods=['post'])
    def complete_game(self, request, pk=None):
        """Marcar el juego como completado"""
        session = self.get_object()
        session.completed = True
        session.completed_at = timezone.now()
        session.save()
        
        return Response(self.get_serializer(session).data)
    
    @action(detail=False, methods=['get'])
    def analytics(self, request):
        """Obtener analíticas generales del juego"""
        sessions = GameSession.objects.all()
        
        # Estadísticas básicas
        total_sessions = sessions.count()
        completed_sessions = sessions.filter(completed=True).count()
        
        # Tokens promedio
        avg_tokens = sessions.aggregate(Avg('total_tokens'))['total_tokens__avg'] or 0
        
        # Tiempo promedio de completado
        completed = sessions.filter(completed=True, completed_at__isnull=False)
        avg_time = None
        if completed.exists():
            times = []
            for session in completed:
                delta = session.completed_at - session.created_at
                times.append(delta.total_seconds())
            avg_time = sum(times) / len(times) if times else None
        
        # Tasas de completado por fase
        phase_completion_rates = {}
        for i in range(1, 6):
            phase_completions = PhaseResult.objects.filter(phase_number=i).count()
            phase_completion_rates[f'phase_{i}'] = phase_completions
        
        # Top equipos
        top_teams = list(
            sessions.filter(completed=True)
            .order_by('-total_tokens')[:10]
            .values('team_name', 'total_tokens', 'created_at')
        )
        
        # Sesiones por fecha (últimos 30 días)
        thirty_days_ago = timezone.now() - timedelta(days=30)
        sessions_by_date = {}
        date_counts = (
            sessions.filter(created_at__gte=thirty_days_ago)
            .extra(select={'date': 'date(created_at)'})
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        for item in date_counts:
            sessions_by_date[str(item['date'])] = item['count']
        
        data = {
            'total_sessions': total_sessions,
            'completed_sessions': completed_sessions,
            'total_teams': total_sessions,  # Uno por sesión
            'average_tokens': avg_tokens,
            'average_completion_time': avg_time,
            'phase_completion_rates': phase_completion_rates,
            'top_teams': top_teams,
            'sessions_by_date': sessions_by_date
        }
        
        serializer = AnalyticsSerializer(data)
        return Response(serializer.data)


class PhaseResultViewSet(viewsets.ModelViewSet):
    """ViewSet para resultados de fases"""
    queryset = PhaseResult.objects.all()
    serializer_class = PhaseResultSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = PhaseResult.objects.all()
        
        # Filtrar por sesión
        session_id = self.request.query_params.get('session', None)
        if session_id:
            queryset = queryset.filter(session_id=session_id)
        
        # Filtrar por fase
        phase = self.request.query_params.get('phase', None)
        if phase:
            queryset = queryset.filter(phase_number=phase)
        
        return queryset.select_related('session')


class TokenConfigurationViewSet(viewsets.ModelViewSet):
    """ViewSet para configuración de tokens"""
    queryset = TokenConfiguration.objects.all()
    serializer_class = TokenConfigurationSerializer
    permission_classes = [IsAuthenticated]  # Solo admins
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Obtener solo configuraciones activas"""
        active_configs = self.queryset.filter(is_active=True)
        serializer = self.get_serializer(active_configs, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def bulk_update(self, request):
        """Actualizar múltiples configuraciones a la vez"""
        configs = request.data.get('configs', [])
        updated = []
        
        for config_data in configs:
            phase_number = config_data.get('phase_number')
            if phase_number:
                config, created = TokenConfiguration.objects.update_or_create(
                    phase_number=phase_number,
                    defaults={
                        'min_tokens': config_data.get('min_tokens', 0),
                        'max_tokens': config_data.get('max_tokens', 100),
                        'config_data': config_data.get('config_data', {}),
                        'is_active': config_data.get('is_active', True)
                    }
                )
                updated.append(config)
        
        serializer = self.get_serializer(updated, many=True)
        return Response(serializer.data)


class PhaseConfigurationViewSet(viewsets.ModelViewSet):
    """ViewSet para configuración de fases"""
    queryset = PhaseConfiguration.objects.all()
    serializer_class = PhaseConfigurationSerializer
    permission_classes = [IsAuthenticated]  # Solo admins
    
    @action(detail=False, methods=['get'])
    def enabled(self, request):
        """Obtener solo fases habilitadas"""
        enabled_phases = self.queryset.filter(is_enabled=True)
        serializer = self.get_serializer(enabled_phases, many=True)
        return Response(serializer.data)


class QuestionViewSet(viewsets.ModelViewSet):
    """ViewSet para preguntas"""
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]  # Solo admins pueden modificar
    
    def get_queryset(self):
        queryset = Question.objects.all()
        
        # Filtrar por fase
        phase = self.request.query_params.get('phase', None)
        if phase:
            queryset = queryset.filter(phase_number=phase)
        
        # Filtrar por tipo
        question_type = self.request.query_params.get('type', None)
        if question_type:
            queryset = queryset.filter(question_type=question_type)
        
        # Filtrar por activas
        active_only = self.request.query_params.get('active_only', None)
        if active_only and active_only.lower() == 'true':
            queryset = queryset.filter(is_active=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def random(self, request):
        """Obtener preguntas aleatorias para una fase"""
        phase = request.query_params.get('phase')
        count = int(request.query_params.get('count', 5))
        question_type = request.query_params.get('type')
        
        queryset = Question.objects.filter(is_active=True)
        if phase:
            queryset = queryset.filter(phase_number=phase)
        if question_type:
            queryset = queryset.filter(question_type=question_type)
        
        questions = queryset.order_by('?')[:count]
        serializer = self.get_serializer(questions, many=True)
        return Response(serializer.data)
