import React from 'react';
import { Player } from '../../types';

interface PlayerListProps {
  players: Player[];
  currentPlayerId: number;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, currentPlayerId }) => {
  return (
    <div className="p-2 bg-white rounded-lg shadow-md overflow-hidden">
      {players.map((player) => (
        <div
          key={player.id}
          className={`p-3 flex items-center gap-2 border-b ${player.id === currentPlayerId ? 'bg-gray-50' : ''
            }`}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: player.color }}
          >
            <span className="text-white text-xs">#{player.id}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{player.name}</p>
            <p className="text-xs text-gray-500">{player.points} puntos</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;