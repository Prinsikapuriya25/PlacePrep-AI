import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { getQuizById } from "../api/axios";
import QuestionCard from "../components/quiz/QuestionCard";
import QuizTimer from "../components/quiz/QuizTimer";
import useQuiz from "../hooks/useQuiz";
import Loader from "../components/common/Loader";

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeTaken, setTimeTaken] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ["quiz", id],
    queryFn: async () => {
      const res = await getQuizById(id);
      return res.data.data;
    },
  });

  const {
    answers,
    currentQuestion,
    setCurrentQuestion,
    isSubmitting,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    handleSubmit,
  } = useQuiz(id);

  const handleTimeUp = useCallback(() => {
    handleSubmit(timeTaken);
  }, [handleSubmit, timeTaken]);

  const handleTick = useCallback((elapsed) => {
    setTimeTaken(elapsed);
  }, []);

  if (isLoading) return <Loader fullScreen text="Loading quiz..." />;
  if (!quiz) return null;

  const questions = quiz.questions || [];
  const answeredCount = Object.keys(answers).length;
  const currentQ = questions[currentQuestion];

  return (
    <div className="page-container max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {quiz.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {quiz.category} •{" "}
            {answeredCount}/{questions.length} answered
          </p>
        </div>
        <QuizTimer
          duration={quiz.duration}
          onTimeUp={handleTimeUp}
          onTick={handleTick}
        />
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
        <motion.div
          className="bg-primary-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${(answeredCount / questions.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Navigator */}
      <div className="flex flex-wrap gap-2 mb-6">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
              index === currentQuestion
                ? "bg-primary-600 text-white"
                : answers[questions[index]?._id]
                ? "bg-green-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      {currentQ && (
        <QuestionCard
          question={currentQ}
          index={currentQuestion}
          selectedAnswer={answers[currentQ._id]}
          onSelect={selectAnswer}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="flex gap-3">
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() => nextQuestion(questions.length)}
              className="btn-primary flex items-center gap-2"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Send size={18} />
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-dark-100 rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
                <AlertTriangle size={22} className="text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Submit Quiz?
              </h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              You have answered{" "}
              <span className="font-semibold text-primary-600">
                {answeredCount}
              </span>{" "}
              out of{" "}
              <span className="font-semibold">{questions.length}</span>{" "}
              questions.
            </p>
            {answeredCount < questions.length && (
              <p className="text-yellow-600 dark:text-yellow-400 text-sm mb-4">
                ⚠️ {questions.length - answeredCount} questions are unanswered.
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleSubmit(timeTaken);
                }}
                disabled={isSubmitting}
                className="btn-primary flex-1"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;