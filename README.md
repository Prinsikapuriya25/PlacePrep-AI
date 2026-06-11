

<div align="center">

# 🧠  PlacePrep AI

### AI-Powered Placement Preparation Platform

# 🚀 PlacePrep AI

### AI-Powered Placement Preparation Platform

<p align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://placeprep-ai-wheat.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend-API-blue?style=for-the-badge)](https://placeprep-ai-k7ae.onrender.com)

</p>

<p align="center">

![React](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=jsonwebtokens)
![Groq AI](https://img.shields.io/badge/Groq_AI-LLaMA-purple?style=for-the-badge)

</p>

<p align="center">

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-FullStack-green?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</p>

---

## 🎯 Overview

PlacePrep AI is a full-stack AI-powered placement preparation platform built with React.js, Node.js, Express.js, MongoDB, JWT Authentication, and Groq AI. The platform helps students prepare for placements through Smart Quizzes, AI Mock Interviews, Resume Analysis, Personalized Study Roadmaps, Leaderboards, and Performance Analytics.

</div>

---

## ✨ Features

### 👨‍🎓 Student Features

| Feature | Description |
|----------|------------|
| 🧠 Smart Quizzes | Practice MCQs across DSA, DBMS, OS, Networking, Aptitude, OOP, HR and SQL |
| 🎙️ AI Mock Interview | Chat-based mock interviews powered by LLaMA 3.3 with real-time evaluation |
| 📄 Resume Analyzer | Upload resume and receive ATS score, improvement tips and insights |
| 🗺️ Study Roadmap | AI generates personalized week-by-week study plan based on weak areas |
| 🏆 Leaderboard | Compete with peers and track your rank among students |
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

- ⚛️ React.js — UI library
- ⚡ Vite — Fast build tool
- 🎨 Tailwind CSS — Utility-first styling
- 🎞️ Framer Motion — Animations
- 🐻 Zustand — State management
- 🔄 React Query — Server state & caching
- 📊 Recharts — Charts and graphs
- 📝 React Hook Form — Form handling

---

## Backend

- 🟢 Node.js — Runtime
- 🚂 Express.js — Web framework
- 🍃 MongoDB — Database
- 🦔 Mongoose — ODM
- 🔑 JWT — Authentication
- ☁️ Cloudinary — Resume storage
- 📦 Multer — File uploads
- 📄 pdf-parse — PDF text extraction

---

## AI Integration

### 🤖 Groq API — LLaMA 3.3 70B model
 - Quiz feedback generation
- Mock interview conversations
- Resume analysis
- Study roadmap generation



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

# ⚙️ Setup & Installation

### Prerequisites
  - Node.js v18+
  - MongoDB Atlas account
  - Groq API key (free at console.groq.com)
  - Cloudinary account (free)

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
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/placeprep-ai
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
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
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login user
GET    /api/auth/me           Get current user
POST   /api/auth/logout       Logout user
POST   /api/auth/refresh      Refresh access token
```

---

## User

```http
GET    /api/user/dashboard    Get dashboard stats
GET    /api/user/leaderboard  Get leaderboard
PUT    /api/user/profile      Update profile
```

---

## Quiz

```http
GET    /api/quiz              Get all quizzes
GET    /api/quiz/:id          Get quiz by ID
POST   /api/quiz/:id/submit   Submit quiz answers
GET    /api/quiz/results      Get user results
GET    /api/quiz/results/:id  Get result by ID
```

---
## Resume

```http
POST   /api/resume/upload     Upload & analyze resume
GET    /api/resume            Get all user resumes
GET    /api/resume/:id        Get resume by ID
DELETE /api/resume/:id        Delete resume
```
---

## AI

```http
POST   /api/ai/roadmap        Generate study roadmap
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


# 📄 License

This project is developed for educational and placement preparation purposes.

---

<div align="center">

### Made with ❤️ for Placement Aspirants

**PlacePrep AI 🚀**

</div>
