'use client';

import React, { useState, useEffect } from 'react';
import { useInterview } from '@/contexts/InterviewContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FaClock } from 'react-icons/fa';

export const QuestionDisplay: React.FC = () => {
  const { interview } = useInterview();
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  const currentQuestion = interview?.questions[interview.currentQuestionIndex];

  // Reset and start timer when question changes
  useEffect(() => {
    if (currentQuestion) {
      setTimeRemaining(currentQuestion.recommendedTime);
      setTimerActive(false);
    }
  }, [currentQuestion?.id]);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeRemaining === null) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setTimerActive(true);
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    if (currentQuestion) {
      setTimeRemaining(currentQuestion.recommendedTime);
    }
  };

  if (!interview || !currentQuestion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Question {interview.currentQuestionIndex + 1}/{interview.questions.length}</span>
          <div className="flex items-center space-x-2">
            <FaClock className="text-gray-500" />
            <span className={`font-mono ${timeRemaining === 0 ? 'text-red-500' : ''}`}>
              {timeRemaining !== null ? formatTime(timeRemaining) : '--:--'}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-lg">{currentQuestion.text}</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleStartTimer}
            disabled={timerActive}
            className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 disabled:opacity-50 dark:bg-green-900 dark:text-green-200"
          >
            Start Timer
          </button>
          <button
            onClick={handleResetTimer}
            className="text-sm px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
          >
            Reset
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionDisplay;