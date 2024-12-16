
interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    content: string;
}

export function InfoCard({ icon, title, content }: InfoCardProps) {
    return (
        <div className="w-[600px] min-h-[200px] bg-blue02 text-white p-6 rounded ">
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-gray-200">{content}</p>
        </div>
    );
}
