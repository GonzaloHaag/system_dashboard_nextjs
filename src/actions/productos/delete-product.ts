'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProductWithId = async(productId:number) => {
    try {
        await prisma.product.delete({
            where : {
                id : productId
            }
        });
        revalidatePath('/productos');
        return {
            ok:true,
            message:'Producto eliminado correctamente!'
        }
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al eliminar el producto'
        }
    }
}