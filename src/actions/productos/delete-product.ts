'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');
export const deleteProductWithId = async (productId: number, imagenProduct: string | null) => {
    try {


        // Verificar que no este en pedido
        const relatedPedido = await prisma.productosEnPedido.findMany({
            where: {
                productId: productId
            }
        });

        if (relatedPedido.length > 0) {
            return {
                ok: false,
                message: 'El producto no se puedo eliminar porque se encuentra en un pedido'
            }
        }

        if (imagenProduct) {
            const urlParts = imagenProduct.split('/');
            const fileName = urlParts[urlParts.length - 1]; // Obtiene "mekzpfdjhm1zshpzcfvb.png"
            const folderName = urlParts[urlParts.length - 2]; // Obtiene "sistema_pocho"
            const imageUrl = `${folderName}/${fileName.split('.')[0]}`; // "sistema_pocho/mekzpfdjhm1zshpzcfvb"
            await cloudinary.uploader.destroy(imageUrl);
        }
        await prisma.product.delete({
            where: {
                id: productId
            }
        });
        revalidatePath('/productos');
        return {
            ok: true,
            message: 'Producto eliminado correctamente!'
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al eliminar el producto'
        }
    }
}