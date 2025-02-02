'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const editProductWithId = async(userId:number,productId:number,titulo:string,precio:number,stock:number,imagen:string | null,color:string,description:string,categoryId:number) => {
    try {

        const product = await prisma.product.findUnique({
            where : {
                id:productId
            }
        });
        if(!product) {
            return {
                ok:false,
                message:'El producto no existe'
            }
        }
        await prisma.product.update({
            where : {
                id : productId
            },
            data : {
                usuarioId:userId,
                titulo:titulo,
                precio:parseFloat(precio.toString()),
                stock:parseInt(stock.toString()),
                imagen:imagen,
                color:color,
                description:description,
                categoryId:categoryId
            }
        });

        revalidatePath('/productos');
        return {
            ok:true,
            message:'Producto editado correctamente!'
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al editar el producto'
        }
    }
}