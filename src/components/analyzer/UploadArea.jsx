"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, File, AlertCircle, Loader2 } from "lucide-react";
import styles from "./UploadArea.module.css";
import { Card } from "../ui/Card";

export const UploadArea = ({ onFileProcessed, isLoading }) => {
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      onFileProcessed(formData);
    } catch (err) {
      setError(err.message || "Failed to process file");
    }
  }, [onFileProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <Card className={styles.uploadCard}>
      <div 
        {...getRootProps()} 
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${isLoading ? styles.disabled : ''}`}
      >
        <input {...getInputProps()} />
        
        {isLoading ? (
          <div className={styles.content}>
            <Loader2 size={48} className={styles.spinner} color="var(--accent-primary)" />
            <h3>Analyzing your Resume...</h3>
            <p>Our AI is extracting insights. This may take a few seconds.</p>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.iconWrapper}>
              <UploadCloud size={32} color="var(--accent-secondary)" />
            </div>
            <h3>{isDragActive ? "Drop your resume here" : "Upload your resume (PDF)"}</h3>
            <p>Drag & drop your PDF here, or click to browse files.</p>
          </div>
        )}
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={styles.error}
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}
    </Card>
  );
};
