'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaArrowRight, FaRedo } from 'react-icons/fa';
import { useInterview } from '@/contexts/InterviewContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ResultPage() {
  const { interview, restartInterview } = useInterview();
  const router = useRouter();

  // Redirect to home if no interview or not completed
  useEffect(() => {
    if (!interview) {
      router.push('/');
    } else if (!interview.isCompleted) {
      router.push('/interview');
    }
  }, [interview, router]);

  if (!interview || !interview.isCompleted) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Loading your results...</p>
        </div>
      </div>
    );
  }

  // Calculate overall score
  const totalScore = interview.answers.reduce((sum, answer) => {
    return sum + (answer.feedback?.score || 0);
  }, 0);
  const averageScore = totalScore / interview.answers.length;
  const formattedScore = averageScore.toFixed(1);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Interview Results</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here's a summary of your {interview.role.title} mock interview performance.
          </p>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Overall Score</span>
                <span className="text-2xl font-bold">
                  {formattedScore}/10
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${(averageScore / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {interview.overallFeedback && (
                  <div dangerouslySetInnerHTML={{ __html: interview.overallFeedback }} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Question-by-Question Breakdown</h2>
          
          <div className="space-y-4">
            {interview.questions.map((question, index) => {
              const answer = interview.answers.find(a => a.questionId === question.id);
              return (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-base">
                      <span>Question {index + 1}</span>
                      {answer?.feedback && (
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-white">
                          Score: {answer.feedback.score}/10
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-2">{question.text}</p>
                    
                    {answer && (
                      <div className="mt-2">
                        <div className="bg-gray-50 p-3 rounded-md dark:bg-gray-800">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{answer.text}</p>
                        </div>
                        
                        {answer.feedback && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="flex items-center text-green-600 mb-2 text-sm font-medium">
                                <FaCheck className="mr-1" /> Strengths
                              </h4>
                              <ul className="list-disc pl-5 text-sm">
                                {answer.feedback.strengths.map((strength, i) => (
                                  <li key={i} className="text-gray-600 dark:text-gray-300">{strength}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="flex items-center text-amber-600 mb-2 text-sm font-medium">
                                <FaTimes className="mr-1" /> Areas for Improvement
                              </h4>
                              <ul className="list-disc pl-5 text-sm">
                                {answer.feedback.improvements.map((improvement, i) => (
                                  <li key={i} className="text-gray-600 dark:text-gray-300">{improvement}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={restartInterview} variant="default">
            <FaRedo className="mr-2" /> Start New Interview
          </Button>
          <Button onClick={() => router.push('/')} variant="outline">
            <FaArrowRight className="mr-2" /> Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}