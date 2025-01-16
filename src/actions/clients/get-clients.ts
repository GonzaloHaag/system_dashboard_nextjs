'use server';

import prisma from "@/lib/prisma";


export const getAllClients = async(userId:number,searchQuery:string) => {
    try {
        const clients = searchQuery === '' ? await prisma.cliente.findMany({
            where : {
                usuarioId : userId
            }, 
            select : {
                id:true,
                nombre:true,
                ciudad:true,
                createdAt:true,
                status:true,
            },
            orderBy : {
                id:'asc'
            }
        }) : await prisma.cliente.findMany({
            where : {
                usuarioId : userId,
                nombre : {
                    contains : searchQuery,
                    mode:'insensitive'
                }
            }, 
            select : {
                id:true,
                nombre:true,
                ciudad:true,
                createdAt:true,
                status:true,
            },
            orderBy : {
                id:'asc'
            }
        });

        return {
            ok:true,
            message:'Clientes obtenidos',
            clients
        }
        
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'Error al obtener los clientes'
        }
    }
}