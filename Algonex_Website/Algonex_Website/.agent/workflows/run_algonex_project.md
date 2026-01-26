---
description: Run Algonex Frontend and Backend Project
---
// turbo-all
1. Install backend Python dependencies
   ```
   python -m pip install Django djangorestframework django-cors-headers
   ```
2. Apply Django migrations
   ```
   python manage.py migrate
   ```
3. Start Django development server
   ```
   python manage.py runserver
   ```
4. Install frontend Node.js dependencies
   ```
   npm install
   ```
5. Start Vite development server for frontend
   ```
   npm run dev
   ```
