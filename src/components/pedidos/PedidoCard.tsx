'use client';
import { Pedido } from '@/interfaces'
import { useSortable } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CSS } from '@dnd-kit/utilities';
interface PedidoCardProps {
    pedido: Pedido;
}

export const PedidoCard = ({ pedido }: PedidoCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: pedido.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      }
    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
        >
            <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium">{pedido.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex flex-col gap-2">
                <div className="text-sm text-muted-foreground">
                    Cliente: {pedido.customer}
                </div>
                <div className="text-sm text-muted-foreground">
                    Fecha: {pedido.date}
                </div>
            </CardContent>
        </Card>
    )
}
