'use client';

import React, { useState, useEffect } from 'react';

export const SomeComponent: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');

  useEffect(() => {
    // Example: Set roomName and generate token based on username
    const username = 'user-123';
    const generatedRoomName = `room-${username}`;
    setRoomName(generatedRoomName);

    // Get token from API (for rate-limited endpoint, for example)
    const getToken = async () => {
      try {
        const response = await fetch('/api/some-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get token');
        }

        const data = await response.json();
        setToken(data.message); // Or any response you expect
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    getToken();
  }, []);

  if (!token || !roomName) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg dark:bg-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Setting up...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
      <p>Your room: {roomName}</p>
      <p>Status: {token}</p>
    </div>
  );
};

export default SomeComponent;
