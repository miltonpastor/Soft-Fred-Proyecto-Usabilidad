import { useState } from "react";
import { WordSelectionPage } from "./WordSelectionPage"


interface DrawingOption {
    id: string;
    title: string;
    description: string;
    note: string;
    icon: React.ReactNode;
    image: string;
}


const GamePage = () => {
    const [selectedWord, setSelectedWord] = useState<DrawingOption | null>(null);
    return (
        <div className="min-h-screen bg-gray-50">
            {selectedWord ? (
                <section>
                    wer
                </section>

            ) : (
                <WordSelectionPage onSelect={setSelectedWord} />
            )}
        </div>
    )
}

export default GamePage
