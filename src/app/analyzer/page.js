"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadArea } from "@/components/analyzer/UploadArea";
import { Results } from "@/components/analyzer/Results";
import { useCredits } from "@/hooks/useCredits";
import styles from "./page.module.css";

export default function AnalyzerPage() {
  const { deductCredit } = useCredits();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = async (formData) => {
    console.log([...formData.entries()]);

    if (!deductCredit(100)) {
      alert("You are out of AI Tokens! Please upgrade to Pro in the top menu.");
      return;
    }

    setIsAnalyzing(true);
    setResults(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("API error:", err);
      alert(
        "Failed to analyze resume. Make sure your GEMINI_API_KEY is correct and active in .env.local",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <h1 className={styles.title}>
          Resume <span className="gradient-text">Analyzer</span>
        </h1>
        <p className={styles.subtitle}>
          Upload your resume to get instant AI-powered feedback, scoring, and
          actionable improvement suggestions.
        </p>
      </motion.div>

      {!results ? (
        <>
          <UploadArea
            onFileProcessed={handleFileUpload}
            isLoading={isAnalyzing}
          />
        </>
      ) : (
        <Results data={results} onReset={() => setResults(null)} />
      )}
    </div>
  );
}
