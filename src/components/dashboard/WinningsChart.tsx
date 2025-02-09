'use client';
import { getDataAllDashboard } from "@/actions";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { FormatoMoneda } from "@/lib/FormatoMoneda";

export const WinningsChart = ({ userId }: { userId: number }) => {
    const [data, setData] = useState<{ name: string, Ganancias: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGananciasPorMes = async () => {
            try {
                setIsLoading(true);
                const response = await getDataAllDashboard(userId);
                if (!response.ok || !response.data) {
                    toast.error(response.message);
                    return;
                }

                setData(response.dataGananciasPorMes);

            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchGananciasPorMes();
    }, [ userId ]);
    return (
        <div className="w-full h-[400px]">
            {
                isLoading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    data.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gray-500">No hay datos disponibles para mostrar</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart width={150} height={40} data={data}>
                                <Bar dataKey="Ganancias" barSize={40} />
                                {/* <CartesianGrid strokeDasharray="1 1" /> */}
                                < XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip formatter={(value) => [`${FormatoMoneda(Number(value))}`, 'Total']} cursor={false} />
                            </BarChart>
                        </ResponsiveContainer >
                    )
                )
            }
        </div >
    )
}
