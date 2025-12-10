'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      e.preventDefault();
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search modules and exams..."
          className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
