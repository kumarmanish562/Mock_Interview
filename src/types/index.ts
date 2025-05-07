export type Role = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Question = {
  id: string;
  text: string;
  recommendedTime: number; // in seconds
};

export type FeedbackType = {
  strengths: string[];
  improvements: string[];
  score: number; // 1-10 rating
  comment: string;
};

export type Answer = {
  questionId: string;
  text: string;
  feedback?: FeedbackType;
};

export type InterviewType = {
  role: Role;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  isCompleted: boolean;
  overallFeedback?: string;
};