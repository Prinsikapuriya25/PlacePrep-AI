import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FileText, Trash2 } from "lucide-react";
import { getUserResumes, deleteResume } from "../api/axios";
import ResumeUpload from "../components/resume/ResumeUpload";
import ResumeAnalysis from "../components/resume/ResumeAnalysis";
import Loader from "../components/common/Loader";
import { formatDate } from "../utils/formatDate";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  const [selectedResume, setSelectedResume] = useState(null);

  const { data: resumes, isLoading, refetch } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      const res = await getUserResumes();
      return res.data.data;
    },
  });

 const handleUploadSuccess = (resume) => {
  refetch();
  setSelectedResume(resume);
  if (resume.aiScore > 0) {
    toast.success("Resume uploaded and analyzed automatically!");
  }
};

  const handleAnalysisComplete = (updatedResume) => {
    setSelectedResume(updatedResume);
    refetch();
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      toast.success("Resume deleted");
      if (selectedResume?._id === id) setSelectedResume(null);
      refetch();
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  return (
    <div className="page-container">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
          <FileText size={24} className="text-green-600" />
        </div>
        <h1 className="page-title mb-0">Resume Analyzer</h1>
      </div>
      <p className="page-subtitle">
        Upload your resume and get AI-powered ATS score and suggestions
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Upload + Resume List */}
        <div className="space-y-4">
          <ResumeUpload onUploadSuccess={handleUploadSuccess} />

          {/* Resume List */}
          {isLoading ? (
            <Loader text="Loading resumes..." />
          ) : resumes?.length > 0 ? (
            <div className="card">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Your Resumes
              </h3>
              <div className="space-y-2">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    onClick={() => setSelectedResume(resume)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      selectedResume?._id === resume._id
                        ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FileText size={18} className="text-primary-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {resume.fileName || "Resume"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(resume.createdAt)} •{" "}
                        {resume.aiScore > 0
                          ? `Score: ${resume.aiScore}`
                          : "Not analyzed"}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(resume._id);
                      }}
                      className="text-red-400 hover:text-red-600 flex-shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Right: Analysis */}
        <div className="lg:col-span-2">
          {selectedResume ? (
            <ResumeAnalysis
              resume={selectedResume}
              onAnalysisComplete={handleAnalysisComplete}
            />
          ) : (
            <div className="card flex flex-col items-center justify-center py-20 text-center">
              <FileText size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Upload or select a resume to analyze
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Get ATS score, keyword gaps and improvement tips
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;