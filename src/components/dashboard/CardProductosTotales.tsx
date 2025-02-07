'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { BoxIcon } from "lucide-react";
import { getTotalProductsCount } from "@/actions";

export const CardProductosTotales = ({ userId }: { userId: number }) => {

    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const fetchCountProducts = async () => {
        try {
            setIsLoading(true);
            const response = await getTotalProductsCount(userId);
            if (!response.ok) {
                toast.error(response.message);
                return;
            }

            setTotalCount(response.totalCountProducts || 0)

        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCountProducts();
    }, [])
    return (
        <div className="bg-neutral-100 p-6 flex flex-col gap-y-6 shadow-md rounded fadeIn group hover:bg-neutral-900 transition-colors duration-200">
            <div className="flex items-center justify-between">
                <BoxIcon size={30} className="text-neutral-800 group-hover:text-neutral-200 transition-colors duration-200" />
                <span className="text-base text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200">Productos totales</span>
            </div>
            <div className="flex flex-col items-start gap-y-4">
                {
                    isLoading ? (
                        <Skeleton className="w-44 h-10" />
                    ) : (
                        <span className="font-medium text-3xl text-neutral-900 group-hover:text-neutral-200 transition-colors duration-200 w-40 h-10">{totalCount}</span>
                    )
                }
                <div className="flex items-center gap-x-2">
                    <Badge variant={'outline'}>
                        {
                            15.8 > 0 ? (
                                <span className="text-green-500">↗ {15.8}%</span>
                            )
                                :
                                (
                                    <span className="text-red-500">↘ {15.8}%</span>
                                )
                        }
                    </Badge>
                    <span className="text-neutral-400 text-sm">Último périodo</span>
                </div>
            </div>
        </div>
    )
}
