"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubjects = () => {
    setIsSubjectsOpen(!isSubjectsOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSubjectsOpen(false);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const subjectLinks = [
    { href: '/part-1', text: 'Jurisprudence' },
    { href: '/lea', text: 'Law Enforcement' },
    { href: '/criminalistics', text: 'Criminalistics' },
    { href: '/cdi', text: 'Crime Detection' },
    { href: '/sce', text: 'Sociology of Crimes' },
    { href: '/ca', text: 'Correctional Admin' },
  ];

  const otherLinks = [
    { href: '/practice', text: 'Practice Exams' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-navy/100 backdrop-blur-sm shadow-lg no-print">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMenu} className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-brand-gold font-serif">Pinoy Crim</span>
                <span className="hidden sm:block text-xl font-semibold text-white">Reviewer</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-grow justify-center px-8">
            <div className="w-full max-w-lg">
              <SearchBar />
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <div className="md:hidden ml-3">
              <button 
                onClick={toggleMenu} 
                className="p-2 rounded-md text-gray-300 transition-transform duration-300 ease-in-out"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={28} className="rotate-90" /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="bg-brand-navy/100 border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            <div className="mb-4">
              <SearchBar />
            </div>
            
            <button
              onClick={toggleSubjects}
              className="w-full flex justify-between items-center px-3 py-3 min-h-[48px] rounded-md text-base font-medium text-gray-300 hover:text-brand-gold hover:bg-gray-700/50 transition-colors"
            >
              <span>Subjects</span>
              {isSubjectsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <div className={`pl-4 transition-all duration-300 ease-in-out ${isSubjectsOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
                <div className="py-2 space-y-2">
                    {subjectLinks.map(link => (
                    <Link key={link.href} href={link.href} onClick={closeMenu}>
                        <span className="block px-3 py-3 min-h-[48px] flex items-center rounded-md text-base font-medium text-gray-300 hover:text-brand-gold hover:bg-gray-700/50 transition-colors">
                        {link.text}
                        </span>
                    </Link>
                    ))}
                </div>
            </div>

            {otherLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={closeMenu}>
                <span className="block px-3 py-3 min-h-[48px] flex items-center rounded-md text-base font-medium text-gray-300 hover:text-brand-gold hover:bg-gray-700/50 transition-colors">
                  {link.text}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
