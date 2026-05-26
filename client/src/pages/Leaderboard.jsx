import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import { getLeaderboard } from "../api/axios";
import { useAuthStore } from "../store/authStore";
import Loader from "../components/common/Loader";

const Leaderboard = () => {
  const { user } = useAuthStore();

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await getLeaderboard();
      return res.data.data;
    },
  });

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy size={20} className="text-yellow-500" />;
    if (index === 1) return <Medal size={20} className="text-gray-400" />;
    if (index === 2) return <Award size={20} className="text-amber-600" />;
    return (
      <span className="text-sm font-bold text-gray-500 w-5 text-center">
        {index + 1}
      </span>
    );
  };

  const getRankBg = (index) => {
    if (index === 0) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
    if (index === 1) return "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700";
    if (index === 2) return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800";
    return "bg-white dark:bg-dark-100 border-gray-100 dark:border-gray-800";
  };

  if (isLoading) return <Loader fullScreen text="Loading leaderboard..." />;

  return (
    <div className="page-container max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
          <Trophy size={24} className="text-yellow-600" />
        </div>
        <h1 className="page-title mb-0">Leaderboard</h1>
      </div>
      <p className="page-subtitle">Top performers ranked by average score</p>

      {/* Top 3 Podium */}
      {leaderboard?.length >= 3 && (
        <div className="flex items-end justify-center gap-4 mb-8 mt-4">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 mx-auto mb-2">
              {leaderboard[1]?.name?.charAt(0)}
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-t-lg px-4 pt-4 pb-2 h-20 flex flex-col justify-end">
              <Medal size={20} className="text-gray-400 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate max-w-20">
                {leaderboard[1]?.name}
              </p>
              <p className="text-xs text-gray-500">
                {leaderboard[1]?.progress?.averageScore}%
              </p>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-2">
              {leaderboard[0]?.name?.charAt(0)}
            </div>
            <div className="bg-yellow-400 rounded-t-lg px-4 pt-4 pb-2 h-28 flex flex-col justify-end">
              <Trophy size={22} className="text-yellow-700 mx-auto mb-1" />
              <p className="text-xs font-bold text-yellow-900 truncate max-w-20">
                {leaderboard[0]?.name}
              </p>
              <p className="text-xs text-yellow-800">
                {leaderboard[0]?.progress?.averageScore}%
              </p>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-14 h-14 bg-amber-300 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-2">
              {leaderboard[2]?.name?.charAt(0)}
            </div>
            <div className="bg-amber-300 rounded-t-lg px-4 pt-4 pb-2 h-16 flex flex-col justify-end">
              <Award size={18} className="text-amber-700 mx-auto mb-1" />
              <p className="text-xs font-semibold text-amber-900 truncate max-w-20">
                {leaderboard[2]?.name}
              </p>
              <p className="text-xs text-amber-800">
                {leaderboard[2]?.progress?.averageScore}%
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Full List */}
      <div className="space-y-3">
        {leaderboard?.map((student, index) => (
          <motion.div
            key={student._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${getRankBg(
              index
            )} ${student._id === user?._id ? "ring-2 ring-primary-500" : ""}`}
          >
            {/* Rank */}
            <div className="w-8 flex items-center justify-center flex-shrink-0">
              {getRankIcon(index)}
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {student.name?.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                {student.name}
                {student._id === user?._id && (
                  <span className="ml-2 text-xs text-primary-600 font-normal">
                    (You)
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {student.progress?.totalQuizzes || 0} quizzes attempted
              </p>
            </div>

            {/* Score */}
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-primary-600">
                {student.progress?.averageScore || 0}%
              </p>
              <p className="text-xs text-gray-500">avg score</p>
            </div>
          </motion.div>
        ))}

        {leaderboard?.length === 0 && (
          <div className="text-center py-16">
            <Trophy size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No data yet. Be the first!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;