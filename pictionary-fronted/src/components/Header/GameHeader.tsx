import React from 'react';
import { Settings, Clock } from 'lucide-react';
import { GameState } from '../../types';

interface GameHeaderProps {
  gameState: GameState;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  return (
    <div className=" bg-white p-4 rounded-t-lg flex justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5" />
        <span>Ronda {gameState.round} de {gameState.maxRounds}</span>
      </div>
      <div className="text-center flex-1">
        <div className="h-1 bg-gray-200 rounded-full w-48 mx-auto">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${(gameState.timeLeft / 60) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">Adivina</span>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
};

export default GameHeader;