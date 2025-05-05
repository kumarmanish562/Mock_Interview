'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaVideo } from 'react-icons/fa';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Header: React.FC = () => {
  const pathname = usePathname();
  
  const isInterviewActive = pathname === '/interview' || pathname === '/result';

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <FaVideo className="text-primary-600" />
          <span className="hidden sm:inline">AI Mock Interviewer</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isInterviewActive && (
            <nav className="hidden md:flex gap-6 mr-4">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  pathname === '/' ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Home
              </Link>
              <Link
                href="/role"
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  pathname === '/role' ? 'text-primary-600' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Start Interview
              </Link>
            </nav>
          )}
          
          <ThemeToggle />

          {!isInterviewActive && (
            <Link
              href="/role"
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Start Interview
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;