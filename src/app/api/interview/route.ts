import { NextRequest, NextResponse } from 'next/server';
import { Role, Question, Answer, FeedbackType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { action, role, question, answer, answers } = await request.json();

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    switch (action) {
      case 'generateQuestions':
        return generateQuestions(role);
      case 'getFeedback':
        return getFeedback(role, question, answer);
      case 'getOverallFeedback':
        return getOverallFeedback(role, answers);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Interview API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateQuestions(role: Role): Promise<NextResponse> {
  const mockQuestions: Question[] = [
    { id: '1', text: `What experience do you have as a ${role.title}?`, recommendedTime: 120 },
    { id: '2', text: 'Describe a challenging project you worked on recently.', recommendedTime: 180 },
    { id: '3', text: 'How do you stay updated with the latest trends in your field?', recommendedTime: 120 },
    { id: '4', text: 'Describe your problem-solving approach when facing a difficult task.', recommendedTime: 150 },
    { id: '5', text: 'Do you have any questions for me?', recommendedTime: 90 },
  ];
  return NextResponse.json({ questions: mockQuestions });
}

async function getFeedback(role: Role, question: Question, answer: string): Promise<NextResponse> {
  const mockFeedback: FeedbackType = {
    strengths: ['Clear communication', 'Relevant experience'],
    improvements: ['Add more specific examples', 'Elaborate on outcomes'],
    score: 7,
    comment: 'A good answer with clear points, but could be stronger with examples and metrics.',
  };
  return NextResponse.json(mockFeedback);
}

async function getOverallFeedback(role: Role, answers: Answer[]): Promise<NextResponse> {
  const mockOverall = {
    feedback: `Overall, you performed well in the mock interview for the ${role.title} role. You demonstrated good communication and understanding of the subject. To improve further, try using more detailed examples and quantifying your achievements when possible.`,
  };
  return NextResponse.json(mockOverall);
}
