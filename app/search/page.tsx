'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import SearchResults from '../../components/SearchResults';
import { useRouter } from 'next/navigation';
import { SearchResult } from '../../lib/search';


const SearchContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        const response = await fetch(`/api/search?query=${query}`);
        const searchResults = await response.json();
        setResults(searchResults);
      };
      fetchResults();
    }
  }, [query]);

  const handleResultClick = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <SearchResults results={results} onResultClick={handleResultClick} />
      ) : (
        <p>No results found.</p>
      )}
    </>
  );
};

const SearchPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
};

export default SearchPage;
