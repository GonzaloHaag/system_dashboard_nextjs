'use server';

import prisma from "@/lib/prisma";

export const getAllProducts = async (userId: number, searchQuery: string) => {
    try {

        const products = searchQuery === '' ? await prisma.product.findMany({
            where: {
                usuarioId: userId
            },
            select: {
                id: true,
                titulo: true,
                precio: true,
                stock: true,
                color:true,
                imagen: true,
                Category: {
                    select: {
                        nombre: true
                    }
                }
            }
        }) : await prisma.product.findMany({
            where: {
                usuarioId: userId,
                OR: [
                    {
                        titulo: {
                            contains: searchQuery,
                            mode: 'insensitive'
                        }
                    },
                    {
                        Category: {
                            nombre: {
                                contains: searchQuery,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]

            },
            select: {
                id: true,
                titulo: true,
                precio: true,
                stock: true,
                color:true,
                imagen: true,
                Category: {
                    select: {
                        nombre: true
                    }
                }
            }

        });
        return {
            ok:true,
            message:'Productos encontrados',
            products
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al obtener los productos'
        }
    }
}