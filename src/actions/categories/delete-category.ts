'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteCategoryWithId = async (categoryId: number, imagenCategory: string | null) => {
    try {

        const relatedProducts = await prisma.product.findMany({
            where : {
                categoryId : categoryId
            }
        });

        if(relatedProducts.length > 0) {
            return {
                ok:false,
                message:'La categoría no se puede eliminar porque tiene productos asociados.'
            }
        }

        // Borrar imagen de cloudinary 
        if (imagenCategory) {
            const urlParts = imagenCategory.split('/');
            const fileName = urlParts[urlParts.length - 1]; // Obtiene "mekzpfdjhm1zshpzcfvb.png"
            const folderName = urlParts[urlParts.length - 2]; // Obtiene "sistema_pocho"
            const imageUrl = `${folderName}/${fileName.split('.')[0]}`; // "sistema_pocho/mekzpfdjhm1zshpzcfvb"
            await cloudinary.uploader.destroy(imageUrl);
        }
        await prisma.category.delete({
            where: {
                id: categoryId
            }
        });

        revalidatePath('/categorias');

        return {
            ok: true,
            message: 'Categoria eliminada!'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Categoria eliminada!'
        }
    }
}