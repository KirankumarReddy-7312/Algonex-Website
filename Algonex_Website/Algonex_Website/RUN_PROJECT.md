# How to Run Algonex Project

This project consists of a **Django Backend** and a **React (Vite) Frontend**. Follow the steps below to get the project running on your local machine.

---

## 1. Prerequisites

Ensure you have the following installed:
- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

## 2. Backend Setup (Django)

1. **Navigate to the backend directory:**
   ```powershell
   cd algonex-backend
   ```

2. **Create and Activate a Virtual Environment:**
   *On Windows:*
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\activate
   ```
   *On macOS/Linux:*
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install Dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Apply Database Migrations:**
   ```powershell
   python manage.py migrate
   ```

5. **(Optional) Seed Initial Data:**
   If there is a seed script for courses:
   ```powershell
   python seed_courses.py
   ```

6. **Start the Development Server:**
   ```powershell
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:8000/`.

---

## 3. Frontend Setup (React + Vite)

Open a **new terminal window** or tab.

1. **Navigate to the frontend directory:**
   ```powershell
   cd algonex-frontend
   ```

2. **Install Dependencies:**
   ```powershell
   npm install
   ```

3. **Start the Development Server:**
   ```powershell
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173/` (or the port shown in your terminal).

---

## 4. Troubleshooting

- **CORS Issues:** The backend is configured to allow all origins (`CORS_ALLOW_ALL_ORIGINS = True`), so you shouldn't face CORS issues during local development.
- **Port Conflict:** If port `8000` or `5173` is already in use, you can specify a different port:
  - Backend: `python manage.py runserver 8001`
  - Frontend: `npm run dev -- --port 5174`
- **Missing Dependencies:** Ensure you have activated the virtual environment before running backend commands.

---

## Quick Workflow
You can also use the custom workflow if you are using an agent:
`/run_algonex_project`
