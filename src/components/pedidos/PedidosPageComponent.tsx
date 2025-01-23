'use client';

import { useState } from "react";
import { Pedido } from "@/interfaces";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { PedidoCard } from "./PedidoCard";
import { PedidosColumn } from "./PedidosColumn";
export const initialOrders: Pedido[] = [
  {
    id: '1',
    title: 'Pedido #1234',
    customer: 'John Doe',
    status: 'pending',
    date: '2024-01-17'
  },
  {
    id: '2',
    title: 'Pedido #1235',
    customer: 'Jane Smith',
    status: 'in-progress',
    date: '2024-01-17'
  },
  {
    id: '3',
    title: 'Pedido #1236',
    customer: 'Bob Johnson',
    status: 'completed',
    date: '2024-01-17'
  },
]

export const columns = [
  {
    id: 'pending',
    title: 'Pendientes'
  },
  {
    id: 'in-progress',
    title: 'En proceso'
  },
  {
    id: 'completed',
    title: 'Completados'
  },
] as const

export const PedidosPageComponent = () => {
    const [orders, setOrders] = useState(initialOrders)
    const [activeOrder, setActiveOrder] = useState<Pedido | null>(null)

    // Configure sensors for drag and drop
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 8,
            },
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        const order = orders.find((order) => order.id === event.active.id)
        if (order) {
            setActiveOrder(order)
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        const activeOrder = orders.find((order) => order.id === active.id)
        const overColumn = columns.find((col) => col.id === over.id)

        if (!activeOrder || !overColumn) return

        setOrders(orders.map((order) => {
            if (order.id === activeOrder.id) {
                return {
                    ...order,
                    status: overColumn.id
                }
            }
            return order
        }))

        setActiveOrder(null)
    }

    const getColumnOrders = (columnId: string) => {
        return orders.filter((order) => order.status === columnId)
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <section className="w-full flex flex-col gap-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {columns.map((column) => (
                        <PedidosColumn
                            key={column.id}
                            column={column}
                            pedidos={getColumnOrders(column.id)}
                        />
                    ))}
                </div>
            </section>
            <DragOverlay>
                {activeOrder ? <PedidoCard pedido={activeOrder} /> : null}
            </DragOverlay>
        </DndContext>
    )
}
