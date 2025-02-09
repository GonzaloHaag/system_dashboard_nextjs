'use client';
import { useEffect, useState } from "react"
import { CardClientesActivos } from "./CardClientesActivos"
import { CardGanancias } from "./CardGanancias"
import { CardProductosTotales } from "./CardProductosTotales"
import { CardSales } from "./CardSales"
import { getDataAllDashboard } from "@/actions"
import { toast } from "sonner"

export const CardsContainer = ({ userId }: { userId: number }) => {

    const [totalCountSales, setTotalCountSales] = useState<number>(0);
    const [totalGanancias, setTotalGanancias] = useState<number>(0);
    const [productosTotales, setProductosTotales] = useState<number>(0);
    const [clientesActivos, setClientesActivos] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchDataDashboard = async () => {
            try {
                const responseDataDashboard = await getDataAllDashboard(userId);
                if (!responseDataDashboard.ok) {
                    toast.error(responseDataDashboard.message);
                    return
                }
                const { totalCountSales, totalGanancias, totalCountProducts, totalCountClientsActive } = responseDataDashboard;
                setTotalCountSales(totalCountSales || 0);
                setTotalGanancias(totalGanancias || 0);
                setProductosTotales(totalCountProducts || 0);
                setClientesActivos(totalCountClientsActive || 0);

            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchDataDashboard();
    }, [ userId ])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <CardSales totalCountSales={totalCountSales} isLoading={ isLoading } />
            <CardGanancias totalGanancias={totalGanancias} isLoading={ isLoading } />
            <CardProductosTotales productosTotales={productosTotales} isLoading={ isLoading } />
            <CardClientesActivos clientesActivos={clientesActivos} isLoading={ isLoading } />
        </div>
    )
}
