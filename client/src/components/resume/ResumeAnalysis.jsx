import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  XCircle,
  Loader2,
  Star,
  Tag,
  RefreshCw,
} from "lucide-react";
import { analyzeResume } from "../../api/axios";
import toast from "react-hot-toast";

const ResumeAnalysis = ({ resume, onAnalysisComplete }) => {
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showManual, setShowManual] = useState(false);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const res = await analyzeResume(resume._id, { resumeText });
      toast.success("Resume analyzed successfully!");
      if (onAnalysisComplete) onAnalysisComplete(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Analysis failed, please try again"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Show analysis results if already analyzed
  if (resume.aiScore > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Score Card */}
        <div className="card text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            ATS Score
          </h3>
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={
                  resume.aiScore >= 80
                    ? "#22c55e"
                    : resume.aiScore >= 60
                    ? "#eab308"
                    : "#ef4444"
                }
                strokeWidth="10"
                strokeDasharray={`${(resume.aiScore / 100) * 251} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-2xl font-bold ${getScoreColor(resume.aiScore)}`}
              >
                {resume.aiScore}
              </span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm px-4">
            {resume.overallFeedback}
          </p>

          {/* Re-analyze button */}
          <button
            onClick={() => setShowManual(true)}
            className="mt-4 text-sm text-primary-600 hover:underline flex items-center gap-1 mx-auto"
          >
            <RefreshCw size={14} /> Re-analyze
          </button>
        </div>

        {/* Manual re-analyze */}
        {showManual && (
          <div className="card">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Paste resume text to re-analyze:
            </p>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              rows={6}
              className="input-field resize-none text-sm mb-3"
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeText.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Star size={18} />
                  Re-Analyze
                </>
              )}
            </button>
          </div>
        )}

        {/* Sections Check */}
        <div className="card">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
            Resume Sections
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(resume.sections || {}).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                {value ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <XCircle size={16} className="text-red-500" />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace("has", "")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="card">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Tag size={16} /> Keywords
          </h4>
          <div className="mb-3">
            <p className="text-xs font-medium text-green-600 mb-2">
              ✅ Found Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {resume.keywords?.found?.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-red-600 mb-2">
              ❌ Missing Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {resume.keywords?.missing?.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="card">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Star size={16} /> Improvement Suggestions
          </h4>
          <div className="space-y-3">
            {resume.suggestions?.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {s.category}
                </span>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {s.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Show manual input if auto-analysis didn't happen
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center gap-2 mb-2">
        <FileText size={20} className="text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Analyze Resume
        </h3>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          ⚠️ Auto-analysis failed or resume text could not be extracted.
          Please paste your resume text below for manual analysis.
        </p>
      </div>

      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume content here... (Copy all text from your resume)"
        rows={10}
        className="input-field resize-none text-sm mb-4"
      />

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !resumeText.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isAnalyzing ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Analyzing with AI...
          </>
        ) : (
          <>
            <Star size={18} />
            Analyze Resume
          </>
        )}
      </button>
    </motion.div>
  );
};

export default ResumeAnalysis;