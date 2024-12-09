import { ChevronLeft, ChevronRight, User2 } from 'lucide-react';
import { useState } from 'react';
import usePartidaService from '../hooks/usePartidaService';

interface LoginCardProps {
    codigoPartida: String;
}

export function LoginCard({ codigoPartida }: LoginCardProps) {
    const [username, setUsername] = useState('');
    const { unirsePartida } = usePartidaService();
    const handleAddGamer = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Unirse a partida', codigoPartida, username);

    }

    return (
        <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 w-full max-w-[550px] mx-auto ">
            <div className="bg-gray-200 rounded-md flex items-center justify-between mb-4 p-2">
                <ChevronLeft className="h-6 w-6 text-gray-600" />
                <div className="bg-red-500 rounded-full p-2">
                    <User2 className="h-6 w-6 text-white" />
                </div>
                <ChevronRight className="h-6 w-6 text-gray-600" />
            </div>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre"
                className="w-full p-2 rounded-md border border-gray-300 mb-4"
            />

            <button
                className="w-full bg-green01 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                onClick={handleAddGamer}>
                Jugar!
            </button>
        </div>
    );
}