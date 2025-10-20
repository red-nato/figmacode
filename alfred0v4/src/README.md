# Quiz Game - Sistema de Tokens

Aplicación de juego de preguntas y respuestas con sistema de tokens, panel de administración y soporte multiidioma (Español/Inglés).

## 🎮 Características

- **Sistema de Juego por Fases**: 5 fases modulares con diferentes tipos de desafíos
  - Fase 1: Anagramas y sopas de letras con cronómetro de 3 minutos
  - Fase 2: Historias de desafíos en emprendimiento
  - Fases 3-5: Configurables
- **Sistema de Tokens**: Configuración modular y customizable por fase
- **Panel de Administración**: Dashboard con analíticas, gestión de sesiones y configuraciones
- **Multiidioma**: Soporte completo para español e inglés
- **Modo Equipo**: Los jugadores pueden configurar nombres de equipo
- **Diseño Responsivo**: Funciona en desktop y móvil

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS v4** para estilos
- **Vite** como bundler
- **shadcn/ui** para componentes UI
- **Recharts** para gráficas
- **Lucide React** para iconos

### Backend (Opcional)
- **Django 5.0+**
- **Django REST Framework**
- **PostgreSQL** (recomendado para producción)

## 🚀 Inicio Rápido

### Solo Frontend (Desarrollo)

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar servidor de desarrollo:
```bash
npm run dev
```

3. Abrir en navegador: `http://localhost:5173`

### Construcción para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 🔧 Integración con Django

Para integrar esta aplicación React con Django, consulta la [Guía de Integración con Django](./DJANGO_INTEGRATION.md) que incluye:

- 3 opciones diferentes de integración
- Configuración paso a paso
- Modelos Django de ejemplo
- APIs REST con Django REST Framework
- Configuración de CORS y seguridad
- Scripts de deployment

### Estructura Recomendada con Django

```
mi_proyecto_django/
├── manage.py
├── mi_proyecto/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── quiz_game/              # App Django
│   ├── migrations/
│   ├── static/quiz_game/   # Build de React
│   ├── templates/
│   ├── models.py
│   ├── views.py
│   └── urls.py
├── frontend/               # Este proyecto React
│   ├── components/
│   ├── App.tsx
│   └── package.json
└── requirements.txt
```

## 📁 Estructura del Proyecto

```
.
├── App.tsx                 # Componente principal
├── main.tsx               # Punto de entrada
├── components/
│   ├── phases/            # Componentes de cada fase
│   │   ├── Phase1.tsx
│   │   ├── Phase2.tsx
│   │   └── ...
│   ├── AdminDashboard.tsx # Panel de administración
│   ├── TeamSetup.tsx      # Configuración de equipo
│   └── ui/                # Componentes UI (shadcn)
├── contexts/              # React Contexts
│   ├── LanguageContext.tsx
│   ├── TokenConfigContext.tsx
│   └── PhaseConfigContext.tsx
├── utils/
│   ├── translations.ts    # Traducciones ES/EN
│   ├── tokenConfig.ts     # Configuración de tokens
│   └── phaseConfig.ts     # Configuración de fases
├── styles/
│   └── globals.css        # Estilos globales
└── django_examples/       # Ejemplos para Django
```

## 🎯 Uso

### Como Jugador

1. **Pantalla de Inicio**: Hacer clic en "Comenzar"
2. **Configurar Equipo**: Ingresar nombre del equipo
3. **Jugar Fases**: Completar cada fase para ganar tokens
4. **Ver Resultados**: Ver tokens totales al final

### Como Administrador

1. En la pantalla de inicio, hacer clic en el botón de engranaje (esquina superior derecha)
2. Credenciales por defecto:
   - Usuario: `admin`
   - Contraseña: `alfred123`
3. Desde el dashboard puedes:
   - Ver analíticas del juego
   - Gestionar sesiones activas
   - Configurar tokens por fase
   - Gestionar preguntas
   - Ajustar configuraciones

**⚠️ IMPORTANTE**: En producción, cambia estas credenciales y usa un sistema de autenticación adecuado (Django Admin, por ejemplo).

## 🌐 Multiidioma

La aplicación soporta español e inglés. Para cambiar el idioma:

- Usar el botón de idioma en la esquina superior derecha
- El idioma se guarda en localStorage
- Todas las pantallas y mensajes están traducidos

### Agregar más idiomas

1. Editar `utils/translations.ts`
2. Agregar nuevo objeto de idioma
3. Actualizar el `LanguageContext`

## ⚙️ Configuración

### Tokens por Fase

Editar `utils/tokenConfig.ts`:

```typescript
export const tokenConfig = {
  phase1: {
    anagramTokens: 30,
    wordSearchTokens: 30,
    // ...
  },
  // ...
};
```

### Configuración de Fases

Editar `utils/phaseConfig.ts`:

```typescript
export const phaseConfig = {
  phase1: {
    enabled: true,
    timeLimit: 180,
    // ...
  },
  // ...
};
```

## 🔐 Seguridad

- **Credenciales**: Las credenciales hardcodeadas son solo para demostración
- **CORS**: Configura CORS apropiadamente para producción
- **HTTPS**: Usa HTTPS en producción
- **Validación**: Valida todas las entradas en el backend
- **CSRF**: Usa tokens CSRF para peticiones POST

## 📊 Base de Datos (con Django)

### Modelos Principales

- `GameSession`: Sesiones de juego
- `PhaseResult`: Resultados por fase
- `TokenConfiguration`: Configuración de tokens
- `PhaseConfiguration`: Configuración de fases
- `Question`: Banco de preguntas

### Migraciones

```bash
python manage.py makemigrations
python manage.py migrate
```

### Datos Iniciales

```bash
python manage.py setup_initial_data
```

## 🧪 Testing

```bash
# Frontend
npm run test

# Backend (Django)
pytest
```

## 📝 Variables de Entorno

Crear `.env` en la raíz:

```env
# React
VITE_API_URL=http://localhost:8000/quiz/api
VITE_APP_ENV=development

# Django
SECRET_KEY=tu-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:pass@localhost/dbname
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 🚀 Deployment

### Frontend (Netlify, Vercel, etc.)

```bash
npm run build
# Subir carpeta dist/
```

### Django + React (Heroku, Railway, etc.)

1. Construir React: `npm run build`
2. Copiar a static: `cp -r dist/* quiz_game/static/quiz_game/`
3. Collectstatic: `python manage.py collectstatic --noinput`
4. Deploy con Gunicorn

Ver [DJANGO_INTEGRATION.md](./DJANGO_INTEGRATION.md) para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo una licencia de código abierto. Ver `LICENSE` para más detalles.

## 👥 Autores

- Tu Nombre - Desarrollo inicial

## 🙏 Agradecimientos

- shadcn/ui por los componentes UI
- Tailwind CSS por el framework de estilos
- Recharts por las gráficas
- Todos los contribuidores

## 📞 Soporte

Para preguntas o issues:
- Abrir un issue en GitHub
- Email: tu@email.com

## 🗺️ Roadmap

- [ ] Integración con WebSockets para juego en tiempo real
- [ ] Modo multijugador
- [ ] Sistema de logros
- [ ] Exportar resultados a PDF
- [ ] Dashboard de analíticas avanzadas
- [ ] Más tipos de desafíos
- [ ] Modo offline
- [ ] App móvil nativa

---

Hecho con ❤️ para emprendedores
