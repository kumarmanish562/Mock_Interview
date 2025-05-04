'use client';

import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useInterview } from '@/contexts/InterviewContext';

interface InterviewControlsProps {
  onSubmitAnswer: (answer: string) => void;
}

export const InterviewControls: React.FC<InterviewControlsProps> = ({ onSubmitAnswer }) => {
  const [answer, setAnswer] = useState('');
  const { isLoading } = useInterview();
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleStartListening = () => {
    resetTranscript();
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
    if (transcript) {
      setAnswer((prev) => prev + ' ' + transcript);
    }
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer.trim());
      setAnswer('');
      resetTranscript();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Type your answer here..."
          value={isListening ? `${answer} ${transcript}` : answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isListening || isLoading}
        />
        
        <div className="absolute bottom-3 right-3 flex gap-2">
          {browserSupportsSpeechRecognition && (
            <Button
              type="button"
              variant={isListening ? 'secondary' : 'outline'}
              size="icon"
              onClick={isListening ? handleStopListening : handleStartListening}
              disabled={isLoading}
              aria-label={isListening ? 'Stop recording' : 'Start recording'}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </Button>
          )}
          
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || (!answer.trim() && !transcript.trim())}
            aria-label="Submit answer"
          >
            <FaPaperPlane className="mr-2" />
            Submit
          </Button>
        </div>
      </div>
      
      {isListening && (
        <div className="text-sm text-gray-500 animate-pulse">
          Listening... Speak your answer.
        </div>
      )}
    </div>
  );
};

export default InterviewControls;