// components/ModuleCard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getModuleProgress } from '../lib/progress';
import { CheckCircle, BookOpen } from 'lucide-react';

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
    <Link href={`/${part}/${id}`} className="block group">
      <div className="bg-card dark:bg-gray-800/50 shadow-lg rounded-xl p-6 border-l-4 border-brand-gold hover-lift flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-l-8 cursor-pointer h-full min-h-[280px]">
        <div>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold font-serif text-brand-navy dark:text-brand-gold group-hover:underline flex-1 pr-2">{title}</h3>
            <BookOpen className="w-6 h-6 text-brand-gold/50 group-hover:text-brand-gold transition-colors flex-shrink-0" />
          </div>
          <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
            {description || 'Explore this module to learn key concepts for the CLE board exam.'}
          </p>
        </div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-white bg-brand-navy group-hover:bg-brand-gold group-hover:text-brand-navy dark:bg-brand-gold dark:text-brand-navy dark:group-hover:bg-white font-bold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
            {isCompleted ? 'Review Again' : 'Start Module'}
          </span>
          {isCompleted && (
            <div className="flex items-center text-green-500 dark:text-green-400">
              <CheckCircle className="w-5 h-5 mr-1" />
              <span className="font-semibold text-sm">Done</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
