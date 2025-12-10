// components/ModuleCard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getModuleProgress } from '../lib/progress';
import { CheckCircle } from 'lucide-react';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  part: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ id, title, description, part }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(getModuleProgress(id));
  }, [id]);

  return (
    <div className="bg-card dark:bg-gray-800/50 shadow-lg rounded-xl p-6 border-l-4 border-brand-gold hover-lift flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
      <div>
        <h3 className="text-2xl font-bold font-serif text-brand-navy dark:text-brand-gold mb-3">{title}</h3>
        <p className="text-muted-foreground dark:text-gray-400 mb-4 h-24 overflow-hidden">{description}</p>
      </div>
      <div className="flex justify-between items-center mt-6">
        <Link href={`/${part}/${id}`}>
          <span className="text-white bg-brand-navy hover:bg-opacity-90 dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-opacity-80 font-bold py-3 px-6 rounded-lg transition duration-300 cursor-pointer text-base">
            {isCompleted ? 'Review Again' : 'Start Module'}
          </span>
        </Link>
        {isCompleted && (
          <div className="flex items-center text-green-500 dark:text-green-400">
            <CheckCircle className="w-6 h-6 mr-2" />
            <span className="font-semibold">Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
