import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../api/axios";
import { useAuthStore } from "../store/authStore";
import StatsCard from "../components/dashboard/StatsCard";
import ProgressChart from "../components/dashboard/ProgressChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import Loader from "../components/common/Loader";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await getDashboard();
      return res.data.data;
    },
  });

  if (isLoading) return <Loader fullScreen text="Loading dashboard..." />;

  if(user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  const stats = data?.stats || {};
  const categoryStats = data?.categoryStats || [];
  const recentResults = data?.recentResults || [];

  const quickActions = [
    {
      label: "Take a Quiz",
      icon: <BookOpen size={20} />,
      to: "/quiz",
      color: "bg-blue-500",
    },
    {
      label: "Mock Interview",
      icon: <Target size={20} />,
      to: "/mock-interview",
      color: "bg-purple-500",
    },
    {
      label: "Analyze Resume",
      icon: <TrendingUp size={20} />,
      to: "/resume",
      color: "bg-green-500",
    },
    {
      label: "Leaderboard",
      icon: <Trophy size={20} />,
      to: "/leaderboard",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="page-container">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="page-title">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="page-subtitle">
          Here's your placement preparation summary
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Quizzes Attempted"
          value={stats.totalQuizzes || 0}
          icon={<BookOpen size={22} />}
          color="blue"
          subtitle="Total attempts"
        />
        <StatsCard
          title="Average Score"
          value={`${stats.averageScore || 0}%`}
          icon={<TrendingUp size={22} />}
          color="green"
          subtitle="Across all quizzes"
        />
        <StatsCard
          title="Total Score"
          value={stats.totalScore || 0}
          icon={<Target size={22} />}
          color="purple"
          subtitle="Cumulative marks"
        />
        <StatsCard
          title="Your Rank"
          value={`#${user?.progress?.totalQuizzes > 0 ? "–" : "N/A"}`}
          icon={<Trophy size={22} />}
          color="orange"
          subtitle="Check leaderboard"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {quickActions.map((action, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(action.to)}
            className="card-hover flex items-center gap-3 p-4"
          >
            <div
              className={`${action.color} text-white p-2 rounded-lg flex-shrink-0`}
            >
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {action.label}
            </span>
            <ArrowRight
              size={14}
              className="text-gray-400 ml-auto flex-shrink-0"
            />
          </motion.button>
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProgressChart categoryStats={categoryStats} type="radar" />
        <ProgressChart categoryStats={categoryStats} type="bar" />
      </div>

      {/* Recent Activity */}
      <RecentActivity results={recentResults} />
    </div>
  );
};

export default Dashboard;