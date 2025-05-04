import React from 'react';
import Link from 'next/link';
import { FaVideo, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <FaVideo className="text-primary-600" />
              <span>AI Mock Interviewer</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Prepare for your next job interview with AI-powered mock interviews and real-time feedback.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/role" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  AI Feedback
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Video Practice
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Role-specific Questions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} AI Mock Interviewer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;