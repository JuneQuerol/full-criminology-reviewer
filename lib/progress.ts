// lib/progress.ts

const isBrowser = () => typeof window !== 'undefined';

// --- Module Progress ---

export const saveModuleProgress = (moduleId: string, completed: boolean) => {
  if (isBrowser()) {
    const progress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
    progress[moduleId] = completed;
    localStorage.setItem('moduleProgress', JSON.stringify(progress));
  }
};

export const getModuleProgress = (moduleId: string): boolean => {
  if (isBrowser()) {
    const progress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
    return progress[moduleId] || false;
  }
  return false;
};

// --- Quiz Scores ---

export interface QuizScore {
  quizId: string;
  score: number;
  total: number;
  date: string;
}

export const saveQuizScore = (quizId: string, score: number, total: number) => {
  if (isBrowser()) {
    const scores: QuizScore[] = JSON.parse(localStorage.getItem('quizScores') || '[]');
    const newScore: QuizScore = { quizId, score, total, date: new Date().toISOString() };
    scores.push(newScore);
    localStorage.setItem('quizScores', JSON.stringify(scores));
  }
};

export const getQuizScores = (): QuizScore[] => {
  if (isBrowser()) {
    return JSON.parse(localStorage.getItem('quizScores') || '[]');
  }
  return [];
};

// --- Overall Progress ---

export interface OverallProgress {
  modulesCompleted: number;
  totalModules: number; // This will need to be calculated based on your content
  averageQuizScore: number;
}

export const getOverallProgress = (totalModules: number): OverallProgress => {
  let modulesCompleted = 0;
  if (isBrowser()) {
    const moduleProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
    modulesCompleted = Object.values(moduleProgress).filter(status => status).length;
  }

  const quizScores = getQuizScores();
  let averageQuizScore = 0;
  if (quizScores.length > 0) {
    const totalScore = quizScores.reduce((acc, current) => acc + (current.score / current.total), 0);
    averageQuizScore = (totalScore / quizScores.length) * 100;
  }

  return {
    modulesCompleted,
    totalModules,
    averageQuizScore,
  };
};
