import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Info } from "lucide-react";
import InterviewPanel from "../components/interview/InterviewPanel";

const ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
];

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

const MockInterview = () => {
  const [jobRole, setJobRole] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    if (!jobRole) return;
    setIsStarted(true);
  };

  return (
    <div className="page-container max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
          <Mic size={24} className="text-purple-600" />
        </div>
        <h1 className="page-title mb-0">AI Mock Interview</h1>
      </div>
      <p className="page-subtitle">
        Practice with our AI interviewer and get instant feedback
      </p>

      {!isStarted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-lg mx-auto mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Setup Your Interview
          </h3>

          {/* Job Role */}
          <div className="mb-4">
            <label className="input-label">Target Job Role</label>
            <select
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="input-field"
            >
              <option value="">Select a role...</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="input-label">Difficulty Level</label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
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

          {/* Info */}
          <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-5">
            <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-600 dark:text-blue-400">
              The AI interviewer will ask you 5 questions relevant to your
              selected role and provide feedback after each answer.
            </p>
          </div>

          <button
            onClick={handleStart}
            disabled={!jobRole}
            className="btn-primary w-full py-3 disabled:opacity-50"
          >
            Proceed to Interview
          </button>
        </motion.div>
      ) : (
        <InterviewPanel
          jobRole={jobRole}
          difficulty={difficulty}
          onComplete={() => {}}
        />
      )}
    </div>
  );
};

export default MockInterview;