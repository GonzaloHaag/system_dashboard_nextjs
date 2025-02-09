'use client';
import { getDataAllDashboard } from '@/actions';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';


export const SalesChart = ({ userId }: { userId: number }) => {


    const [data, setData] = useState<{ name: string, ventas: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVentasPorMes = async () => {
            try {
                setIsLoading(true);
                const response = await getDataAllDashboard(userId);
                if (!response.ok || !response.data) {
                    toast.error(response.message);
                    return;
                }

                setData(response.data);

            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchVentasPorMes();
    }, [ userId ]);
    return (
        <div className='w-full h-[400px]'>
            {
                isLoading ? (
                    <Skeleton className='w-full h-full' />
                ) : (
                    data.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gray-500">No hay datos disponibles para mostrar</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="ventas" stroke="#8884d8" fill="#1d4ed8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )
                )
            }
        </div>
    )
}
