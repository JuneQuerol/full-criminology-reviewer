'use client';

import { useState, useEffect } from 'react';
import QuizQuestion from '../../../components/QuizQuestion';
import GoogleAd from '../../../components/GoogleAd';
import { ProgressProvider, useProgress } from '../../../contexts/ProgressContext';

function QuizComponent({ quiz }) {
  const [answers, setAnswers] = useState({});
  const { progress, updateProgress } = useProgress();

  useEffect(() => {
    const savedProgress = progress[quiz.slug];
    if (savedProgress) {
      setAnswers(savedProgress.answers);
    }
  }, [quiz.slug, progress]);

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = { ...answers, [questionIndex]: answer };
    setAnswers(newAnswers);
    updateProgress(quiz.slug, { answers: newAnswers, submitted: true });
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-lg mb-6">{quiz.description}</p>

      {quiz.questions.map((question, index) => (
        <div key={index}>
          <QuizQuestion
            question={question.question}
            choices={question.choices}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
            onAnswer={(answerIndex) => handleAnswerChange(index, answerIndex)}
          />
          {/* Insert Ad after every 5th question (indices 4, 9, 14, etc.) */}
          {(index + 1) % 5 === 0 && (
            <GoogleAd 
              slot="1337729799" 
              format="fluid"
              layoutKey="-fb+5w+4e-db+86"
              className="my-8"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function QuizClient({ quiz }) {
    return (
        <ProgressProvider>
            <QuizComponent quiz={quiz} />
        </ProgressProvider>
    )
}
