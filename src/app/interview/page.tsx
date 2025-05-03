'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInterview } from '@/contexts/InterviewContext';
import VideoRoom from '@/components/interview/VideoRoom';
import QuestionDisplay from '@/components/interview/QuestionDisplay';
import InterviewControls from '@/components/interview/InterviewControls';
import FeedbackPanel from '@/components/interview/FeedbackPanel';
import { Button } from '@/components/ui/Button';

export default function InterviewPage() {
  const { interview, startInterview, submitAnswer, nextQuestion, isLoading } = useInterview();
  const router = useRouter();

  // Redirect to home if no interview is set up
  useEffect(() => {
    if (!interview) {
      router.push('/');
    } else if (interview && (!interview.questions || interview.questions.length === 0)) {
      // Generate questions if they don't exist
      startInterview();
    }
  }, [interview, router, startInterview]);

  // Handle answer submission
  const handleSubmitAnswer = async (answer: string) => {
    await submitAnswer(answer);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    nextQuestion();
  };

  // Show loading state
  if (!interview || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {!interview ? "Setting up your interview..." : "Loading questions..."}
          </p>
        </div>
      </div>
    );
  }

  // Check if questions are available
  if (!interview.questions || interview.questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Interview Setup</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            We need to generate questions for your {interview.role.title} interview.
          </p>
          <Button onClick={startInterview} isLoading={isLoading}>
            Start Interview
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = interview.questions[interview.currentQuestionIndex];
  const currentAnswer = interview.answers.find(
    (answer) => answer.questionId === currentQuestion.id
  );
  const hasAnswered = Boolean(currentAnswer);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6">{interview.role.title} Interview</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Video */}
          <div className="lg:col-span-1">
            <VideoRoom />
          </div>

          {/* Center column - Questions and Input */}
          <div className="lg:col-span-1 space-y-6">
            <QuestionDisplay />
            
            {!hasAnswered && (
              <div className="mt-6">
                <InterviewControls onSubmitAnswer={handleSubmitAnswer} />
              </div>
            )}
          </div>

          {/* Right column - Feedback */}
          <div className="lg:col-span-1">
            <FeedbackPanel onNext={handleNextQuestion} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}