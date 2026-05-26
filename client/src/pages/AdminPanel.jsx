import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Settings,
  Plus,
  Trash2,
  Users,
  BookOpen,
  BarChart2,
  X,
  Loader2,
} from "lucide-react";
import {
  getAllUsers,
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  deleteUser,
} from "../api/axios";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

const TABS = ["Overview", "Questions", "Users"];
const CATEGORIES = ["DSA", "OS", "DBMS", "Aptitude", "HR", "Networking", "OOP"];
const DIFFICULTIES = ["easy", "medium", "hard"];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    text: "",
    category: "DSA",
    difficulty: "medium",
    answer: "",
    explanation: "",
    options: [
      { label: "A", value: "" },
      { label: "B", value: "" },
      { label: "C", value: "" },
      { label: "D", value: "" },
    ],
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await getAllUsers();
      return res.data.data;
    },
    enabled: activeTab === "Users" || activeTab === "Overview",
  });

  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ["admin-questions"],
    queryFn: async () => {
      const res = await getAllQuestions();
      return res.data.data;
    },
    enabled: activeTab === "Questions" || activeTab === "Overview",
  });

  const handleAddQuestion = async () => {
    if (!form.text || !form.answer) {
      toast.error("Question text and answer are required");
      return;
    }
    try {
      setIsSubmitting(true);
      await createQuestion(form);
      toast.success("Question added successfully!");
      queryClient.invalidateQueries(["admin-questions"]);
      setShowAddQuestion(false);
      setForm({
        text: "",
        category: "DSA",
        difficulty: "medium",
        answer: "",
        explanation: "",
        options: [
          { label: "A", value: "" },
          { label: "B", value: "" },
          { label: "C", value: "" },
          { label: "D", value: "" },
        ],
      });
    } catch (error) {
      toast.error("Failed to add question");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      toast.success("Question deleted");
      queryClient.invalidateQueries(["admin-questions"]);
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted");
      queryClient.invalidateQueries(["admin-users"]);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="page-container">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          <Settings size={24} className="text-gray-600 dark:text-gray-400" />
        </div>
        <div>
          <h1 className="page-title mb-0">Admin Panel</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage questions, users and platform content
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <Users size={32} className="text-blue-500 mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
              {users?.length || 0}
            </h3>
            <p className="text-gray-500 text-sm">Total Students</p>
          </div>
          <div className="card text-center">
            <BookOpen size={32} className="text-green-500 mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
              {questions?.length || 0}
            </h3>
            <p className="text-gray-500 text-sm">Total Questions</p>
          </div>
          <div className="card text-center">
            <BarChart2 size={32} className="text-purple-500 mx-auto mb-2" />
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
              {CATEGORIES.length}
            </h3>
            <p className="text-gray-500 text-sm">Categories</p>
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === "Questions" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {questions?.length || 0} questions total
            </p>
            <button
              onClick={() => setShowAddQuestion(true)}
              className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"
            >
              <Plus size={16} /> Add Question
            </button>
          </div>

          {questionsLoading ? (
            <Loader text="Loading questions..." />
          ) : (
            <div className="space-y-3">
              {questions?.map((q, index) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="card flex items-start gap-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white mb-1">
                      {q.text}
                    </p>
                    <div className="flex gap-2">
                      <span className="badge-category">{q.category}</span>
                      <span
                        className={
                          q.difficulty === "easy"
                            ? "badge-easy"
                            : q.difficulty === "medium"
                            ? "badge-medium"
                            : "badge-hard"
                        }
                      >
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(q._id)}
                    className="text-red-400 hover:text-red-600 flex-shrink-0 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "Users" && (
        <div>
          {usersLoading ? (
            <Loader text="Loading users..." />
          ) : (
            <div className="space-y-3">
              {users?.map((u, index) => (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {u.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white text-sm">
                      {u.name}
                    </p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary-600">
                      {u.progress?.averageScore || 0}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {u.progress?.totalQuizzes || 0} quizzes
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Question Modal */}
      {showAddQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-dark-100 rounded-2xl p-6 w-full max-w-lg shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Add New Question
              </h3>
              <button
                onClick={() => setShowAddQuestion(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Question Text */}
              <div>
                <label className="input-label">Question Text</label>
                <textarea
                  rows={3}
                  placeholder="Enter question..."
                  value={form.text}
                  onChange={(e) =>
                    setForm({ ...form, text: e.target.value })
                  }
                  className="input-field resize-none"
                />
              </div>

              {/* Category + Difficulty */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="input-label">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="input-field"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">Difficulty</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) =>
                      setForm({ ...form, difficulty: e.target.value })
                    }
                    className="input-field"
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="input-label">Options</label>
                <div className="space-y-2">
                  {form.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-500 w-6">
                        {opt.label}.
                      </span>
                      <input
                        type="text"
                        placeholder={`Option ${opt.label}`}
                        value={opt.value}
                        onChange={(e) => {
                          const newOptions = [...form.options];
                          newOptions[i].value = e.target.value;
                          setForm({ ...form, options: newOptions });
                        }}
                        className="input-field flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Correct Answer */}
              <div>
                <label className="input-label">Correct Answer</label>
                <select
                  value={form.answer}
                  onChange={(e) =>
                    setForm({ ...form, answer: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="">Select correct answer...</option>
                  {form.options
                    .filter((o) => o.value)
                    .map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}. {opt.value}
                      </option>
                    ))}
                </select>
              </div>

              {/* Explanation */}
              <div>
                <label className="input-label">
                  Explanation (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Explain the correct answer..."
                  value={form.explanation}
                  onChange={(e) =>
                    setForm({ ...form, explanation: e.target.value })
                  }
                  className="input-field resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowAddQuestion(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                disabled={isSubmitting}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add Question
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;