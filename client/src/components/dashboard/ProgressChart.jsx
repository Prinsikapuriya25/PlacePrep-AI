import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const ProgressChart = ({ categoryStats = [], type = "radar" }) => {
  const defaultData = [
    { category: "DSA", avgScore: 0 },
    { category: "OS", avgScore: 0 },
    { category: "DBMS", avgScore: 0 },
    { category: "Aptitude", avgScore: 0 },
    { category: "HR", avgScore: 0 },
    { category: "Networking", avgScore: 0 },
  ];

  const data =
    categoryStats.length > 0
      ? categoryStats.map((s) => ({
          category: s._id,
          avgScore: Math.round(s.avgScore),
          attempts: s.count,
        }))
      : defaultData;

  if (type === "bar") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Performance by Category
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e2e",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
            <Bar
              dataKey="avgScore"
              name="Avg Score (%)"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Topic Mastery Radar
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "#6b7280" }}
          />
          <Radar
            name="Score"
            dataKey="avgScore"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e1e2e",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ProgressChart;