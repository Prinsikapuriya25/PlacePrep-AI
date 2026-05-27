<div align="center">

# 🧠 PlacePrep AI

### AI-Powered Placement Preparation Platform

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq%20AI-F55036?style=for-the-badge)](https://groq.com/)

A complete full-stack AI-powered platform to help students
crack their placement interviews with smart quizzes,
mock interviews, resume analysis and personalized roadmaps.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup](#-setup) • [Screenshots](#-screenshots)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **Smart Quizzes** | Topic-wise MCQs across DSA, OS, DBMS, Aptitude, HR, Networking with AI feedback |
| 🎙️ **AI Mock Interview** | Chat-based mock interviews powered by LLaMA 3.3 with real-time evaluation |
| 📄 **Resume Analyzer** | Upload PDF resume → get ATS score, keyword gaps and improvement tips |
| 🗺️ **Study Roadmap** | AI generates personalized week-by-week study plan based on weak areas |
| 🏆 **Leaderboard** | Compete with peers and track your rank among students |
| 👨‍💼 **Admin Panel** | Manage questions, quizzes and users from a dedicated admin dashboard |
| 🌙 **Dark Mode** | Full dark/light mode support across the entire platform |
| 🔐 **JWT Auth** | Secure authentication with access token + refresh token strategy |

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React.js** — UI library
- ⚡ **Vite** — Fast build tool
- 🎨 **Tailwind CSS** — Utility-first styling
- 🎞️ **Framer Motion** — Animations
- 🐻 **Zustand** — State management
- 🔄 **React Query** — Server state & caching
- 📊 **Recharts** — Charts and graphs
- 📝 **React Hook Form** — Form handling

### Backend
- 🟢 **Node.js** — Runtime
- 🚂 **Express.js** — Web framework
- 🍃 **MongoDB** — Database
- 🦔 **Mongoose** — ODM
- 🔑 **JWT** — Authentication
- ☁️ **Cloudinary** — Resume storage
- 📦 **Multer** — File uploads
- 📄 **pdf-parse** — PDF text extraction

### AI
- 🤖 **Groq API** — LLaMA 3.3 70B model
  - Quiz feedback generation
  - Mock interview conversations
  - Resume analysis
  - Study roadmap generation

---

## 📁 Project Structure

```
placeprep-ai/
│
├── server/                   # Backend
│   ├── config/               # DB & Cloudinary config
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Auth & role middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── seed/                 # Database seeder
│   └── server.js             # Entry point
│
├── client/                   # Frontend
│   └── src/
│       ├── api/              # Axios instance & API calls
│       ├── components/       # Reusable components
│       │   ├── common/       # Navbar, Footer, Loader
│       │   ├── dashboard/    # Stats, Charts
│       │   ├── quiz/         # Quiz components
│       │   ├── interview/    # Interview components
│       │   └── resume/       # Resume components
│       ├── hooks/            # Custom hooks
│       ├── pages/            # All pages
│       ├── store/            # Zustand stores
│       └── utils/            # Helper functions
│
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (free at console.groq.com)
- Cloudinary account (free)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Dharshini707/placeprep-ai-project.git
cd placeprep-ai
```

### 2️⃣ Setup Server
```bash
cd server
npm install --legacy-peer-deps
```

Create `server/.env`:
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

### 3️⃣ Setup Client
```bash
cd client
npm install --legacy-peer-deps
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Seed the Database
```bash
cd server
npm run seed
```

This creates:
- 1 Admin user
- 5 Student users
- 30 Questions across all categories
- 4 Quizzes

### 5️⃣ Run the Application

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

Open **http://localhost:5173** 🚀

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| 👨‍💼 Admin | admin@placeprep.com | admin123 |
| 👨‍🎓 Student | rahul@student.com | student123 |

---

## 📡 API Endpoints

### Auth
```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login user
GET    /api/auth/me           Get current user
POST   /api/auth/logout       Logout user
POST   /api/auth/refresh      Refresh access token
```

### Quiz
```
GET    /api/quiz              Get all quizzes
GET    /api/quiz/:id          Get quiz by ID
POST   /api/quiz/:id/submit   Submit quiz answers
GET    /api/quiz/results      Get user results
GET    /api/quiz/results/:id  Get result by ID
```

### Interview
```
POST   /api/interview/start   Start mock interview
POST   /api/interview/answer  Continue interview
```

### Resume
```
POST   /api/resume/upload     Upload & analyze resume
GET    /api/resume            Get all user resumes
GET    /api/resume/:id        Get resume by ID
DELETE /api/resume/:id        Delete resume
```

### User
```
GET    /api/user/dashboard    Get dashboard stats
GET    /api/user/leaderboard  Get leaderboard
PUT    /api/user/profile      Update profile
```

### AI
```
POST   /api/ai/roadmap        Generate study roadmap
```

---

## 🌟 Key Highlights

- 🔐 **Secure** — JWT with refresh token, role-based access control
- 🤖 **AI-Powered** — LLaMA 3.3 70B for all AI features via Groq
- 📱 **Responsive** — Mobile-first design with Tailwind CSS
- 🌙 **Dark Mode** — Persisted theme preference
- ⚡ **Fast** — Vite + React Query for optimal performance
- 🛡️ **Rate Limited** — AI endpoints protected from abuse

---

## 🚀 Future Improvements

- [ ] Deploy on Vercel (Frontend) + Render (Backend)
- [ ] Add coding questions with online judge
- [ ] Company-specific quiz packs
- [ ] Video mock interviews
- [ ] Email notifications
- [ ] Progress reports as PDF
- [ ] Mobile app with React Native

---

## 👨‍💻 Author

**R.Dharshini**
- LinkedIn: [https://www.linkedin.com/in/r-dharshini-960621298]
- GitHub: [https://github.com/Dharshini707]
- Email: dharshur1620@gmail.com

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

Made with ❤️ for placement aspirants

</div>