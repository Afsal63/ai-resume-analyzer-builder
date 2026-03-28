"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.css";

export const Card = ({ children, className = '', hoverable = false, ...props }) => {
  return (
    <motion.div 
      className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`}
      whileHover={hoverable ? { translateY: -4 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};
