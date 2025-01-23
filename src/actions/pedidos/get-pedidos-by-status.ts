'use server';

import prisma from "@/lib/prisma";

export const getPedidosByStatus = async(userId:number,status:'pending' | 'inProgress' | 'completed') => {
    try {

        
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener los pedidos'
        }
    }
}