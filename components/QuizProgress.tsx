import React from 'react';

type QuizProgressProps = {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
};

const QuizProgress = ({ currentQuestion, totalQuestions, score }: QuizProgressProps) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">Question {currentQuestion} / {totalQuestions}</p>
        <p className="text-lg font-bold text-blue-600">Score: {score}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizProgress;
