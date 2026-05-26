import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import { getScoreBg } from "../../utils/scoreHelper";
import { timeAgo } from "../../utils/formatDate";

const RecentActivity = ({ results = [] }) => {
  const navigate = useNavigate();

  if (results.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Clock size={40} className="text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No quiz attempts yet
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="btn-primary mt-4 text-sm py-1.5 px-4"
          >
            Take a Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Recent Activity
        </h3>
        <button
          onClick={() => navigate("/quiz")}
          className="text-sm text-primary-600 hover:underline flex items-center gap-1"
        >
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <motion.div
            key={result._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/quiz/results/${result._id}`)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all"
          >
            {/* Pass/Fail Icon */}
            <div className="flex-shrink-0">
              {result.passed ? (
                <CheckCircle
                  size={22}
                  className="text-green-500"
                />
              ) : (
                <XCircle
                  size={22}
                  className="text-red-500"
                />
              )}
            </div>

            {/* Quiz Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                {result.quiz?.title || "Quiz"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {result.quiz?.category} • {timeAgo(result.createdAt)}
              </p>
            </div>

            {/* Score */}
            <div
              className={`text-xs font-semibold px-2 py-1 rounded-full ${getScoreBg(
                result.percentage
              )}`}
            >
              {result.percentage}%
            </div>

            <ChevronRight
              size={16}
              className="text-gray-400 flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;