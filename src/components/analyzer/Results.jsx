"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import styles from './Results.module.css';

export const Results = ({ data, onReset }) => {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.resultsContainer}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Analysis Complete</h2>
        <Button variant="ghost" onClick={onReset}>
          <RefreshCw size={16} /> Analyze Another
        </Button>
      </div>

      <div className={styles.scoreSection}>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreValue}>{data.score}</span>
          <span className={styles.scoreLabel}>/100</span>
        </div>
        <div className={styles.scoreText}>
          <h3>{data.score >= 80 ? "Great Resume!" : data.score >= 60 ? "Good, but needs work." : "Needs improvement."}</h3>
          <p>{data.summary}</p>
        </div>
      </div>

      <div className={styles.grid}>
        <Card className={styles.strengthsCard}>
          <h3 className={styles.cardTitle}><CheckCircle color="var(--success)" size={20} /> Key Strengths</h3>
          <ul className={styles.list}>
            {data.strengths?.map((strength, i) => (
              <li key={i}>{strength}</li>
            ))}
          </ul>
        </Card>

        <Card className={styles.weaknessesCard}>
          <h3 className={styles.cardTitle}><XCircle color="var(--danger)" size={20} /> Areas to Improve</h3>
          <ul className={styles.list}>
            {data.weaknesses?.map((weakness, i) => (
              <li key={i}>{weakness}</li>
            ))}
          </ul>
        </Card>
      </div>

      {data.suggestions?.length > 0 && (
        <Card className={styles.suggestionsCard}>
          <h3 className={styles.cardTitle}>Actionable Suggestions</h3>
          <ul className={styles.suggestionList}>
            {data.suggestions.map((suggestion, i) => (
              <li key={i}>
                <ArrowRight size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '4px' }}/>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </motion.div>
  );
};
