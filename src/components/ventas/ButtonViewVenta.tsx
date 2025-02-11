'use client';
import { EyeIcon } from "lucide-react";
import { Dialog, DialogContent,DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog-order";
import { MetodoPago } from "@/interfaces/pedido";
import { FormatoMoneda } from "@/lib/FormatoMoneda";

type Cliente = {
    nombre: string;
}
type ProductosEnVenta = {
    id: number;
    cantidad: number;
    product: {
        titulo: string;
        precio: number;
        costo: number;
    };
}
interface Props {
    venta: {
        id: number;
        usuarioId: number;
        clienteId: number;
        precioTotal: number;
        ganancias: number | null;
        fecha: Date;
        metodoPago: MetodoPago;
        Cliente: Cliente;
        ProductosEnVenta: ProductosEnVenta[];
    }
    metodoPagoLabel: Record<MetodoPago, string>;
}
export const ButtonViewVenta = ({ venta, metodoPagoLabel }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" title="Ver detalles" className="outline-none">
                    <EyeIcon className="text-green-500" />
                </button>
            </DialogTrigger>
            <DialogContent className="text-sm">
                <DialogHeader>
                    <DialogTitle>Detalles de la venta #{venta.id}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <h4 className="font-semibold">Cliente:</h4>
                        <p>{venta.Cliente.nombre}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Productos:</h4>
                        <ul>
                            {
                                venta.ProductosEnVenta.map((producto, index) => (
                                    <li key={index}>
                                        {producto.product.titulo} x{producto.cantidad} - {FormatoMoneda(producto.product.precio)}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Método de pago:</h4>
                        <p>{metodoPagoLabel[venta.metodoPago]}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Total:</h4>
                        <p>{FormatoMoneda(venta.precioTotal)}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Ganancia:</h4>
                        <p>{FormatoMoneda(venta.ganancias || 0)}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
