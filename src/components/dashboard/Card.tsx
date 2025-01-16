import { type LucideIcon } from "lucide-react";
import { Badge } from "../ui/badge";

interface CardProps {
    text: string;
    count: string;
    Icon: LucideIcon;
    porcentaje: number;
}
export const Card = ({ text, count, Icon, porcentaje }: CardProps) => {
    return (
        <div className="bg-neutral-100 p-6 flex flex-col gap-y-6 shadow-md rounded fadeIn group hover:bg-neutral-900 transition-colors duration-200">
            <div className="flex items-center justify-between">
                <Icon size={30} className="text-neutral-800 group-hover:text-neutral-200 transition-colors duration-200" />
                <span className="text-base text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200">{text}</span>
            </div>
            <div className="flex flex-col items-start gap-y-4">
                <span className="font-medium text-3xl text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200">{count}</span>
                <div className="flex items-center gap-x-2">
                    <Badge variant={'outline'}>
                        {
                            porcentaje > 0 ? (
                                <span className="text-green-500">↗ {porcentaje}%</span>
                            )
                                :
                                (
                                    <span className="text-red-500">↘ {porcentaje}%</span>
                                )
                        }
                    </Badge>
                    <span className="text-neutral-400 text-sm">Último mes</span>
                </div>
            </div>
        </div>
    )
}
