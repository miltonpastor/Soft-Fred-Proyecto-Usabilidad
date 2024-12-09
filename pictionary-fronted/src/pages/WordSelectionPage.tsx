import React from 'react';
import { User, Users, Paintbrush } from 'lucide-react';
import CardWord from '../components/ui/CardWord';

interface Option {
    id: string;
    title: string;
    description: string;
    note: string;
    icon: React.ReactNode;
    image: string;
}


export function WordSelectionPage() {
    const options: Option[] = [
        {
            id: 'autorretrato',
            title: 'autorretrato',
            description: 'Dibuja cómo te ves en un espejo.',
            note: 'El autorretrato es una forma de arte donde los artistas representan su propia imagen.',
            icon: <User className="w-6 h-6" />,
            image: 'https://images.unsplash.com/photo-1584385002340-d886f3a0f097?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'vestimenta',
            title: 'vestimenta otavalo',
            description: 'Dibuja la vestimenta típica de los Otavaleños.',
            note: 'La vestimenta Otavalo es un símbolo cultural de Ecuador, caracterizada por su bordado detallado, colores vivos y diseño artesanal.',
            icon: <Users className="w-6 h-6" />,
            image: 'https://images.unsplash.com/photo-1584385002340-d886f3a0f097?auto=format&fit=crop&q=80&w=300'
        },
        {
            id: 'grafiti',
            title: 'Grafiti',
            description: 'Dibuja un grafiti colorido en una pared.',
            note: 'El grafiti es una forma de arte urbano que utiliza colores y símbolos para transmitir ideas o emociones.',
            icon: <Paintbrush className="w-6 h-6" />,
            image: 'https://images.unsplash.com/photo-1584385002340-d886f3a0f097?auto=format&fit=crop&q=80&w=300'
        }
    ];

    return (
        <div className=" flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Pincelada</h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">Ronda 1 de 3</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                        Escoge la palabra a dibujar:
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {options.map((option) => (
                            <CardWord option={option} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}