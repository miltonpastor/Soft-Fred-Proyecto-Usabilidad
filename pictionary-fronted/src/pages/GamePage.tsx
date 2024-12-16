import { useState } from "react";
import { WordSelectionPage } from "./WordSelectionPage"
import GameHeader from "../components/Header/GameHeader";
import PlayerList from "../components/Players/PlayerList";
import DrawingCanvas from "../components/Canvas/DrawingCanvas";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import { GameState, Message, Player } from "../types";


interface DrawingOption {
    id: string;
    title: string;
    description: string;
    note: string;
    icon: React.ReactNode;
    image: string;
}

const initialPlayers: Player[] = [
    { id: 1, name: 'Jugador 1', points: 0, color: '#FF4136' },
    { id: 2, name: 'Jugador 2', points: 0, color: '#FF851B' },
    { id: 3, name: 'Jugador 3', points: 0, color: '#2ECC40' },
    { id: 4, name: 'Jugador 4', points: 0, color: '#0074D9' },
    { id: 5, name: 'Jugador 5', points: 0, color: '#B10DC9' },
];

const initialGameState: GameState = {
    round: 1,
    maxRounds: 3,
    timeLeft: 45,
};


const GamePage = () => {
    const [selectedWord, setSelectedWord] = useState<Boolean>(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentPlayerId] = useState(1);
    const [gameState] = useState<GameState>(initialGameState);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            player: initialPlayers.find(p => p.id === currentPlayerId)!,
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <>
            {selectedWord ? (
                <div className="min-h-screen max-w-screen flex items-center  p-4">
                    <div className="w-full p-5 bg-blue01 mx-auto">
                        <GameHeader gameState={gameState} />
                        <div className="h-[620px] bg-green01 grid grid-cols-[18%_1fr_25%] gap-2 mt-4">
                            <PlayerList players={initialPlayers} currentPlayerId={currentPlayerId} />
                            <div className="flex-1 flex">
                                <DrawingCanvas />
                            </div>
                            <div className="bg-white rounded-lg shadow-md flex flex-col">
                                <ChatMessages messages={messages} />
                                <ChatInput onSendMessage={handleSendMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <WordSelectionPage />
            )}
        </>
    )
}

export default GamePage
