# Backend (Django + DRF)

## Setup

```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

API base URL: `http://localhost:8000/quiz/api/`

## Endpoints
- POST `/quiz/api/sessions/` { team_name }
- POST `/quiz/api/sessions/{id}/complete_phase/` { phaseNumber, tokensEarned }
- POST `/quiz/api/sessions/{id}/complete_game/`
- GET `/quiz/api/token-configs/`

CORS is enabled for `http://localhost:5173`.
