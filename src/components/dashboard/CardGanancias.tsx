'use client';
import { BadgeDollarSignIcon } from "lucide-react";
import { FormatoMoneda } from "@/lib/FormatoMoneda";
import { Skeleton } from "../ui/skeleton";

export const CardGanancias = ({ totalGanancias, isLoading }: { totalGanancias: number, isLoading: boolean }) => {

    return (
        <div className="bg-neutral-100 p-6 flex flex-col gap-y-6 shadow-md rounded fadeIn group hover:bg-neutral-900 transition-colors duration-200">
            <div className="flex items-center justify-between">
                <BadgeDollarSignIcon size={30} className="text-neutral-800 group-hover:text-neutral-200 transition-colors duration-200" />
                <span className="text-base text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200">Total recaudado</span>
            </div>
            <div className="flex flex-col items-start gap-y-4">
                {
                    isLoading ? (
                        <Skeleton className="w-40 h-10" />
                    ) : (
                        <span className="font-medium text-3xl text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200 w-40 h-10">{FormatoMoneda(totalGanancias)}</span>
                    )
                }
                <div className="flex items-center gap-x-2">
                    <span className="text-neutral-400 text-sm">Último périodo</span>
                </div>
            </div>
        </div >
    )
}
