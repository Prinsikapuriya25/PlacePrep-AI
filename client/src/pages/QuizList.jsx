import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { getAllQuizzes } from "../api/axios";
import QuizCard from "../components/quiz/QuizCard";
import Loader from "../components/common/Loader";

const CATEGORIES = [
  "All",
  "DSA",
  "OS",
  "DBMS",
  "Aptitude",
  "HR",
  "Networking",
  "OOP",
  "Mixed",
];
const DIFFICULTIES = ["All", "easy", "medium", "hard", "mixed"];

const QuizList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["quizzes", category, difficulty],
    queryFn: async () => {
      const params = {};
      if (category !== "All") params.category = category;
      if (difficulty !== "All") params.difficulty = difficulty;
      const res = await getAllQuizzes(params);
      return res.data.data;
    },
  });

  const filtered = data?.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Practice Quizzes</h1>
      <p className="page-subtitle">
        Choose a quiz to test your knowledge and get AI feedback
      </p>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-gray-400 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  category === cat
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-gray-500">Difficulty:</span>
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize transition-all ${
                difficulty === diff
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      {isLoading ? (
        <Loader text="Loading quizzes..." />
      ) : filtered?.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No quizzes found
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try changing the filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered?.map((quiz, i) => (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <QuizCard quiz={quiz} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;