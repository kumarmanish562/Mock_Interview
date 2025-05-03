import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimiter'; // Import the rate limiter

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    // Check if the request exceeds the rate limit
    const isAllowed = await rateLimit(username);
    if (!isAllowed) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    // Logic for your API endpoint (e.g., creating some resource)
    // This is where you'd add your app-specific functionality
    return NextResponse.json({ message: 'Request successful' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}