import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

const QuestionCard = ({
  question,
  index,
  selectedAnswer,
  onSelect,
  showResult = false,
}) => {
  const getOptionStyle = (optionValue) => {
    if (!showResult) {
      if (selectedAnswer === optionValue) {
        return "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300";
      }
      return "border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800";
    }

    // Show result mode
    if (optionValue === question.answer) {
      return "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
    }
    if (selectedAnswer === optionValue && optionValue !== question.answer) {
      return "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
    }
    return "border-gray-200 dark:border-gray-700 opacity-50";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      {/* Question */}
      <div className="mb-5">
        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
          Question {index + 1}
        </span>
        <p className="text-gray-800 dark:text-white font-medium text-lg mt-1 leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options?.map((option) => (
          <button
            key={option.value}
            onClick={() => !showResult && onSelect(question._id, option.value)}
            disabled={showResult}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${getOptionStyle(
              option.value
            )}`}
          >
            {/* Radio Icon */}
            <div className="flex-shrink-0">
              {selectedAnswer === option.value ? (
                <CheckCircle
                  size={20}
                  className={
                    showResult
                      ? option.value === question.answer
                        ? "text-green-500"
                        : "text-red-500"
                      : "text-primary-600"
                  }
                />
              ) : (
                <Circle size={20} className="text-gray-400" />
              )}
            </div>

            {/* Label */}
            <span className="font-medium text-sm">
              <span className="text-gray-400 mr-2">{option.label}.</span>
              {option.value}
            </span>
          </button>
        ))}
      </div>

      {/* Explanation (show result mode) */}
      {showResult && question.explanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
            💡 Explanation
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {question.explanation}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuestionCard;