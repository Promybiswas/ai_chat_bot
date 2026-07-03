# CareChat

An AI-powered healthcare chatbot web app that lets users upload medical reports, track vitals, manage appointments, and chat with an AI doctor about their health data.

## Features

- **Dashboard** — health stats overview (reports count, upcoming appointments, blood pressure, blood sugar)
- **Medical Reports** — upload and manage medical documents
- **AI Chat** — chat with an AI doctor that references your uploaded reports
- **Appointments** — schedule and track doctor appointments
- **Health Tracker** — log and monitor vitals (blood pressure, blood sugar)
- **Auth** — JWT-based register/login with bcrypt password hashing

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 19, Vite                    |
| Backend  | Node.js, Express                  |
| Database | MongoDB Atlas (Mongoose)          |
| Auth     | JSON Web Tokens, bcryptjs         |

## Project Structure

```
ai_chat_bot/        # React frontend (Vite)
  src/
    Components/     # UI components (Dashboard, ChatWithReports, etc.)
    context/        # AuthContext
    utils/          # API client

backend/            # Express REST API
  routes/           # auth.js
  models/           # User.js
  middleware/       # auth.js (JWT guard)
  config/           # db.js (MongoDB connection)
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGODB_URI and JWT_SECRET
npm run dev            # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd ai_chat_bot
npm install
npm run dev            # starts on http://localhost:5173
```

## Environment Variables

Create `backend/.env` based on `backend/.env.example`:

| Variable      | Description                            |
|---------------|----------------------------------------|
| `MONGODB_URI` | MongoDB Atlas connection string        |
| `JWT_SECRET`  | Random string, at least 32 characters |
| `PORT`        | Server port (default `5000`)           |
| `NODE_ENV`    | `development` or `production`          |

## API Endpoints

| Method | Path                  | Description              | Auth required |
|--------|-----------------------|--------------------------|---------------|
| POST   | `/api/auth/register`  | Create account           | No            |
| POST   | `/api/auth/login`     | Sign in, receive JWT     | No            |
| GET    | `/api/auth/me`        | Get current user         | Yes           |
