'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteClientWithId = async(clientId:number) => {
    try {

        await prisma.cliente.delete({
            where : {
                id:clientId
            }
        });

        revalidatePath('/clientes');
        return {
            ok:true,
            message:'Cliente eliminado!'
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al eliminar el cliente'
        }
    }
}