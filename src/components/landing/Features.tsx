import React from 'react';
import { FaRobot, FaVideo, FaComments, FaMicrophone, FaChartBar, FaCheckCircle } from 'react-icons/fa';
import { features } from '@/lib/constants';

export const Features: React.FC = () => {
  // Function to get the icon component based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaRobot':
        return <FaRobot className="h-6 w-6 text-primary-600" />;
      case 'FaVideo':
        return <FaVideo className="h-6 w-6 text-primary-600" />;
      case 'FaComments':
        return <FaComments className="h-6 w-6 text-primary-600" />;
      case 'FaMicrophone':
        return <FaMicrophone className="h-6 w-6 text-primary-600" />;
      case 'FaChartBar':
        return <FaChartBar className="h-6 w-6 text-primary-600" />;
      default:
        return <FaCheckCircle className="h-6 w-6 text-primary-600" />;
    }
  };

  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">The Ultimate Interview Preparation Tool</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our AI-powered mock interview platform provides everything you need to prepare for your next job interview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-primary-100 rounded-lg dark:bg-primary-900/30">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 bg-gray-100 rounded-full dark:bg-gray-800">
            <div className="bg-primary-600 text-white py-2 px-6 rounded-full">
              <span className="font-medium">Ready to practice?</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mt-4 mb-2">Start your mock interview now</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto dark:text-gray-300">
            Choose your desired role and get personalized interview questions tailored to your career path.
          </p>
          <a 
            href="/role" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Start Interview <FaRobot className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;