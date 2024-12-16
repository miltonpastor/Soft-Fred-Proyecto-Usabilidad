import { ReactNode } from "react";
import useGameDataStore from "../../store/GameDataStore";

interface CardWordProps {
    option: {
        id: string;
        title: string;
        description: string;
        note: string;
        icon: ReactNode;
        image: string;
    };
}


const CardWord = ({ option }: CardWordProps) => {
    const { setWord } = useGameDataStore();
    return (
        <button
            key={option.id}
            onClick={() => setWord(option.title)}
            className="bg-blue02 border-2 border-blue-100 rounded-lg p-4 hover:border-blue-500 transition-all duration-200 flex flex-col"
        >
            <div className="flex items-center justify-center mb-4">
                {option.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
            <div className="min-h-[35%] bg-blue-50 rounded-lg p-4 mt-auto">
                <p className="text-sm text-blue-800">{option.note}</p>
            </div>
            <img
                src={option.image}
                alt={option.title}
                className="w-full h-40 object-cover rounded-lg mt-4"
            />
        </button>
    )
}

export default CardWord
