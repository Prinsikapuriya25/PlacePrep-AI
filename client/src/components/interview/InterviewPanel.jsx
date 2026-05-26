import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, StopCircle } from "lucide-react";
import ChatBubble from "./ChatBubble";
import { startInterview, answerInterview } from "../../api/axios";
import toast from "react-hot-toast";

const InterviewPanel = ({ jobRole, difficulty, onComplete }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStart = async () => {
    try {
      setIsLoading(true);
      const res = await startInterview({ jobRole, difficulty });
      const interviewerMessage = {
        role: "interviewer",
        content: res.data.data.message,
      };
      setMessages([interviewerMessage]);
      setIsStarted(true);
      setQuestionNumber(1);
    } catch (error) {
      toast.error("Failed to start interview. Check your OpenAI API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAnswer = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const res = await answerInterview({
        messages: [...messages, userMessage],
        userAnswer: userInput,
        questionNumber,
      });

      const interviewerMessage = {
        role: "interviewer",
        content: res.data.data.message,
      };

      setMessages((prev) => [...prev, interviewerMessage]);
      setQuestionNumber((prev) => prev + 1);

      if (res.data.data.isComplete) {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    } catch (error) {
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendAnswer();
    }
  };

  // Not started yet
  if (!isStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center py-12"
      >
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎙️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Ready for your Mock Interview?
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
          Role: <span className="font-semibold text-primary-600">{jobRole}</span>
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Difficulty:{" "}
          <span className="font-semibold text-primary-600 capitalize">
            {difficulty}
          </span>
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mb-6 max-w-sm mx-auto">
          You will be asked 5 questions by an AI interviewer. Answer each
          question thoughtfully. Press Enter or click Send to submit.
        </p>
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="btn-primary px-8 py-3"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Starting...
            </span>
          ) : (
            "Start Interview"
          )}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="card flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Mock Interview — {jobRole}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Question {Math.min(questionNumber, 5)} of 5 •{" "}
            <span className="capitalize">{difficulty}</span>
          </p>
        </div>
        {isComplete && (
          <span className="badge-easy text-xs px-3 py-1">
            ✅ Interview Complete
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Loader2 size={16} className="animate-spin" />
            Interviewer is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!isComplete && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <div className="flex gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer... (Enter to send)"
              rows={2}
              disabled={isLoading || !isStarted}
              className="input-field resize-none text-sm"
            />
            <button
              onClick={handleSendAnswer}
              disabled={isLoading || !userInput.trim()}
              className="btn-primary px-4 flex items-center justify-center flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      )}

      {/* Complete Message */}
      {isComplete && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Interview session complete! Review the feedback above.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewPanel;