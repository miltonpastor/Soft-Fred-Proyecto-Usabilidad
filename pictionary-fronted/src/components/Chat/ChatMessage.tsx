import React from 'react';

interface ChatMessageProps {
  message: string;
  username: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, username, timestamp }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-sm">{username}</span>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
      <p className="text-gray-700 bg-gray-100 rounded-lg p-2">{message}</p>
    </div>
  );
};

export default ChatMessage;