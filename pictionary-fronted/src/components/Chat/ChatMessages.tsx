import React from 'react';
import { Message } from '../../types';

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-3">
      {messages.map((message) => (
        <div key={message.id} className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: message.player.color }}
            >
              <span className="text-white text-xs">#{message.player.id}</span>
            </div>
            <span className="text-sm font-medium">{message.player.name}</span>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
          <p className="text-gray-700 bg-gray-50 rounded-lg p-2 ml-7">
            {message.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;