'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaServer, FaCode, FaChartBar, FaTasks, FaPencilAlt } from 'react-icons/fa';
import { useInterview } from '@/contexts/InterviewContext';
import { roles } from '@/lib/constants';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function RoleSelection() {
  const { setRole } = useInterview();

  // Function to get the icon component based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaReact':
        return <FaReact className="h-8 w-8" />;
      case 'FaServer':
        return <FaServer className="h-8 w-8" />;
      case 'FaCode':
        return <FaCode className="h-8 w-8" />;
      case 'FaChartBar':
        return <FaChartBar className="h-8 w-8" />;
      case 'FaTasks':
        return <FaTasks className="h-8 w-8" />;
      case 'FaPencilRuler':
        return <FaPencilAlt className="h-8 w-8" />;
      default:
        return <FaCode className="h-8 w-8" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Select Your Role</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the role you're interviewing for to get tailored questions and feedback.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {roles.map((role) => (
            <motion.div
              key={role.id}
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md cursor-pointer dark:bg-gray-800 dark:border-gray-700"
              onClick={() => setRole(role)}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-primary-100 rounded-full text-primary-600 dark:bg-primary-900/30">
                  {getIcon(role.icon)}
                </div>
                <h3 className="text-xl font-semibold">{role.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{role.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}