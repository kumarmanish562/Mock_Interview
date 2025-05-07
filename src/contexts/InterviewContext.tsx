'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Role, Question, Answer, InterviewType, FeedbackType } from '@/types';


interface InterviewContextType {
  interview: InterviewType | null;
  setRole: (role: Role) => void;
  startInterview: () => void;
  submitAnswer: (answer: string) => Promise<void>;
  nextQuestion: () => void;
  restartInterview: () => void;
  isLoading: boolean;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interview, setInterview] = useState<InterviewType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Load interview from localStorage when component mounts
  useEffect(() => {
    const savedInterview = localStorage.getItem('interview');
    if (savedInterview) {
      setInterview(JSON.parse(savedInterview));
    }
  }, []);

  // Save interview to localStorage whenever it changes
  useEffect(() => {
    if (interview) {
      localStorage.setItem('interview', JSON.stringify(interview));
    }
  }, [interview]);

  const setRole = (role: Role) => {
    setInterview({
      role,
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
    });
    router.push('/interview');
  };

  const startInterview = async () => {
    if (!interview?.role) return;
    
    setIsLoading(true);
    try {
      // Generate questions for the role
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateQuestions',
          role: interview.role,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      
      setInterview(prev => {
        if (!prev) return null;
        return {
          ...prev,
          questions: data.questions,
        };
      });
    } catch (error) {
      console.error('Error starting interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answerText: string) => {
    if (!interview) return;
    
    const currentQuestion = interview.questions[interview.currentQuestionIndex];
    if (!currentQuestion) return;

    setIsLoading(true);

    try {
      // Get feedback for the answer
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getFeedback',
          role: interview.role,
          question: currentQuestion,
          answer: answerText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get feedback');
      }

      const feedback: FeedbackType = await response.json();

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        text: answerText,
        feedback,
      };

      setInterview(prev => {
        if (!prev) return null;
        return {
          ...prev,
          answers: [...prev.answers, newAnswer],
        };
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    if (!interview) return;
    
    if (interview.currentQuestionIndex < interview.questions.length - 1) {
      // Move to next question
      setInterview(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        };
      });
    } else {
      // Complete the interview and generate overall feedback
      completeInterview();
    }
  };

  const completeInterview = async () => {
    if (!interview) return;
    
    setIsLoading(true);
    try {
      // Get overall feedback
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getOverallFeedback',
          role: interview.role,
          answers: interview.answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get overall feedback');
      }

      const data = await response.json();
      
      setInterview(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isCompleted: true,
          overallFeedback: data.feedback,
        };
      });

      // Redirect to results page
      router.push('/result');
    } catch (error) {
      console.error('Error completing interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const restartInterview = () => {
    localStorage.removeItem('interview');
    setInterview(null);
    router.push('/');
  };

  const contextValue: InterviewContextType = {
    interview,
    setRole,
    startInterview,
    submitAnswer,
    nextQuestion,
    restartInterview,
    isLoading,
  };

  return (
    <InterviewContext.Provider value={contextValue}>
      {children}
    </InterviewContext.Provider>
  );
};