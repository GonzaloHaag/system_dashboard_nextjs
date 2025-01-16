'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategoryWithId = async(categoryId:number) => {
    try {

        await prisma.category.delete({
            where : {
                id:categoryId
            }
        });

        revalidatePath('/categorias');

        return {
            ok:true,
            message:'Categoria eliminada!'
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Categoria eliminada!'
        }
    }
}