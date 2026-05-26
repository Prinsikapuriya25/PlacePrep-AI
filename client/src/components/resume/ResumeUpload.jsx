import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { uploadResume } from "../../api/axios";
import toast from "react-hot-toast";

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile?.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }
    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const res = await uploadResume(formData);
      toast.success("Resume uploaded successfully!");
      if (onUploadSuccess) onUploadSuccess(res.data.data);
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Upload Resume
      </h3>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${
            isDragging
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files[0])}
        />

        {file ? (
          <div className="flex flex-col items-center gap-2">
            <FileText size={40} className="text-primary-600" />
            <p className="font-medium text-gray-800 dark:text-white">
              {file.name}
            </p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="flex items-center gap-1 text-red-500 text-sm hover:text-red-600 mt-1"
            >
              <X size={14} /> Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={40} className="text-gray-400" />
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Drag & drop your resume here
            </p>
            <p className="text-sm text-gray-500">or click to browse</p>
            <p className="text-xs text-gray-400 mt-1">PDF only • Max 5MB</p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {file && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleUpload}
          disabled={isUploading}
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              Upload Resume
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
};

export default ResumeUpload;