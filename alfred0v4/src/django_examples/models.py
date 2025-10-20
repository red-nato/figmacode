# quiz_game/models.py
# Ejemplo de modelos Django para integrar con la aplicación React

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class GameSession(models.Model):
    """Sesión de juego para un equipo"""
    team_name = models.CharField(max_length=100, verbose_name="Nombre del Equipo")
    total_tokens = models.IntegerField(default=0, verbose_name="Tokens Totales")
    current_phase = models.IntegerField(
        default=1, 
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Fase Actual"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creado")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Actualizado")
    completed = models.BooleanField(default=False, verbose_name="Completado")
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name="Completado en")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Sesión de Juego"
        verbose_name_plural = "Sesiones de Juego"

    def __str__(self):
        return f"{self.team_name} - {self.total_tokens} tokens (Fase {self.current_phase})"

    def calculate_total_tokens(self):
        """Recalcular total de tokens desde las fases completadas"""
        self.total_tokens = sum(
            phase.tokens_earned for phase in self.phases.all()
        )
        self.save()
        return self.total_tokens


class PhaseResult(models.Model):
    """Resultado de una fase específica"""
    session = models.ForeignKey(
        GameSession, 
        on_delete=models.CASCADE, 
        related_name='phases',
        verbose_name="Sesión"
    )
    phase_number = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Número de Fase"
    )
    tokens_earned = models.IntegerField(default=0, verbose_name="Tokens Ganados")
    time_spent = models.IntegerField(
        null=True, 
        blank=True, 
        help_text="Tiempo en segundos",
        verbose_name="Tiempo Empleado (seg)"
    )
    answers_data = models.JSONField(
        default=dict, 
        blank=True,
        help_text="Datos de respuestas y desafíos completados",
        verbose_name="Datos de Respuestas"
    )
    completed_at = models.DateTimeField(auto_now_add=True, verbose_name="Completado en")
    
    class Meta:
        ordering = ['session', 'phase_number']
        unique_together = ['session', 'phase_number']
        verbose_name = "Resultado de Fase"
        verbose_name_plural = "Resultados de Fases"

    def __str__(self):
        return f"{self.session.team_name} - Fase {self.phase_number} ({self.tokens_earned} tokens)"


class TokenConfiguration(models.Model):
    """Configuración de tokens para cada fase"""
    PHASE_CHOICES = [
        (1, 'Fase 1 - Anagramas y Sopas de Letras'),
        (2, 'Fase 2 - Historias de Desafíos'),
        (3, 'Fase 3'),
        (4, 'Fase 4'),
        (5, 'Fase 5'),
    ]
    
    phase_number = models.IntegerField(
        unique=True,
        choices=PHASE_CHOICES,
        verbose_name="Número de Fase"
    )
    min_tokens = models.IntegerField(
        default=0,
        help_text="Tokens mínimos que se pueden ganar",
        verbose_name="Tokens Mínimos"
    )
    max_tokens = models.IntegerField(
        default=100,
        help_text="Tokens máximos que se pueden ganar",
        verbose_name="Tokens Máximos"
    )
    config_data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Configuración adicional específica de la fase (formato JSON)",
        verbose_name="Configuración Adicional"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Activo"
    )
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Actualizado")
    
    class Meta:
        ordering = ['phase_number']
        verbose_name = "Configuración de Tokens"
        verbose_name_plural = "Configuraciones de Tokens"

    def __str__(self):
        return f"Fase {self.phase_number}: {self.min_tokens}-{self.max_tokens} tokens"


class PhaseConfiguration(models.Model):
    """Configuración general de cada fase del juego"""
    PHASE_CHOICES = [
        (1, 'Fase 1 - Anagramas y Sopas de Letras'),
        (2, 'Fase 2 - Historias de Desafíos'),
        (3, 'Fase 3'),
        (4, 'Fase 4'),
        (5, 'Fase 5'),
    ]
    
    phase_number = models.IntegerField(
        unique=True,
        choices=PHASE_CHOICES,
        verbose_name="Número de Fase"
    )
    name = models.CharField(max_length=200, verbose_name="Nombre")
    description = models.TextField(blank=True, verbose_name="Descripción")
    time_limit = models.IntegerField(
        null=True,
        blank=True,
        help_text="Límite de tiempo en segundos (null = sin límite)",
        verbose_name="Límite de Tiempo (seg)"
    )
    is_enabled = models.BooleanField(default=True, verbose_name="Habilitado")
    config_data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Configuración específica de la fase",
        verbose_name="Configuración"
    )
    
    class Meta:
        ordering = ['phase_number']
        verbose_name = "Configuración de Fase"
        verbose_name_plural = "Configuraciones de Fases"

    def __str__(self):
        return f"Fase {self.phase_number}: {self.name}"


class AdminUser(models.Model):
    """Usuario administrador del panel"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Usuario")
    can_modify_tokens = models.BooleanField(default=True, verbose_name="Puede Modificar Tokens")
    can_modify_phases = models.BooleanField(default=True, verbose_name="Puede Modificar Fases")
    can_view_analytics = models.BooleanField(default=True, verbose_name="Puede Ver Analíticas")
    can_manage_sessions = models.BooleanField(default=True, verbose_name="Puede Gestionar Sesiones")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creado")
    
    class Meta:
        verbose_name = "Usuario Administrador"
        verbose_name_plural = "Usuarios Administradores"

    def __str__(self):
        return f"Admin: {self.user.username}"


class Question(models.Model):
    """Banco de preguntas para las diferentes fases"""
    QUESTION_TYPE_CHOICES = [
        ('anagram', 'Anagrama'),
        ('word_search', 'Sopa de Letras'),
        ('multiple_choice', 'Opción Múltiple'),
        ('true_false', 'Verdadero/Falso'),
    ]
    
    phase_number = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Fase"
    )
    question_type = models.CharField(
        max_length=20,
        choices=QUESTION_TYPE_CHOICES,
        verbose_name="Tipo de Pregunta"
    )
    question_text = models.TextField(verbose_name="Texto de Pregunta")
    answer_data = models.JSONField(
        help_text="Respuestas y configuración en formato JSON",
        verbose_name="Datos de Respuesta"
    )
    difficulty = models.IntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Dificultad"
    )
    tokens_value = models.IntegerField(default=10, verbose_name="Valor en Tokens")
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creado")
    
    class Meta:
        ordering = ['phase_number', 'difficulty']
        verbose_name = "Pregunta"
        verbose_name_plural = "Preguntas"

    def __str__(self):
        return f"Fase {self.phase_number} - {self.get_question_type_display()}: {self.question_text[:50]}"
