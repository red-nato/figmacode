# quiz_game/serializers.py
# Serializers para la API REST de Django

from rest_framework import serializers
from .models import (
    GameSession, PhaseResult, TokenConfiguration, 
    PhaseConfiguration, Question
)


class PhaseResultSerializer(serializers.ModelSerializer):
    """Serializer para resultados de fases"""
    phase_name = serializers.CharField(source='get_phase_number_display', read_only=True)
    
    class Meta:
        model = PhaseResult
        fields = [
            'id', 'session', 'phase_number', 'phase_name',
            'tokens_earned', 'time_spent', 'answers_data', 
            'completed_at'
        ]
        read_only_fields = ['id', 'completed_at']


class GameSessionSerializer(serializers.ModelSerializer):
    """Serializer para sesiones de juego"""
    phases = PhaseResultSerializer(many=True, read_only=True)
    duration = serializers.SerializerMethodField()
    
    class Meta:
        model = GameSession
        fields = [
            'id', 'team_name', 'total_tokens', 'current_phase',
            'created_at', 'updated_at', 'completed', 'completed_at',
            'phases', 'duration'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_duration(self, obj):
        """Calcular duración de la sesión en segundos"""
        if obj.completed_at and obj.created_at:
            delta = obj.completed_at - obj.created_at
            return delta.total_seconds()
        elif obj.updated_at and obj.created_at:
            delta = obj.updated_at - obj.created_at
            return delta.total_seconds()
        return None


class GameSessionListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listado de sesiones"""
    phases_completed = serializers.SerializerMethodField()
    
    class Meta:
        model = GameSession
        fields = [
            'id', 'team_name', 'total_tokens', 'current_phase',
            'phases_completed', 'completed', 'created_at'
        ]
    
    def get_phases_completed(self, obj):
        return obj.phases.count()


class TokenConfigurationSerializer(serializers.ModelSerializer):
    """Serializer para configuración de tokens"""
    phase_name = serializers.CharField(source='get_phase_number_display', read_only=True)
    
    class Meta:
        model = TokenConfiguration
        fields = [
            'id', 'phase_number', 'phase_name', 'min_tokens', 
            'max_tokens', 'config_data', 'is_active', 'updated_at'
        ]
        read_only_fields = ['id', 'updated_at']
    
    def validate(self, data):
        """Validar que min_tokens <= max_tokens"""
        if data.get('min_tokens', 0) > data.get('max_tokens', 0):
            raise serializers.ValidationError(
                "Los tokens mínimos no pueden ser mayores que los tokens máximos"
            )
        return data


class PhaseConfigurationSerializer(serializers.ModelSerializer):
    """Serializer para configuración de fases"""
    phase_name = serializers.CharField(source='get_phase_number_display', read_only=True)
    
    class Meta:
        model = PhaseConfiguration
        fields = [
            'id', 'phase_number', 'phase_name', 'name', 
            'description', 'time_limit', 'is_enabled', 'config_data'
        ]
        read_only_fields = ['id']


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer para preguntas"""
    question_type_display = serializers.CharField(
        source='get_question_type_display', 
        read_only=True
    )
    
    class Meta:
        model = Question
        fields = [
            'id', 'phase_number', 'question_type', 'question_type_display',
            'question_text', 'answer_data', 'difficulty', 
            'tokens_value', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class AnalyticsSerializer(serializers.Serializer):
    """Serializer para datos de analíticas del dashboard"""
    total_sessions = serializers.IntegerField()
    completed_sessions = serializers.IntegerField()
    total_teams = serializers.IntegerField()
    average_tokens = serializers.FloatField()
    average_completion_time = serializers.FloatField(allow_null=True)
    phase_completion_rates = serializers.DictField()
    top_teams = serializers.ListField()
    sessions_by_date = serializers.DictField()
