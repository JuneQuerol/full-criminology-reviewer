'use client';

import { useState } from 'react';
import { Check, X, CheckCircle, XCircle } from 'lucide-react';

type QuizQuestionProps = {
  question: string;
  choices: string[];
  correctAnswer: number; // index of the correct answer
  explanation: string;
  onAnswer: (answerIndex: number) => void;
};

const QuizQuestion = ({ question, choices, correctAnswer, explanation, onAnswer }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Instant click - immediately show result when user clicks a choice
  const handleChoiceClick = (index: number) => {
    if (answered) return; // Prevent changing answer after selection

    setSelectedAnswer(index);
    setAnswered(true);
    onAnswer(index);
  };

  const getChoiceClass = (index: number) => {
    // Before answering - show hover effects
    if (!answered) {
      return 'border-gray-300 dark:border-gray-600 bg-white dark:bg-card hover:bg-brand-gold/10 hover:border-brand-gold dark:hover:bg-brand-gold/20 cursor-pointer';
    }

    // After answering - show correct answer in green
    if (index === correctAnswer) {
      return 'bg-green-500/20 border-green-500 dark:bg-green-500/30';
    }

    // Show selected wrong answer in red
    if (index === selectedAnswer && index !== correctAnswer) {
      return 'bg-red-500/20 border-red-500 dark:bg-red-500/30';
    }

    // Other choices - muted
    return 'border-gray-200 dark:border-gray-700 opacity-50';
  };

  const getChoiceIcon = (index: number) => {
    if (!answered) return null;

    if (index === correctAnswer) {
      return <CheckCircle className="text-green-500 flex-shrink-0" size={24} />;
    }

    if (index === selectedAnswer && index !== correctAnswer) {
      return <XCircle className="text-red-500 flex-shrink-0" size={24} />;
    }

    return null;
  };

  return (
    <div className="p-6 md:p-8 rounded-xl shadow-lg bg-card dark:bg-gray-800/50 mb-6">
      <h2 className="text-xl md:text-2xl font-semibold font-serif mb-6 text-brand-navy dark:text-brand-light leading-relaxed">{question}</h2>

      <div className="space-y-3">
        {choices.map((choice, index) => (
          <div
            key={index}
            onClick={() => handleChoiceClick(index)}
            className={`p-4 md:p-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-between gap-3 ${getChoiceClass(index)} ${!answered ? 'active:scale-[0.98]' : ''}`}
          >
            <div className="flex items-start gap-3">
              <span className={`font-bold text-lg flex-shrink-0 ${
                answered && index === correctAnswer ? 'text-green-600 dark:text-green-400' :
                answered && index === selectedAnswer ? 'text-red-600 dark:text-red-400' :
                'text-brand-gold'
              }`}>
                {String.fromCharCode(65 + index)}.
              </span>
              <span className={`text-base md:text-lg ${
                answered && index === correctAnswer ? 'text-green-800 dark:text-green-200 font-medium' :
                answered && index === selectedAnswer && index !== correctAnswer ? 'text-red-800 dark:text-red-200' :
                'text-foreground'
              }`}>
                {choice}
              </span>
            </div>
            {getChoiceIcon(index)}
          </div>
        ))}
      </div>

      {/* Explanation shown immediately after clicking */}
      {answered && (
        <div className={`mt-6 p-5 rounded-lg border-l-4 ${
          selectedAnswer === correctAnswer
            ? 'bg-green-500/10 border-green-500 dark:bg-green-500/20'
            : 'bg-red-500/10 border-red-500 dark:bg-red-500/20'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            {selectedAnswer === correctAnswer ? (
              <>
                <Check className="text-green-500" size={24} />
                <h3 className="font-bold text-xl text-green-700 dark:text-green-300">Correct!</h3>
              </>
            ) : (
              <>
                <X className="text-red-500" size={24} />
                <h3 className="font-bold text-xl text-red-700 dark:text-red-300">Incorrect</h3>
              </>
            )}
          </div>
          {selectedAnswer !== correctAnswer && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              The correct answer is: <span className="font-semibold text-green-600 dark:text-green-400">{String.fromCharCode(65 + correctAnswer)}. {choices[correctAnswer]}</span>
            </p>
          )}
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Explanation:</p>
            <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
