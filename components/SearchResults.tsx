'use client';

import { SearchResult } from '../lib/search';
import { FileText, ClipboardList } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (url: string) => void;
}

const SearchResults = ({ results, onResultClick }: SearchResultsProps) => {
  return (
    <ul>
      {results.map((result, index) => (
        <li
          key={index}
          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
          onClick={() => onResultClick(result.url)}
        >
          <div className="flex items-center">
            {result.type === 'module' ? (
              <FileText className="mr-3 text-gray-500" size={20} />
            ) : (
              <ClipboardList className="mr-3 text-gray-500" size={20} />
            )}
            <div>
              <p className="font-semibold">{result.title}</p>
              <p className="text-sm text-gray-600">{result.excerpt}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
