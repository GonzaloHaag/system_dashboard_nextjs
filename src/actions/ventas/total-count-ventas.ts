'use server';

import prisma from "@/lib/prisma";

export const getTotalCountVentas = async(userId:number) => {
    try {

        const totalCountSales = await prisma.venta.count({
            where : {
                usuarioId : userId
            }
        });

        return {
            ok:true,
            message:'Total de ventas obtenido',
            totalCountSales
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'No se pudo obtener el total de ventas'
        }
    }
}