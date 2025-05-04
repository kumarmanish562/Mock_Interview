import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export const Hero: React.FC = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform opacity-20">
          <div className="h-96 w-96 rounded-full bg-primary-400 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 transform opacity-20">
          <div className="h-96 w-96 rounded-full bg-secondary-400 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ace Your Next Interview with AI-Powered Practice
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Practice interviews for any job role with our AI interviewer. Get real-time feedback,
              improve your answers, and build confidence for your next big opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/role"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Start Interview <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl"></div>
            <div className="relative p-1 rounded-xl bg-white shadow-xl dark:bg-gray-900">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-primary-100 rounded-full mb-4 dark:bg-primary-900">
                      <FaArrowRight className="text-primary-600 h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Interactive Interview Experience</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Real-time video chat with AI-powered questions and feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;