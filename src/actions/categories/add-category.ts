'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../upload-image";


export const addCategory = async (userId: number, nombre: string, imagen: File | null) => {
    try {
        const imageUrl = imagen ? await uploadImage(imagen) : null;
        await prisma.category.create({
            data: {
                usuarioId: userId,
                nombre: nombre,
                imagen: imageUrl
            }
        })

        revalidatePath('/categorias');
        return {
            ok: true,
            message: 'Categoría creada!'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al agregar la categoría'
        }
    }
}

