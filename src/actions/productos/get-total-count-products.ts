'use server';

import prisma from "@/lib/prisma";

export const getTotalProductsCount = async(userId:number) => {
    try {

        const totalCountProducts = await prisma.product.count({
            where : {
                usuarioId : userId
            }
        });

        return {
            ok:true,
            message:'Productos totales obtenidos',
            totalCountProducts
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener el total de productos'
        }
    }
}