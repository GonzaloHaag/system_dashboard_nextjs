'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


interface AddPedidoProps {
    userId: number;
    clienteId: number;
    ordersItems: { productId: number, quantity: number }[];
    estado: 'pending' | 'inProgress' | 'completed';
    fechaEntrega: string;
    nota: string;
    metodoPago:'TarjetaCredito' | 'TarjetaDebito' | 'MercadoPago' | 'Efectivo' | 'Transferencia'
}

export const addPedido = async ({ userId, clienteId, ordersItems, estado, fechaEntrega, nota,metodoPago }: AddPedidoProps) => {
    try {

        const productsIds = ordersItems.map((orderItem) => orderItem.productId);
        // Verificamos que existan en la DB
        const productsDB = await prisma.product.findMany({
            where: {
                id: {
                    in: productsIds
                }
            },
            select: {
                id: true,
                precio: true,
                stock:true
            }
        });
        const stockErrors = ordersItems.some(orderItem => {
            const product = productsDB.find(p => p.id === orderItem.productId);
            return !product || product.stock < orderItem.quantity;
        });
        
        if (stockErrors) {
            return {
                ok:false,
                message:'Uno o más productos no tienen suficiente stock.'
            }
        }
        // if (productsDB.length !== productsIds.length) {
        //     throw new Error("Uno o más productos seleccionados no existen.");
        // }

        const totalPriceOrder = ordersItems.reduce((total, item) => {
            const product = productsDB.find((p) => p.id === item.productId);
            if (!product) {
                throw new Error("Producto no encontrado");
            }
            return total + (product.precio * item.quantity);
        }, 0);

        const totalProducts = ordersItems.reduce((sum, item) => sum + item.quantity, 0);

        await prisma.pedido.create({
            data: {
                usuarioId: userId,
                clienteId: clienteId,
                //Productos hace referencia a la relacion de productosEnPedido
                productos: {
                    create: ordersItems.map((orderItem) => ({
                        productId: orderItem.productId,
                        cantidad: orderItem.quantity
                    }))
                },
                status: estado,
                fechaEntrega: new Date(fechaEntrega),
                nota: nota,
                metodoPago:metodoPago,
                totalPrice: totalPriceOrder,
                totalProducts: totalProducts

            }
        });

        // Descontar stock
        await Promise.all(
            ordersItems.map((orderItem) => prisma.product.update({
                where: {
                    id: orderItem.productId
                },
                data: {
                    stock: {
                        decrement: orderItem.quantity
                    }
                }
            }))
        );
        revalidatePath('/pedidos');
        revalidatePath('/productos'); //Por el stock

        return {
            ok:true,
            message:'Pedido creado correctamente'
        }

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Ocurrió un error al crear el pedido'
        }
    }
}