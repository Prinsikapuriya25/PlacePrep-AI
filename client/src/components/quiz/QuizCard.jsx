import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, BarChart2, ChevronRight } from "lucide-react";
import { getDifficultyColor } from "../../utils/scoreHelper";

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-hover"
      onClick={() => navigate(`/quiz/${quiz._id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="badge-category">{quiz.category}</span>
          <span className={getDifficultyColor(quiz.difficulty)}>
            {quiz.difficulty}
          </span>
        </div>
        <ChevronRight
          size={18}
          className="text-gray-400 flex-shrink-0 mt-0.5"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
        {quiz.title}
      </h3>

      {/* Description */}
      {quiz.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {quiz.description}
        </p>
      )}

      {/* Footer Stats */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
          <BookOpen size={15} />
          <span>{quiz.questions?.length || 0} Questions</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
          <Clock size={15} />
          <span>{quiz.duration} mins</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
          <BarChart2 size={15} />
          <span>{quiz.totalMarks} marks</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard;