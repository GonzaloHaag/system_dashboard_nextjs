'use server';

import prisma from "@/lib/prisma";

export const getTotalGanancias = async(userId:number) => {
    try {

        const totalGanancias = await prisma.venta.aggregate({
            where : {
              usuarioId:userId
            },
            _sum: {
                ganancias:true
            }
        });

        return {
            ok:true,
            message:'Ganancias obtenidas',
            total:totalGanancias._sum.ganancias
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener el total recaudado'
        }
    }
}