# Integración con Django

Esta guía te ayudará a integrar esta aplicación React en tu proyecto Django.

## Opción 1: Servir la Aplicación React como Archivos Estáticos (Recomendado)

Esta es la forma más sencilla y recomendada para producción.

### Paso 1: Construir la Aplicación React

1. Instala las dependencias de Node.js:
```bash
npm install
```

2. Construye la aplicación para producción:
```bash
npm run build
```

Esto generará una carpeta `dist/` con todos los archivos estáticos compilados.

### Paso 2: Configurar Django

#### 2.1 Crear una aplicación Django (si no existe)

```bash
python manage.py startapp quiz_game
```

#### 2.2 Configurar settings.py

Agrega la configuración de archivos estáticos en `settings.py`:

```python
# settings.py

INSTALLED_APPS = [
    # ... otras apps
    'quiz_game',
]

# Configuración de archivos estáticos
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'quiz_game' / 'static',
]

# Para servir archivos en desarrollo
if DEBUG:
    STATICFILES_DIRS += [
        BASE_DIR / 'dist',  # Si mantienes la carpeta dist en la raíz del proyecto
    ]
```

#### 2.3 Copiar archivos construidos

Opción A - Manual:
```bash
# Copia los archivos de dist/ a tu carpeta static de Django
cp -r dist/* quiz_game/static/quiz_game/
```

Opción B - Script automático:

Crea `build_and_copy.sh`:
```bash
#!/bin/bash
npm run build
rm -rf quiz_game/static/quiz_game/*
cp -r dist/* quiz_game/static/quiz_game/
python manage.py collectstatic --noinput
```

#### 2.4 Crear vista Django

Crea `quiz_game/views.py`:

```python
from django.shortcuts import render
from django.views.generic import TemplateView

class QuizGameView(TemplateView):
    template_name = 'quiz_game/index.html'
```

#### 2.5 Crear template

Crea `quiz_game/templates/quiz_game/index.html`:

```html
{% load static %}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Game - Token System</title>
    
    {# CSS generado por Vite #}
    <link rel="stylesheet" href="{% static 'quiz_game/assets/index.css' %}">
</head>
<body>
    <div id="root"></div>
    
    {# JavaScript generado por Vite #}
    {# Nota: Los nombres de archivo incluyen un hash que cambia con cada build #}
    {# Puedes usar django-vite o leer el manifest.json para obtener los nombres correctos #}
    <script type="module" src="{% static 'quiz_game/assets/index.js' %}"></script>
</body>
</html>
```

#### 2.6 Configurar URLs

Crea/edita `quiz_game/urls.py`:

```python
from django.urls import path
from .views import QuizGameView

app_name = 'quiz_game'

urlpatterns = [
    path('', QuizGameView.as_view(), name='home'),
]
```

Edita `tu_proyecto/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('quiz/', include('quiz_game.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

---

## Opción 2: Usar django-vite (Avanzado)

Esta opción permite desarrollo en caliente (hot reload) durante el desarrollo.

### Paso 1: Instalar django-vite

```bash
pip install django-vite
```

### Paso 2: Configurar settings.py

```python
INSTALLED_APPS = [
    # ... otras apps
    'django_vite',
    'quiz_game',
]

DJANGO_VITE = {
    'default': {
        'dev_mode': DEBUG,
        'dev_server_host': 'localhost',
        'dev_server_port': 5173,
        'manifest_path': BASE_DIR / 'dist' / 'manifest.json',
        'static_url_prefix': 'quiz_game',
    }
}
```

### Paso 3: Actualizar template

```html
{% load django_vite %}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Game - Token System</title>
    {% vite_asset 'main.tsx' %}
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

### Paso 4: Desarrollo

En desarrollo, ejecuta ambos servidores:

Terminal 1 - Vite dev server:
```bash
npm run dev
```

Terminal 2 - Django dev server:
```bash
python manage.py runserver
```

Para producción, construye con `npm run build` y django-vite servirá automáticamente los archivos del build.

---

## Opción 3: API Backend con Django REST Framework

Si necesitas que Django maneje datos (usuarios, sesiones, tokens, etc.):

### Paso 1: Instalar Django REST Framework

```bash
pip install djangorestframework django-cors-headers
```

### Paso 2: Configurar settings.py

```python
INSTALLED_APPS = [
    # ... otras apps
    'rest_framework',
    'corsheaders',
    'quiz_game',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... otros middleware
]

# Configuración de CORS (solo para desarrollo)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Para producción, configura CORS apropiadamente
if not DEBUG:
    CORS_ALLOWED_ORIGINS = [
        "https://tu-dominio.com",
    ]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ]
}
```

### Paso 3: Crear modelos Django

`quiz_game/models.py`:

```python
from django.db import models
from django.contrib.auth.models import User

class GameSession(models.Model):
    team_name = models.CharField(max_length=100)
    total_tokens = models.IntegerField(default=0)
    current_phase = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.team_name} - {self.total_tokens} tokens"


class PhaseResult(models.Model):
    session = models.ForeignKey(GameSession, on_delete=models.CASCADE, related_name='phases')
    phase_number = models.IntegerField()
    tokens_earned = models.IntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['phase_number']
        unique_together = ['session', 'phase_number']

    def __str__(self):
        return f"{self.session.team_name} - Fase {self.phase_number}"


class TokenConfiguration(models.Model):
    phase_number = models.IntegerField(unique=True)
    min_tokens = models.IntegerField()
    max_tokens = models.IntegerField()
    config_data = models.JSONField(default=dict)
    
    def __str__(self):
        return f"Configuración Fase {self.phase_number}"
```

### Paso 4: Crear serializers

`quiz_game/serializers.py`:

