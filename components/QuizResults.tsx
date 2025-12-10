import React from 'react';

type QuizResultsProps = {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
};

const QuizResults = ({ score, totalQuestions, onRetry }: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const performanceMessage = percentage >= 75 ? "Excellent Work!" : percentage >= 50 ? "Good Job!" : "Keep Practicing!";

  return (
    <div className="text-center p-8 rounded-lg shadow-2xl bg-white max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
      <p className="text-lg text-gray-600 mb-4">{performanceMessage}</p>
      
      <div className="my-6">
        <p className="text-5xl font-extrabold text-blue-600">{percentage}%</p>
        <p className="text-gray-700 mt-2">You answered {score} out of {totalQuestions} questions correctly.</p>
      </div>

      <button 
        onClick={onRetry} 
        className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Retry Quiz
      </button>
    </div>
  );
};

export default QuizResults;
