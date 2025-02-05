'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../upload-image";

export const addProduct = async(userId:number,titulo:string,precio:number,stock:number,imagen:File | null,color:string,description:string,categoryId:number) => {
    try {

        const imageUrl = imagen ? await uploadImage(imagen) : null;
        await prisma.product.create({
            data : {
                usuarioId:userId,
                titulo:titulo,
                precio:parseFloat(precio.toString()),
                stock:parseInt(stock.toString()),
                imagen:imageUrl,
                color:color,
                description:description,
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