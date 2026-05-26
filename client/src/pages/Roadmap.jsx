import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Loader2, Lightbulb, Target, BookOpen } from "lucide-react";
import { generateRoadmap } from "../api/axios";
import toast from "react-hot-toast";

const WEAK_TOPICS = [
  "DSA", "OS", "DBMS", "Networking", "OOP",
  "Aptitude", "System Design", "HR", "SQL",
];

const COMPANIES = [
  "Product Based (FAANG)",
  "Service Based (TCS/Infosys)",
  "Startup",
  "Core Technical",
  "Mixed",
];

const Roadmap = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [targetCompany, setTargetCompany] = useState("");
  const [timeframe, setTimeframe] = useState(4);
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleGenerate = async () => {
    if (selectedTopics.length === 0 || !targetCompany) {
      toast.error("Please select topics and target company");
      return;
    }
    try {
      setIsLoading(true);
      const res = await generateRoadmap({
        weakTopics: selectedTopics,
        targetCompany,
        timeframe,
      });
      setRoadmap(res.data.data);
      toast.success("Roadmap generated!");
    } catch (error) {
      toast.error("Failed to generate roadmap. Check OpenAI API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
          <Map size={24} className="text-orange-600" />
        </div>
        <h1 className="page-title mb-0">Study Roadmap</h1>
      </div>
      <p className="page-subtitle">
        Get a personalized AI study plan based on your weak areas
      </p>

      {!roadmap ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-2xl mx-auto"
        >
          {/* Weak Topics */}
          <div className="mb-5">
            <label className="input-label mb-2 block">
              Select Weak Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {WEAK_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`text-sm px-3 py-1.5 rounded-full font-medium transition-all ${
                    selectedTopics.includes(topic)
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Target Company */}
          <div className="mb-5">
            <label className="input-label">Target Company Type</label>
            <select
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="input-field"
            >
              <option value="">Select company type...</option>
              {COMPANIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe */}
          <div className="mb-6">
            <label className="input-label">
              Preparation Timeframe: {timeframe} weeks
            </label>
            <input
              type="range"
              min={1}
              max={12}
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              className="w-full accent-primary-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 week</span>
              <span>12 weeks</span>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || selectedTopics.length === 0 || !targetCompany}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating Roadmap...
              </>
            ) : (
              <>
                <Map size={18} />
                Generate My Roadmap
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
            <h2 className="text-2xl font-bold mb-1">{roadmap.title}</h2>
            <p className="text-white/80 text-sm">
              {timeframe}-week personalized plan for {targetCompany}
            </p>
          </div>

          {/* Weekly Plan */}
          <div className="space-y-4">
            {roadmap.weeks?.map((week, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-bold text-sm px-3 py-1 rounded-full">
                    Week {week.week}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {week.focus}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Topics */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                      <BookOpen size={12} /> Topics
                    </p>
                    <ul className="space-y-1">
                      {week.topics?.map((t, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                          • {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                      <Lightbulb size={12} /> Resources
                    </p>
                    <ul className="space-y-1">
                      {week.resources?.map((r, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                          • {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Goals */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                      <Target size={12} /> Goals
                    </p>
                    <ul className="space-y-1">
                      {week.goals?.map((g, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                          • {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips */}
          {roadmap.tips?.length > 0 && (
            <div className="card bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3 flex items-center gap-2">
                <Lightbulb size={18} /> Pro Tips
              </h3>
              <ul className="space-y-2">
                {roadmap.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-yellow-700 dark:text-yellow-300">
                    💡 {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regenerate */}
          <button
            onClick={() => setRoadmap(null)}
            className="btn-secondary w-full"
          >
            Generate New Roadmap
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Roadmap;