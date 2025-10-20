# quiz_game/admin.py
# Configuración del panel de administración de Django

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    GameSession, PhaseResult, TokenConfiguration,
    PhaseConfiguration, AdminUser, Question
)


@admin.register(GameSession)
class GameSessionAdmin(admin.ModelAdmin):
    list_display = [
        'team_name', 'current_phase', 'total_tokens', 
        'completed_badge', 'created_at'
    ]
    list_filter = ['completed', 'current_phase', 'created_at']
    search_fields = ['team_name']
    readonly_fields = ['created_at', 'updated_at', 'completed_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Información del Equipo', {
            'fields': ('team_name', 'total_tokens')
        }),
        ('Progreso del Juego', {
            'fields': ('current_phase', 'completed', 'completed_at')
        }),
        ('Metadatos', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def completed_badge(self, obj):
        if obj.completed:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Completado</span>'
            )
        return format_html(
            '<span style="color: orange;">En progreso</span>'
        )
    completed_badge.short_description = 'Estado'
    
    actions = ['mark_as_completed', 'recalculate_tokens']
    
    def mark_as_completed(self, request, queryset):
        from django.utils import timezone
        updated = queryset.update(completed=True, completed_at=timezone.now())
        self.message_user(request, f'{updated} sesiones marcadas como completadas.')
    mark_as_completed.short_description = 'Marcar como completado'
    
    def recalculate_tokens(self, request, queryset):
        for session in queryset:
            session.calculate_total_tokens()
        self.message_user(request, f'{queryset.count()} sesiones actualizadas.')
    recalculate_tokens.short_description = 'Recalcular tokens'


class PhaseResultInline(admin.TabularInline):
    model = PhaseResult
    extra = 0
    readonly_fields = ['completed_at']
    fields = ['phase_number', 'tokens_earned', 'time_spent', 'completed_at']


@admin.register(PhaseResult)
class PhaseResultAdmin(admin.ModelAdmin):
    list_display = [
        'session', 'phase_number', 'tokens_earned', 
        'time_spent', 'completed_at'
    ]
    list_filter = ['phase_number', 'completed_at']
    search_fields = ['session__team_name']
    readonly_fields = ['completed_at']
    date_hierarchy = 'completed_at'
    
    fieldsets = (
        ('Información', {
            'fields': ('session', 'phase_number')
        }),
        ('Resultados', {
            'fields': ('tokens_earned', 'time_spent', 'answers_data')
        }),
        ('Metadatos', {
            'fields': ('completed_at',)
        }),
    )


@admin.register(TokenConfiguration)
class TokenConfigurationAdmin(admin.ModelAdmin):
    list_display = [
        'phase_number', 'min_tokens', 'max_tokens', 
        'is_active', 'updated_at'
    ]
    list_filter = ['is_active', 'phase_number']
    readonly_fields = ['updated_at']
    
    fieldsets = (
        ('Fase', {
            'fields': ('phase_number',)
        }),
        ('Configuración de Tokens', {
            'fields': ('min_tokens', 'max_tokens', 'is_active')
        }),
        ('Configuración Adicional', {
            'fields': ('config_data',),
            'classes': ('collapse',)
        }),
        ('Metadatos', {
            'fields': ('updated_at',),
            'classes': ('collapse',)
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editando
            return self.readonly_fields + ['phase_number']
        return self.readonly_fields


@admin.register(PhaseConfiguration)
class PhaseConfigurationAdmin(admin.ModelAdmin):
    list_display = [
        'phase_number', 'name', 'time_limit', 'is_enabled'
    ]
    list_filter = ['is_enabled', 'phase_number']
    search_fields = ['name', 'description']
    
    fieldsets = (
        ('Fase', {
            'fields': ('phase_number', 'name')
        }),
        ('Configuración', {
            'fields': ('description', 'time_limit', 'is_enabled')
        }),
        ('Configuración Adicional', {
            'fields': ('config_data',),
            'classes': ('collapse',)
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editando
            return ['phase_number']
        return []


@admin.register(AdminUser)
class AdminUserAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'can_modify_tokens', 'can_modify_phases',
        'can_view_analytics', 'can_manage_sessions'
    ]
    list_filter = [
        'can_modify_tokens', 'can_modify_phases',
        'can_view_analytics', 'can_manage_sessions'
    ]
    search_fields = ['user__username', 'user__email']
    
    fieldsets = (
        ('Usuario', {
            'fields': ('user',)
        }),
        ('Permisos', {
            'fields': (
                'can_modify_tokens', 'can_modify_phases',
                'can_view_analytics', 'can_manage_sessions'
            )
        }),
    )


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'phase_number', 'question_type', 
        'difficulty', 'tokens_value', 'is_active'
    ]
    list_filter = ['phase_number', 'question_type', 'difficulty', 'is_active']
    search_fields = ['question_text']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Pregunta', {
            'fields': ('phase_number', 'question_type', 'question_text')
        }),
        ('Respuesta', {
            'fields': ('answer_data',)
        }),
        ('Configuración', {
            'fields': ('difficulty', 'tokens_value', 'is_active')
        }),
    )
    
    actions = ['activate_questions', 'deactivate_questions']
    
    def activate_questions(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} preguntas activadas.')
    activate_questions.short_description = 'Activar preguntas seleccionadas'
    
    def deactivate_questions(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} preguntas desactivadas.')
    deactivate_questions.short_description = 'Desactivar preguntas seleccionadas'
