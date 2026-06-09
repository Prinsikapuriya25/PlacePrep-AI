import { useState, useMemo } from "react";
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
  Edit3,
  Search,
} from "lucide-react";
import {
  getAllUsers,
  getAllQuestions,
  getAllQuizzes,
  getAdminAnalytics,
  createQuestion,
  deleteQuestion,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  deleteUser,
} from "../api/axios";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

const TABS = ["Overview", "Questions", "Quiz Management", "Users", "Analytics"];
const CATEGORIES = ["DSA", "OS", "DBMS", "Aptitude", "HR", "Networking", "OOP"];
const DIFFICULTIES = ["easy", "medium", "hard"];

const emptyQuestionForm = {
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
};

const emptyQuizForm = {
  title: "",
  description: "",
  category: "DSA",
  difficulty: "medium",
  duration: 15,
  questions: [],
};

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [questionForm, setQuestionForm] = useState(emptyQuestionForm);
  const [quizForm, setQuizForm] = useState(emptyQuizForm);
  const [editQuizId, setEditQuizId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionSearch, setQuestionSearch] = useState("");
  const [questionCategory, setQuestionCategory] = useState("All");
  const [questionDifficulty, setQuestionDifficulty] = useState("All");
  const [quizSearch, setQuizSearch] = useState("");
  const [quizCategory, setQuizCategory] = useState("All");
  const [quizDifficulty, setQuizDifficulty] = useState("All");

  const queryClient = useQueryClient();

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await getAllUsers();
      return response.data.data;
    },
    enabled: ["Users", "Overview", "Analytics"].includes(activeTab),
  });

  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ["admin-questions"],
    queryFn: async () => {
      const response = await getAllQuestions();
      return response.data.data;
    },
    enabled: ["Questions", "Quiz Management", "Overview", "Analytics"].includes(
      activeTab,
    ),
  });

  const { data: quizzes, isLoading: quizzesLoading } = useQuery({
    queryKey: ["admin-quizzes"],
    queryFn: async () => {
      const response = await getAllQuizzes();
      return response.data.data;
    },
    enabled: ["Quiz Management", "Overview"].includes(activeTab),
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const response = await getAdminAnalytics();
      return response.data.data;
    },
    enabled: activeTab === "Analytics",
  });

  const visibleQuestions = useMemo(() => {
    if (!questions) return [];

    const filtered = questions.filter((item) => {
      const matchesSearch = item.text
        .toLowerCase()
        .includes(questionSearch.toLowerCase());
      const matchesCategory =
        questionCategory === "All" || item.category === questionCategory;
      const matchesDifficulty =
        questionDifficulty === "All" || item.difficulty === questionDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    

    return filtered;
  }, [questions, questionSearch, questionCategory, questionDifficulty]);

  const visibleQuizzes = useMemo(() => {
    if (!quizzes) return [];
    return quizzes.filter((quiz) => {
      const matchesSearch = quiz.title
        .toLowerCase()
        .includes(quizSearch.toLowerCase());
      const matchesCategory =
        quizCategory === "All" || quiz.category === quizCategory;
      const matchesDifficulty =
        quizDifficulty === "All" || quiz.difficulty === quizDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [quizzes, quizSearch, quizCategory, quizDifficulty]);

  const handleQuestionSave = async () => {
    if (!questionForm.text || !questionForm.answer) {
      toast.error("Please add question text and a correct answer.");
      return;
    }

    try {
      setIsSubmitting(true);
    

      await createQuestion(questionForm);
      toast.success("Question saved successfully.");
      queryClient.invalidateQueries(["admin-questions"]);
      setShowQuestionModal(false);
      setQuestionForm(emptyQuestionForm);
    } catch (error) {
      toast.error("Unable to save question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      toast.success("Question removed.");
      queryClient.invalidateQueries(["admin-questions"]);
    } catch (error) {
      toast.error("Failed to remove question.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted.");
      queryClient.invalidateQueries(["admin-users"]);
    } catch (error) {
      toast.error("Unable to delete user.");
    }
  };

  const handleQuizSave = async () => {
    if (!quizForm.title || !quizForm.questions.length) {
      toast.error("Quiz must have a title and at least one question.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        title: quizForm.title,
        description: quizForm.description,
        category: quizForm.category,
        difficulty: quizForm.difficulty,
        duration: quizForm.duration,
        questions: quizForm.questions,
      };

      if (editQuizId) {
        await updateQuiz(editQuizId, payload);
        toast.success("Quiz updated successfully.");
      } else {
        await createQuiz(payload);
        toast.success("Quiz created successfully.");
      }

      queryClient.invalidateQueries(["admin-quizzes"]);
      setShowQuizModal(false);
      setEditQuizId(null);
      setQuizForm(emptyQuizForm);
    } catch (error) {
      toast.error("Quiz save failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuiz = async (id) => {
    try {
      await deleteQuiz(id);
      toast.success("Quiz deleted.");
      queryClient.invalidateQueries(["admin-quizzes"]);
    } catch (error) {
      toast.error("Failed to delete quiz.");
    }
  };

  const handleEditQuiz = (quiz) => {
    setEditQuizId(quiz._id);
    setQuizForm({
      title: quiz.title || "",
      description: quiz.description || "",
      category: quiz.category || "DSA",
      difficulty: quiz.difficulty || "medium",
      duration: quiz.duration || 15,
      questions: quiz.questions?.map((question) => question._id) || [],
    });
    setShowQuizModal(true);
  };

  return (
    <div className="page-container pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-primary-100 px-4 py-2 text-primary-700">
            <Settings size={20} /> Admin Dashboard
          </div>
          <h1 className="page-title mt-4 mb-1">PlacePrep AI Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Securely manage quiz content, student accounts, and analytics for
            better placement preparation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setActiveTab("Overview");
            }}
            className="btn-secondary"
          >
            Overview
          </button>
          <button
            onClick={() => {
              setActiveTab("Analytics");
            }}
            className="btn-secondary"
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-200 dark:text-gray-300 dark:hover:bg-dark-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
              <span>Total Students</span>
              <Users size={20} className="text-indigo-500" />
            </div>
            <p className="text-5xl font-semibold text-gray-900 dark:text-white">
              {users?.length || 0}
            </p>
          </div>

          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
              <span>Total Questions</span>
              <BookOpen size={20} className="text-emerald-500" />
            </div>
            <p className="text-5xl font-semibold text-gray-900 dark:text-white">
              {questions?.length || 0}
            </p>
          </div>

          <div className="card p-6">
            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
              <span>Total Quizzes</span>
              <BarChart2 size={20} className="text-purple-500" />
            </div>
            <p className="text-5xl font-semibold text-gray-900 dark:text-white">
              {quizzes?.length || 0}
            </p>
          </div>
        </div>
      )}

      {activeTab === "Questions" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="grid gap-3 md:grid-cols-3 flex-1">
              <label className="block">
                <span className="text-sm text-gray-500">Search</span>
                <div className="relative mt-2">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="search"
                    value={questionSearch}
                    onChange={(e) => setQuestionSearch(e.target.value)}
                    placeholder="Search question text"
                    className="input-field pl-10"
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-sm text-gray-500">Category</span>
                <select
                  value={questionCategory}
                  onChange={(e) => setQuestionCategory(e.target.value)}
                  className="input-field mt-2"
                >
                  <option value="All">All categories</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-gray-500">Difficulty</span>
                <select
                  value={questionDifficulty}
                  onChange={(e) => setQuestionDifficulty(e.target.value)}
                  className="input-field mt-2"
                >
                  <option value="All">All difficulties</option>
                  {DIFFICULTIES.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="btn-primary inline-flex items-center gap-2 px-4 py-3"
            >
              <Plus size={16} /> Add Question
            </button>
          </div>

          {questionsLoading ? (
            <Loader text="Loading questions..." />
          ) : !visibleQuestions.length ? (
            <div className="card p-6 text-center text-gray-500 dark:text-gray-400">
              No matching questions found.
            </div>
          ) : (
            <div className="grid gap-4">
              {visibleQuestions.map((question) => (
                <div
                  key={question._id}
                  className="card p-5 sm:flex sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {question.text}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="badge-category">
                        {question.category}
                      </span>
                      <span
                        className={
                          question.difficulty === "easy"
                            ? "badge-easy"
                            : question.difficulty === "medium"
                              ? "badge-medium"
                              : "badge-hard"
                        }
                      >
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="rounded-full border border-red-200 bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "Quiz Management" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="grid gap-3 md:grid-cols-3 flex-1">
              <input
                type="search"
                value={quizSearch}
                onChange={(e) => setQuizSearch(e.target.value)}
                placeholder="Search quizzes"
                className="input-field"
              />
              <select
                className="input-field"
                value={quizCategory}
                onChange={(e) => setQuizCategory(e.target.value)}
              >
                <option value="All">All categories</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="input-field"
                value={quizDifficulty}
                onChange={(e) => setQuizDifficulty(e.target.value)}
              >
                <option value="All">All difficulties</option>
                {DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setEditQuizId(null);
                setQuizForm(emptyQuizForm);
                setShowQuizModal(true);
              }}
              className="btn-primary inline-flex items-center gap-2 px-4 py-3"
            >
              <Plus size={16} /> New Quiz
            </button>
          </div>

          {quizzesLoading ? (
            <Loader text="Loading quizzes..." />
          ) : !visibleQuizzes.length ? (
            <div className="card p-6 text-center text-gray-500 dark:text-gray-400">
              No quizzes found. Create a new quiz to begin.
            </div>
          ) : (
            <div className="space-y-4">
              {visibleQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="card p-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {quiz.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {quiz.description || "No description provided."}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="badge-category">{quiz.category}</span>
                      <span
                        className={
                          quiz.difficulty === "easy"
                            ? "badge-easy"
                            : quiz.difficulty === "medium"
                              ? "badge-medium"
                              : "badge-hard"
                        }
                      >
                        {quiz.difficulty}
                      </span>
                      <span className="badge-category">
                        {quiz.questions?.length || 0} questions
                      </span>
                      <span className="badge-category">
                        {quiz.duration} min
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    <button
                      onClick={() => handleEditQuiz(quiz)}
                      className="btn-secondary px-4 py-2"
                    >
                      <Edit3 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "Users" && (
        <div>
          {usersLoading ? (
            <Loader text="Loading users..." />
          ) : !users?.length ? (
            <div className="card p-6 text-center text-gray-500 dark:text-gray-400">
              There are no student accounts yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="card p-5 sm:flex sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white text-lg font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm text-gray-600 dark:text-gray-300 text-right">
                    <span>Average: {user.progress?.averageScore || 0}%</span>
                    <span>Attempts: {user.progress?.totalQuizzes || 0}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn-secondary px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "Analytics" && (
        <div className="space-y-6">
          {analyticsLoading ? (
            <Loader text="Loading analytics..." />
          ) : (
            <>
              <div className="grid gap-6 xl:grid-cols-4">
                <div className="card p-6">
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">
                    {analytics?.totalUsers || 0}
                  </p>
                </div>
                <div className="card p-6">
                  <p className="text-sm text-gray-500">Quiz Attempts</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">
                    {analytics?.totalAttempts || 0}
                  </p>
                </div>
                <div className="card p-6">
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">
                    {analytics?.averageScore || 0}%
                  </p>
                </div>
                <div className="card p-6">
                  <p className="text-sm text-gray-500">Total Questions</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">
                    {analytics?.totalQuestions || 0}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-3">
                <div className="card p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Top Performers
                  </h2>
                  {analytics?.topPerformers?.length ? (
                    <div className="space-y-3">
                      {analytics.topPerformers.map((student) => (
                        <div
                          key={student._id}
                          className="rounded-2xl bg-gray-50 dark:bg-dark-200 p-3"
                        >
                          <p className="font-medium text-gray-900 dark:text-white">
                            {student.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {student.email}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Average Score: {student.progress?.averageScore || 0}
                            %
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      There is no performance data yet.
                    </p>
                  )}
                </div>

                <div className="card p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Category Performance
                  </h2>
                  {analytics?.categoryPerformance?.length ? (
                    <div className="space-y-3">
                      {analytics.categoryPerformance.map((item) => (
                        <div
                          key={item._id}
                          className="rounded-2xl bg-gray-50 dark:bg-dark-200 p-3"
                        >
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item._id}
                          </p>
                          <p className="text-sm text-gray-500">
                            Attempts: {item.attempts}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Avg Score: {Math.round(item.averageScore || 0)}%
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No categorized quiz results available yet.
                    </p>
                  )}
                </div>

                <div className="card p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    User Growth
                  </h2>
                  {analytics?.userGrowth?.length ? (
                    <div className="space-y-3">
                      {analytics.userGrowth.map((item) => (
                        <div
                          key={`${item._id.year}-${item._id.month}`}
                          className="rounded-2xl bg-gray-50 dark:bg-dark-200 p-3"
                        >
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item._id.month}/{item._id.year}
                          </p>
                          <p className="text-sm text-gray-500">
                            New students: {item.count}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No growth data available.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {(showQuestionModal || showQuizModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          {showQuestionModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl rounded-3xl bg-white dark:bg-dark-100 p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New Question
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Create a question for quizzes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowQuestionModal(false);
                    setQuestionForm(emptyQuestionForm);
                  }}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="input-label">Question text</label>
                  <textarea
                    rows={3}
                    className="input-field resize-none"
                    value={questionForm.text}
                    onChange={(e) =>
                      setQuestionForm({ ...questionForm, text: e.target.value })
                    }
                    placeholder="Write the question prompt"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="input-label">Category</label>
                    <select
                      className="input-field"
                      value={questionForm.category}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          category: e.target.value,
                        })
                      }
                    >
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">Difficulty</label>
                    <select
                      className="input-field"
                      value={questionForm.difficulty}
                      onChange={(e) =>
                        setQuestionForm({
                          ...questionForm,
                          difficulty: e.target.value,
                        })
                      }
                    >
                      {DIFFICULTIES.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="input-label">Options</label>
                  <div className="grid gap-3">
                    {questionForm.options.map((option, index) => (
                      <input
                        key={option.label}
                        type="text"
                        value={option.value}
                        onChange={(e) => {
                          const nextOptions = [...questionForm.options];
                          nextOptions[index].value = e.target.value;
                          setQuestionForm({
                            ...questionForm,
                            options: nextOptions,
                          });
                        }}
                        placeholder={`Option ${option.label}`}
                        className="input-field"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="input-label">Correct answer</label>
                  <select
                    className="input-field"
                    value={questionForm.answer}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        answer: e.target.value,
                      })
                    }
                  >
                    <option value="">Select correct answer</option>
                    {questionForm.options
                      .filter((option) => option.value)
                      .map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}. {option.value}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">Explanation (optional)</label>
                  <textarea
                    rows={2}
                    className="input-field resize-none"
                    value={questionForm.explanation}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        explanation: e.target.value,
                      })
                    }
                    placeholder="Brief explanation for the correct answer"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuestionModal(false);
                    setQuestionForm(emptyQuestionForm);
                  }}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleQuestionSave}
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Save
                    </span>
                  ) : (
                    "Save Question"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {showQuizModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-3xl rounded-3xl bg-white dark:bg-dark-100 p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editQuizId ? "Edit Quiz" : "Create Quiz"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Build quizzes and assign questions to them.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowQuizModal(false);
                    setEditQuizId(null);
                    setQuizForm(emptyQuizForm);
                  }}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="input-label">Quiz Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={quizForm.title}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, title: e.target.value })
                    }
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <label className="input-label">Description</label>
                  <textarea
                    rows={3}
                    className="input-field resize-none"
                    value={quizForm.description}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, description: e.target.value })
                    }
                    placeholder="Describe the quiz purpose"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <select
                    className="input-field"
                    value={quizForm.category}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, category: e.target.value })
                    }
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    className="input-field"
                    value={quizForm.difficulty}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, difficulty: e.target.value })
                    }
                  >
                    {DIFFICULTIES.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={5}
                    className="input-field"
                    value={quizForm.duration}
                    onChange={(e) =>
                      setQuizForm({
                        ...quizForm,
                        duration: Number(e.target.value),
                      })
                    }
                    placeholder="Duration (minutes)"
                  />
                </div>
                <div>
                  <label className="input-label">Assign Questions</label>
                  <div className="grid gap-2 max-h-72 overflow-y-auto rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-dark-200">
                    {questions?.length ? (
                      questions.map((question) => (
                        <label
                          key={question._id}
                          className="flex cursor-pointer items-start gap-3 rounded-xl bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-primary-50 dark:bg-dark-100 dark:hover:bg-dark-300"
                        >
                          <input
                            type="checkbox"
                            checked={quizForm.questions.includes(question._id)}
                            onChange={() => {
                              const selected = quizForm.questions.includes(
                                question._id,
                              )
                                ? quizForm.questions.filter(
                                    (id) => id !== question._id,
                                  )
                                : [...quizForm.questions, question._id];
                              setQuizForm({ ...quizForm, questions: selected });
                            }}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600"
                          />
                          <span>{question.text}</span>
                        </label>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Load questions to assign quiz content.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuizModal(false);
                    setEditQuizId(null);
                    setQuizForm(emptyQuizForm);
                  }}
                  className="btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleQuizSave}
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Save Quiz
                    </span>
                  ) : editQuizId ? (
                    "Update Quiz"
                  ) : (
                    "Create Quiz"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
