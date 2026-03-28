"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Zap, X } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { useCredits } from "@/hooks/useCredits";

export const Navbar = () => {
  const router = useRouter();
  const { credits, isLoaded, addCredits } = useCredits();
  const [showModal, setShowModal] = useState(false);

  const handleUpgrade = () => {
    // Simulated successful Stripe checkout 
    addCredits(50);
    setShowModal(false);
    alert("Payment successful! You now have 50 extra AI tokens.");
  };

  return (
    <>
      <motion.nav 
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            <div className={styles.iconWrapper}>
              <Sparkles size={18} className={styles.icon} />
            </div>
            <span className="gradient-text">NovaResume Ai</span>
          </Link>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Pricing</Link>
            <Link href="/analyzer" className={styles.link}>Analyzer</Link>
            <Link href="/builder" className={styles.link}>Builder</Link>
            
            {/* SaaS Tokens Badge */}
            {isLoaded && (
              <div 
                className={styles.creditsBadge} 
                onClick={() => setShowModal(true)}
                title="Your AI Generation Tokens"
              >
                <Zap size={14} color="var(--warning)" />
                <span>{credits}</span>
              </div>
            )}

            <Button variant="primary" size="md" onClick={() => router.push('/builder')}>
              <FileText size={16} /> Create Resume
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showModal && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
              <div className={styles.modalIcon}>
                <Zap size={32} color="var(--warning)" />
              </div>
              <h2>Upgrade to Pro</h2>
              <p>You currently have <strong>{credits}</strong> AI tokens remaining.</p>
              <p className={styles.modalSub}>Unlock 50 more AI tokens to generate bullet points and analyze resumes instantly.</p>
              
              <div className={styles.pricingBox}>
                <span className={styles.price}>$9.99</span>
                <span className={styles.priceOnetime}> / one-time</span>
              </div>

              <Button variant="primary" className={styles.upgradeBtn} onClick={handleUpgrade}>
                Pay with Stripe (Simulated)
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
