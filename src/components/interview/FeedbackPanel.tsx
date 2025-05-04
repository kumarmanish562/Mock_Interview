'use client';

import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useInterview } from '@/contexts/InterviewContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FeedbackPanelProps {
  onNext: () => void;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ onNext }) => {
  const { interview } = useInterview();
  
  if (!interview) return null;
  
  const currentQuestion = interview.questions[interview.currentQuestionIndex];
  if (!currentQuestion) return null;
  
  const currentAnswer = interview.answers.find(
    (answer) => answer.questionId === currentQuestion.id
  );
  
  if (!currentAnswer || !currentAnswer.feedback) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your feedback will appear here after you submit your answer.</p>
        </CardContent>
      </Card>
    );
  }

  const { feedback } = currentAnswer;

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Feedback</span>
          <span className="text-lg font-bold">
            Score: {feedback.score}/10
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-green-600 mb-2">
            <FaThumbsUp /> <span className="font-medium">Strengths</span>
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {feedback.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-amber-600 mb-2">
            <FaThumbsDown /> <span className="font-medium">Areas for Improvement</span>
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {feedback.improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Comment</h3>
          <p className="text-gray-700 dark:text-gray-300">{feedback.comment}</p>
        </div>

        <div className="pt-2">
          <Button onClick={onNext} className="w-full">
            {interview.currentQuestionIndex < interview.questions.length - 1
              ? 'Next Question'
              : 'Finish Interview'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackPanel;