'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../upload-image";

export const editCategoryWithId = async(userId:number,categoryId:number,nombre:string,imagen:File | null) => {
    try {

        const imageUrl = imagen ? await uploadImage(imagen) : null;

        await prisma.category.update({
            where : {
                id:categoryId
            },
            data : {
                usuarioId:userId,
                nombre:nombre,
                imagen:imageUrl
            }
        });

        revalidatePath('/categorias');

        return {
            ok:true,
            message:'Categoría editada correctamente!'
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al editar categoria'
        }
    }
}