export interface Player {
    id: number;
    name: string;
    points: number;
    color: string;
}

export interface Message {
    id: string;
    text: string;
    player: Player;
    timestamp: string;
}

export interface GameState {
    round: number;
    maxRounds: number;
    timeLeft: number;
}