```python
from rest_framework import serializers
from .models import GameSession, PhaseResult, TokenConfiguration

class PhaseResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhaseResult
        fields = ['id', 'phase_number', 'tokens_earned', 'completed_at']

class GameSessionSerializer(serializers.ModelSerializer):
    phases = PhaseResultSerializer(many=True, read_only=True)
    
    class Meta:
        model = GameSession
        fields = ['id', 'team_name', 'total_tokens', 'current_phase', 
                  'created_at', 'updated_at', 'completed', 'phases']

class TokenConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenConfiguration
        fields = '__all__'
```

### Paso 5: Crear viewsets y APIs

`quiz_game/views.py`:

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import GameSession, PhaseResult, TokenConfiguration
from .serializers import (
    GameSessionSerializer, 
    PhaseResultSerializer, 
    TokenConfigurationSerializer
)

class GameSessionViewSet(viewsets.ModelViewSet):
    queryset = GameSession.objects.all()
    serializer_class = GameSessionSerializer
    
    @action(detail=True, methods=['post'])
    def complete_phase(self, request, pk=None):
        session = self.get_object()
        phase_number = request.data.get('phase_number')
        tokens_earned = request.data.get('tokens_earned')
        
        PhaseResult.objects.create(
            session=session,
            phase_number=phase_number,
            tokens_earned=tokens_earned
        )
        
        session.total_tokens += tokens_earned
        session.current_phase = phase_number + 1
        session.save()
        
        return Response(self.get_serializer(session).data)
    
    @action(detail=True, methods=['post'])
    def complete_game(self, request, pk=None):
        session = self.get_object()
        session.completed = True
        session.save()
        return Response(self.get_serializer(session).data)

class TokenConfigurationViewSet(viewsets.ModelViewSet):
    queryset = TokenConfiguration.objects.all()
    serializer_class = TokenConfigurationSerializer
```

### Paso 6: Configurar URLs API

`quiz_game/urls.py`:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameSessionViewSet, TokenConfigurationViewSet, QuizGameView

router = DefaultRouter()
router.register(r'sessions', GameSessionViewSet)
router.register(r'token-configs', TokenConfigurationViewSet)

app_name = 'quiz_game'

urlpatterns = [
    path('', QuizGameView.as_view(), name='home'),
    path('api/', include(router.urls)),
]
```

### Paso 7: Actualizar React para usar la API

Crea un archivo `utils/api.ts`:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/quiz/api' 
  : 'http://localhost:8000/quiz/api';

export const api = {
  async createSession(teamName: string) {
    const response = await fetch(`${API_BASE_URL}/sessions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ team_name: teamName, current_phase: 1 }),
    });
    return response.json();
  },

  async completePhase(sessionId: number, phaseNumber: number, tokensEarned: number) {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/complete_phase/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phase_number: phaseNumber, tokens_earned: tokensEarned }),
    });
    return response.json();
  },

  async completeGame(sessionId: number) {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/complete_game/`, {
      method: 'POST',
    });
    return response.json();
  },

  async getTokenConfigs() {
    const response = await fetch(`${API_BASE_URL}/token-configs/`);
    return response.json();
  },
};
```

---

## Estructura de Archivos Recomendada

```
mi_proyecto_django/
├── manage.py
├── mi_proyecto/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── quiz_game/              # App Django
│   ├── migrations/
│   ├── static/
│   │   └── quiz_game/      # Archivos del build de React
│   ├── templates/
│   │   └── quiz_game/
│   │       └── index.html
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
├── frontend/               # Código fuente React (este proyecto)
│   ├── components/
│   ├── contexts/
│   ├── utils/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── dist/              # Build generado (gitignore esto)
├── requirements.txt
└── package.json           # Opcional: para manejar todo desde la raíz
```

---

## Comandos Útiles

### Desarrollo

```bash
# Terminal 1: React dev server
cd frontend
npm run dev

# Terminal 2: Django dev server
python manage.py runserver
```

### Producción

```bash
# 1. Construir React
cd frontend
npm run build

# 2. Copiar archivos
cp -r dist/* ../quiz_game/static/quiz_game/

# 3. Recolectar archivos estáticos de Django
cd ..
python manage.py collectstatic --noinput

# 4. Ejecutar servidor de producción
gunicorn mi_proyecto.wsgi:application
```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto React:

```env
VITE_API_URL=http://localhost:8000/quiz/api
VITE_APP_ENV=development
```

Para producción, crea `.env.production`:

```env
VITE_API_URL=/quiz/api
VITE_APP_ENV=production
```

---

## Migraciones de Base de Datos

```bash
python manage.py makemigrations quiz_game
python manage.py migrate
```

---

## Crear Superusuario para Admin

```bash
python manage.py createsuperuser
```

---

## Notas Importantes

1. **Seguridad**: No uses las credenciales hardcodeadas ("admin"/"alfred123") en producción. Usa el sistema de autenticación de Django.

2. **CORS**: En producción, configura CORS adecuadamente para permitir solo tu dominio.

3. **Archivos Estáticos**: Usa un servidor web como Nginx para servir archivos estáticos en producción.

4. **Base de Datos**: Cambia a PostgreSQL o MySQL en producción en lugar de SQLite.

5. **Variables de Entorno**: Usa variables de entorno para configuraciones sensibles.

6. **Cache de Manifest**: El archivo `manifest.json` generado por Vite contiene el mapeo de los archivos con hash. Úsalo para cargar los archivos correctos dinámicamente.

---

## Soporte

Si encuentras problemas:
1. Verifica que todas las dependencias estén instaladas
2. Revisa la consola del navegador para errores de JavaScript
3. Revisa los logs de Django para errores del servidor
4. Asegúrate de que CORS esté configurado correctamente si usas API
