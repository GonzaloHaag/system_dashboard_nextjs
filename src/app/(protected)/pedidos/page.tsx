import { PedidosPageComponent, SearchBarAndButtons } from "@/components";

export default function PedidosPage() {
    return (
        <section className="w-full flex flex-col gap-y-6">
            <SearchBarAndButtons placeholder="Buscar pedido..." textButton="Nuevo pedido" linkHref='/pedidos/nuevo-pedido' />
            <hr />
            <PedidosPageComponent />
        </section>

    );
}