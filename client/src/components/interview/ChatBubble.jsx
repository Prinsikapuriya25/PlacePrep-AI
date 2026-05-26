import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

const ChatBubble = ({ message }) => {
  const isInterviewer = message.role === "interviewer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${
        isInterviewer ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center
        ${
          isInterviewer
            ? "bg-primary-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
      >
        {isInterviewer ? <Bot size={18} /> : <User size={18} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${
          isInterviewer
            ? "bg-white dark:bg-dark-100 text-gray-800 dark:text-gray-200 shadow-sm rounded-tl-none border border-gray-100 dark:border-gray-700"
            : "bg-primary-600 text-white rounded-tr-none"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
};

export default ChatBubble;