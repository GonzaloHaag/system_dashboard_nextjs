'use server';

import prisma from "@/lib/prisma";

export const getAllCategories = async (userId: number, searchQuery: string) => {
    try {

        const categorias = searchQuery === '' ? await prisma.category.findMany({
            where: {
                usuarioId: userId
            },
            select: {
                id: true,
                nombre: true,
                imagen: true,
                createdAt: true
            },
            orderBy : {
                id:'asc'
            }
        }) : await prisma.category.findMany({
            where: {
                usuarioId: userId,
                nombre: {
                    contains: searchQuery,
                    mode: 'insensitive'
                }
            },
            select: {
                id: true,
                nombre: true,
                imagen: true,
                createdAt: true
            }
        });

        return {
            ok: true,
            message: 'Categorias obtenidas',
            categorias
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error al obtener las categorías'
        }
    }
}