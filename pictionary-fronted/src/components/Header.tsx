import { Paintbrush2 } from 'lucide-react';

export function Header() {
    return (
        <header className="w-full p-4">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Paintbrush2 className="h-6 w-6" />
                <h1>Pincelada</h1>
            </div>
        </header>
    );
}