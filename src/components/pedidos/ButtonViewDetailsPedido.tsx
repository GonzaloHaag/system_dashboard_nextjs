import { EyeIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog-order"
import { Pedido } from "@/interfaces"
import { FormatoMoneda } from "@/lib/FormatoMoneda"
import { MetodoPago } from "@/interfaces/pedido"

export const ButtonViewDetailsPedido = ({ pedido }: { pedido: Pedido }) => {
    const statusLabelMetodoPago: Record<MetodoPago, string> = {
        MercadoPago: 'Mercado pago',
        Transferencia: 'Transferencia',
        Efectivo: 'Efectivo',
        TarjetaCredito: 'Tarjeta de crédito',
        TarjetaDebito: 'Tarjeta de débito'
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" title="Ver detalles" className="outline-none">
                    <EyeIcon size={20} />
                </button>
            </DialogTrigger>
            <DialogContent className="text-sm">
                <DialogHeader>
                    <DialogTitle>Detalles del pedido #{pedido.id}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <h4 className="font-semibold">Cliente:</h4>
                        <p>{pedido.Cliente.nombre}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Productos:</h4>
                        <ul>
                            {
                                pedido.productos.map((producto, index) => (
                                    <li key={index}>
                                        {producto.product.titulo} x{producto.cantidad} - {FormatoMoneda(producto.product.precio)}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Dirección de envío:</h4>
                        {
                            pedido.Cliente.direccion ? (
                                <p>{pedido.Cliente.direccion} - {pedido.Cliente.ciudad}</p>
                            )
                                : (
                                    <p>{pedido.Cliente.ciudad}</p>
                                )
                        }
                    </div>
                    {
                        pedido.nota && (
                            <div>
                                <h4 className="font-semibold">Nota del pedido:</h4>
                                <p>{pedido.nota}</p>
                            </div>
                        )
                    }
                    <div>
                        <h4 className="font-semibold">Método de pago:</h4>
                        <p>{statusLabelMetodoPago[pedido.metodoPago]}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
