import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Home,
} from "lucide-react";
import { getScoreColor, getScoreLabel } from "../../utils/scoreHelper";
import { formatTime } from "../../utils/scoreHelper";

const ResultCard = ({ result }) => {
  const navigate = useNavigate();
  const { score, totalMarks, percentage, passed, timeTaken, aiFeedback, quiz } =
    result;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      {/* Score Circle */}
      <div className="card text-center mb-6">
        <div className="flex justify-center mb-4">
          <div
            className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center
            ${
              passed
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-red-500 bg-red-50 dark:bg-red-900/20"
            }`}
          >
            <span
              className={`text-3xl font-bold ${getScoreColor(percentage)}`}
            >
              {percentage}%
            </span>
            <span className="text-xs text-gray-500">Score</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          {getScoreLabel(percentage)}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {quiz?.title || "Quiz Completed"}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Trophy size={20} className="text-yellow-500" />
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {score}/{totalMarks}
            </p>
            <p className="text-xs text-gray-500">Marks</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1">
              {passed ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : (
                <XCircle size={20} className="text-red-500" />
              )}
            </div>
            <p
              className={`text-xl font-bold ${
                passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {passed ? "Passed" : "Failed"}
            </p>
            <p className="text-xs text-gray-500">Status</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Clock size={20} className="text-blue-500" />
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {formatTime(timeTaken || 0)}
            </p>
            <p className="text-xs text-gray-500">Time Taken</p>
          </div>
        </div>
      </div>

      {/* AI Feedback */}
      {aiFeedback?.summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            🤖 AI Feedback
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {aiFeedback.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            {aiFeedback.strengths?.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                  ✅ Strengths
                </h4>
                <ul className="space-y-1">
                  {aiFeedback.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="text-sm text-green-600 dark:text-green-400"
                    >
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weaknesses */}
            {aiFeedback.weaknesses?.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                  ⚠️ Weaknesses
                </h4>
                <ul className="space-y-1">
                  {aiFeedback.weaknesses.map((w, i) => (
                    <li
                      key={i}
                      className="text-sm text-red-600 dark:text-red-400"
                    >
                      • {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {aiFeedback.recommendations?.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                📚 Recommendations
              </h4>
              <ul className="space-y-1">
                {aiFeedback.recommendations.map((r, i) => (
                  <li
                    key={i}
                    className="text-sm text-blue-600 dark:text-blue-400"
                  >
                    • {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/quiz")}
          className="btn-secondary flex items-center gap-2 flex-1 justify-center"
        >
          <RotateCcw size={16} />
          Try Another Quiz
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn-primary flex items-center gap-2 flex-1 justify-center"
        >
          <Home size={16} />
          Dashboard
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;