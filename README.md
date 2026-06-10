# 🚀 PlacePrep AI

<div align="center">

### 🧠 AI-Powered Placement Preparation Platform

Built with **React • Node.js • MongoDB • Tailwind CSS • OpenAI • Gemini**

A modern full-stack AI-powered platform designed to help students crack placement interviews through smart quizzes, AI mock interviews, resume analysis, personalized study roadmaps, and performance tracking.

</div>

---

## ✨ Features

### 👨‍🎓 Student Features

| Feature | Description |
|----------|------------|
| 🧠 Smart Quizzes | Practice MCQs across DSA, DBMS, OS, Networking, Aptitude, OOP, HR and SQL |
| 🎙️ AI Mock Interview | Real-time AI-powered interview simulation with feedback |
| 📄 Resume Analyzer | Upload resume and receive ATS score, improvement tips and insights |
| 🗺️ Study Roadmap | Personalized AI-generated study plan based on weak areas |
| 🏆 Leaderboard | Track rankings and compete with other students |
| 📊 Dashboard Analytics | Visualize progress, scores and performance trends |
| 🌙 Dark Mode | Fully responsive dark/light mode experience |
| 🔐 JWT Authentication | Secure login and registration system |

---

### 👨‍💼 Admin Features

| Feature | Description |
|----------|------------|
| 📚 Question Management | Add, delete and manage question bank |
| 📝 Quiz Management | Create and manage quizzes |
| 👥 User Management | View and manage student accounts |
| 📈 Analytics Dashboard | Track platform performance and engagement |
| 🏆 Performance Insights | Monitor top performers and category-wise results |

---

# 🛠️ Tech Stack

## Frontend

- ⚛️ React.js
- ⚡ Vite
- 🎨 Tailwind CSS
- 🎞️ Framer Motion
- 🐻 Zustand
- 🔄 TanStack React Query
- 🌐 Axios
- 🎯 React Router DOM
- 🎨 Lucide React

---

## Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB Atlas
- 🦔 Mongoose
- 🔑 JWT Authentication
- 📦 Multer
- 📄 PDF Parsing
- 🛡️ Express Rate Limiter

---

## AI Integration

### 🤖 OpenAI

Used for:

- AI Resume Analysis
- Smart Study Roadmaps
- AI Interview Assistance

### ✨ Google Gemini

Used for:

- AI Recommendations
- Interview Feedback
- Personalized Learning Suggestions

---

# 📁 Project Structure

```bash
PlacePrep-AI
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── interview/
│   │   │   ├── quiz/
│   │   │   └── resume/
│   │   │
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   └── utils/
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Prinsikapuriya25/placeprep-ai.git

cd placeprep-ai
```

---

## 2️⃣ Backend Setup

```bash
cd server

npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_key

GEMINI_API_KEY=your_gemini_key

NODE_ENV=development
```

Run Backend

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run Frontend

```bash
npm run dev
```

---

# 🌍 Live Deployment

## Frontend (Vercel)

```text
https://placeprep-ai-wheat.vercel.app
```

## Backend (Render)

```text
https://placeprep-ai-k7ae.onrender.com
```

---

# 📡 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

---

## User

```http
GET  /api/user/dashboard
GET  /api/user/leaderboard
PUT  /api/user/profile
GET  /api/user/all
DELETE /api/user/:id
GET  /api/user/analytics
```

---

## Quiz

```http
GET    /api/quiz
GET    /api/quiz/:id
POST   /api/quiz/:id/submit
GET    /api/quiz/results
GET    /api/quiz/results/:id
```

---

## Question Management

```http
GET    /api/quiz/questions
POST   /api/quiz/questions
DELETE /api/quiz/questions/:id
```

---

## Resume

```http
POST   /api/resume/upload
GET    /api/resume
GET    /api/resume/:id
DELETE /api/resume/:id
```

---

## Interview

```http
POST /api/interview/start
POST /api/interview/answer
```

---

## AI

```http
POST /api/ai/roadmap
```

---

# 🔐 Security Features

- JWT Authentication
- Protected Routes
- Role Based Access Control
- Secure Password Hashing
- API Rate Limiting
- Input Validation
- Secure Environment Variables

---

# 📊 Core Modules

### 🧠 Quiz Engine

- Category Based Questions
- Difficulty Levels
- Timed Quizzes
- Performance Tracking

### 🎙️ Mock Interview

- AI Generated Questions
- Real-time Responses
- Feedback & Suggestions

### 📄 Resume Analyzer

- ATS Score Calculation
- Keyword Analysis
- Resume Improvement Tips

### 🗺️ Study Roadmap

- Personalized Weekly Plans
- Resource Suggestions
- Goal Tracking

### 🏆 Leaderboard

- Student Rankings
- Score Comparison
- Competitive Learning

---

# 🚀 Future Enhancements

- 💻 Coding Assessment Platform
- 🎥 Video-Based Mock Interviews
- 📱 Mobile Application
- 📄 PDF Progress Reports
- 📧 Email Notifications
- 🏢 Company-Specific Interview Tracks
- 🤖 Advanced AI Career Guidance

---

# 👨‍💻 Developer

## Prinsi Kapuriya

### GitHub

https://github.com/Prinsikapuriya25

### Project Repository

https://github.com/Prinsikapuriya25/placeprep-ai

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

🚀 Share it with others

---

# 📄 License

This project is developed for educational and placement preparation purposes.

---

<div align="center">

### Made with ❤️ for Placement Aspirants

**PlacePrep AI 🚀**

</div>
