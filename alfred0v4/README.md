
  # Kahoot-style Game App

  This is a code bundle for Kahoot-style Game App. The original project is available at https://www.figma.com/design/pQlipn0tZertNZ29UaCm9e/Kahoot-style-Game-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ### Backend integration
  
  Create a `.env` file in this folder with:
  
  ```
  VITE_API_URL=http://localhost:8000/quiz/api
  VITE_APP_ENV=development
  ```
  
  Start the Django backend from `backend/`:
  
  ```
  cd ../backend
  source .venv/bin/activate
  python manage.py runserver
  ```
  