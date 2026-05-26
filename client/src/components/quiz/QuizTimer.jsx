import { useState, useEffect, useCallback } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { formatTime } from "../../utils/scoreHelper";

const QuizTimer = ({ duration, onTimeUp, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const handleTimeUp = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (onTick) onTick(duration * 60 - newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleTimeUp, duration, onTick]);

  const isWarning = timeLeft <= 60;
  const isDanger = timeLeft <= 30;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg
        ${
          isDanger
            ? "bg-red-100 dark:bg-red-900/30 text-red-600 animate-pulse"
            : isWarning
            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600"
            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        }`}
    >
      {isDanger ? (
        <AlertTriangle size={20} className="text-red-500" />
      ) : (
        <Clock size={20} />
      )}
      {formatTime(timeLeft)}
    </div>
  );
};

export default QuizTimer;