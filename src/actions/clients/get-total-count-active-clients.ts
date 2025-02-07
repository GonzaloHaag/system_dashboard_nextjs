'use server';

import prisma from "@/lib/prisma";

export const getTotalCountClientsActive = async(userId:number) => {
    try {

        const totalCount = await prisma.cliente.count({
            where : {
                usuarioId : userId,
                status:'Activo'
            }
        });
        
        return {
            ok:true,
            message:'Total de clientes activos obtenido',
            totalCount
        }
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener el total de clientes activos'
        }
    }
}