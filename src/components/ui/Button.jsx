"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className={styles.content}>{children}</span>
    </motion.button>
  );
};
