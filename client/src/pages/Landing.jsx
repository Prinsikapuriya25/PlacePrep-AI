import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  Mic,
  FileText,
  Map,
  Trophy,
  ChevronRight,
  CheckCircle,
  Zap,
  Users,
  Star,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen size={28} className="text-blue-500" />,
      title: "Smart Quizzes",
      description:
        "Practice DSA, OS, DBMS, Aptitude and more with AI-powered feedback on every attempt.",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <Mic size={28} className="text-purple-500" />,
      title: "Mock Interviews",
      description:
        "Face AI-driven mock interviews tailored to your target role and get real-time feedback.",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: <FileText size={28} className="text-green-500" />,
      title: "Resume Analyzer",
      description:
        "Get your resume ATS score, keyword analysis and actionable improvement tips.",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <Map size={28} className="text-orange-500" />,
      title: "Study Roadmap",
      description:
        "Get a personalized week-by-week study plan based on your weak areas and target company.",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: <Trophy size={28} className="text-yellow-500" />,
      title: "Leaderboard",
      description:
        "Compete with peers, track your rank and stay motivated throughout your prep journey.",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      icon: <Brain size={28} className="text-red-500" />,
      title: "AI Feedback",
      description:
        "Every quiz attempt, interview and resume gets detailed AI-powered analysis and tips.",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  const stats = [
    { value: "500+", label: "Practice Questions" },
    { value: "10+", label: "Quiz Categories" },
    { value: "AI", label: "Powered Feedback" },
    { value: "24/7", label: "Available" },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Account",
      description: "Sign up for free and set up your placement profile.",
    },
    {
      step: "02",
      title: "Take Quizzes",
      description: "Attempt topic-wise quizzes and get AI feedback instantly.",
    },
    {
      step: "03",
      title: "Practice Interviews",
      description: "Do mock interviews with our AI interviewer anytime.",
    },
    {
      step: "04",
      title: "Get Placed",
      description: "Track your progress and crack your dream company.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-20 px-4">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap size={14} className="text-yellow-300" />
              AI-Powered Placement Preparation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Crack Your Dream Job
            <br />
            <span className="text-yellow-300">with AI Guidance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Practice quizzes, mock interviews, resume analysis and personalized
            roadmaps — all powered by AI to help you land your dream placement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              Get Started Free
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg transition-all border border-white/20"
            >
              Login
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/20"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-yellow-300">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Get Placed
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              A complete AI-powered toolkit to prepare for campus and off-campus
              placements from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-hover"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.bg}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white dark:bg-dark-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Get started in minutes and be placement-ready in weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Preparing?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of students already using PlacePrep AI to crack
              their placements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-primary-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Star size={18} />
                Get Started Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-all border border-white/20"
              >
                Already have an account?
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;