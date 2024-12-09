import { create } from "zustand";

interface GameData {
    word: string;
    setWord: (word: string) => void;
}


const useGameDataStore = create<GameData>((set) => ({
    word: '',
    setWord: (word: string) => set({ word }),
}))


export default useGameDataStore;