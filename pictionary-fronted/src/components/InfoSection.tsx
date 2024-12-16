import { HelpCircle, MessageSquare, Pencil } from 'lucide-react';
import { InfoCard } from './ui/InfoCard';

export function InfoSection() {
    return (
        <div className="w-full p-6 flex flex-wrap justify-center gap-4 bg-blue01">
            <InfoCard
                icon={<HelpCircle />}
                title="Acerca de"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            />
            <InfoCard
                icon={<MessageSquare />}
                title="Noticias"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            />
            <InfoCard
                icon={<Pencil />}
                title="Como jugar"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            />
        </div>
    );
}