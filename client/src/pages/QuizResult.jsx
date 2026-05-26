import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getResultById } from "../api/axios";
import ResultCard from "../components/quiz/ResultCard";
import QuestionCard from "../components/quiz/QuestionCard";
import Loader from "../components/common/Loader";
import { motion } from "framer-motion";

const QuizResult = () => {
  const { id } = useParams();

  const { data: result, isLoading } = useQuery({
    queryKey: ["result", id],
    queryFn: async () => {
      const res = await getResultById(id);
      return res.data.data;
    },
  });

  if (isLoading) return <Loader fullScreen text="Loading results..." />;
  if (!result) return null;

  return (
    <div className="page-container max-w-3xl mx-auto">
      <h1 className="page-title text-center">Quiz Results</h1>
      <p className="page-subtitle text-center">
        Here's how you performed along with AI feedback
      </p>

      {/* Result Summary Card */}
      <ResultCard result={result} />

      {/* Answer Review */}
      {result.answers?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Answer Review
          </h2>
          <div className="space-y-4">
            {result.answers.map((ans, index) => (
              <QuestionCard
                key={index}
                question={ans.question}
                index={index}
                selectedAnswer={ans.selectedAnswer}
                showResult={true}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizResult;