'use client';
import { Column, Pedido } from "@/interfaces"
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { PedidoCard } from "./PedidoCard";
interface PedidosColumnProps {
    column: Column;
    pedidos: Pedido[];
}
export const PedidosColumn = ({ column, pedidos }: PedidosColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-center">{column.title}</h2>
            <div
                ref={setNodeRef}
                className="h-full min-h-[500px] w-full bg-muted/30 rounded-lg p-4 flex flex-col gap-2"
            >
                <SortableContext
                    items={pedidos.map(pedido => pedido.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {pedidos.map((pedido) => (
                        <PedidoCard key={pedido.id} pedido={pedido} />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}