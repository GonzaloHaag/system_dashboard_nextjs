'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const addProduct = async(userId:number,titulo:string,precio:number,costo:number,stock:number,color:string,categoryId:number) => {
    try {
        await prisma.product.create({
            data : {
                usuarioId:userId,
                titulo:titulo,
                precio:parseFloat(precio.toString()),
                costo:parseFloat(costo.toString()),
                stock:parseInt(stock.toString()),
                color:color,
                categoryId:categoryId
            }
        });
        revalidatePath('/productos');
        return {
            ok:true,
            message:'Producto creado correctamente!'
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al crear el producto'
        }
    }
}