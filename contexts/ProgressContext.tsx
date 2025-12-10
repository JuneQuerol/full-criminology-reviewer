'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext(undefined);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (quizSlug, quizData) => {
    const newProgress = { ...progress, [quizSlug]: quizData };
    setProgress(newProgress);
    localStorage.setItem('quizProgress', JSON.stringify(newProgress));
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
