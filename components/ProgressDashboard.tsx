// components/ProgressDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { getOverallProgress, getQuizScores, QuizScore, getModuleProgress } from '../lib/progress';
import ProgressBar from './ProgressBar'; // Assuming you have this component

const ProgressDashboard = () => {
  const [overallProgress, setOverallProgress] = useState({ modulesCompleted: 0, totalModules: 0, averageQuizScore: 0 });
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [modulesByPart, setModulesByPart] = useState<Record<string, { id: string; title: string; completed: boolean }[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/modules');
      const allModules = await response.json();
      const totalModules = allModules.length;

      const progress = getOverallProgress(totalModules);
      setOverallProgress(progress);

      const scores = getQuizScores();
      setQuizScores(scores);

      const organizedModules: Record<string, { id: string; title: string; completed: boolean }[]> = {};
      allModules.forEach((module: { id: string; title: string; }) => {
        const partMatch = module.id.match(/Module-(\d+)\.\d+/);
        if (partMatch) {
          const part = `Part ${partMatch[1]}`;
          if (!organizedModules[part]) {
            organizedModules[part] = [];
          }
          organizedModules[part].push({
            ...module,
            completed: getModuleProgress(module.id),
          });
        }
      });
      setModulesByPart(organizedModules);
    };

    fetchData();
  }, []);

  const overallPercentage = overallProgress.totalModules > 0 ? (overallProgress.modulesCompleted / overallProgress.totalModules) * 100 : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Overall Progress</h2>
          <p className="text-4xl font-bold text-blue-600 my-2">{overallPercentage.toFixed(1)}%</p>
          <ProgressBar progress={overallPercentage} />
          <p className="text-sm text-gray-500 mt-2">{overallProgress.modulesCompleted} of {overallProgress.totalModules} modules completed</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Average Quiz Score</h2>
          <p className="text-4xl font-bold text-green-600 my-2">{overallProgress.averageQuizScore.toFixed(1)}%</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Quizzes Taken</h2>
          <p className="text-4xl font-bold text-purple-600 my-2">{quizScores.length}</p>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Modules Status</h2>
        <div className="space-y-4">
          {Object.entries(modulesByPart).map(([part, modules]) => (
            <div key={part} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{part}</h3>
              <ul className="space-y-1">
                {modules.map(module => (
                  <li key={module.id} className={`flex items-center justify-between p-2 rounded ${module.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                    <span>{module.title}</span>
                    {module.completed && <span className="text-green-600 font-bold">✓</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz History</h2>
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {quizScores.map((score, index) => (
              <li key={index} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">{score.quizId}</p>
                  <p className="text-sm text-gray-500">{new Date(score.date).toLocaleDateString()}</p>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {score.score}/{score.total}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
