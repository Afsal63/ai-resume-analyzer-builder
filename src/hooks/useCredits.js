"use client";
import { useState, useEffect } from 'react';

const FREE_CREDITS = 5; // Generous starting amount for SaaS demo

export function useCredits() {
  const [credits, setCredits] = useState(FREE_CREDITS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const syncCredits = () => {
      const stored = localStorage.getItem('nova_resume_credits');
      if (stored !== null) {
        setCredits(parseInt(stored, 10));
      }
    };

    const stored = localStorage.getItem('nova_resume_credits');
    if (stored !== null) {
      setCredits(parseInt(stored, 10));
    } else {
      localStorage.setItem('nova_resume_credits', FREE_CREDITS.toString());
    }
    setIsLoaded(true);

    window.addEventListener('storage', syncCredits);
    window.addEventListener('creditsUpdated', syncCredits);

    return () => {
      window.removeEventListener('storage', syncCredits);
      window.removeEventListener('creditsUpdated', syncCredits);
    };
  }, []);

  const updateCredits = (newBalance) => {
    setCredits(newBalance);
    localStorage.setItem('nova_resume_credits', newBalance.toString());
    window.dispatchEvent(new Event('creditsUpdated'));
  };

  const deductCredit = (amount = 1) => {
    const currentCredits = parseInt(localStorage.getItem('nova_resume_credits') || FREE_CREDITS, 10);
    if (currentCredits >= amount) {
      updateCredits(currentCredits - amount);
      return true;
    }
    return false;
  };

  const addCredits = (amount) => {
    const currentCredits = parseInt(localStorage.getItem('nova_resume_credits') || FREE_CREDITS, 10);
    updateCredits(currentCredits + amount);
  };

  return { credits, deductCredit, addCredits, isLoaded };
}
