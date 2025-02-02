import { getAllPedidos } from "@/actions";
import { auth } from "@/auth.config";
import { PedidosPageContainer, SearchBarAndButtons, SkeletonPedidosPageContainer } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

export const metadata: Metadata = {
    title: 'Pedidos'
}

export default async function PedidosPage() {

    const session = await auth();
    if (!session?.user) {
        redirect('/login')
    }
    const userId = parseInt(session.user.id);
    const respuesta = await getAllPedidos(userId);
    if (!respuesta.ok || !respuesta.pedidos) {
        toast.error(respuesta.message);
        return;
    }
    const { pedidos } = respuesta;
    return (
        <section className="w-full flex flex-col gap-y-6">
            <SearchBarAndButtons placeholder="Buscar pedido..." textButton="Nuevo pedido" linkHref='/pedidos/nuevo-pedido' />
            <hr />
            <Suspense fallback={<SkeletonPedidosPageContainer />}>
                <PedidosPageContainer initialPedidos={pedidos} />
            </Suspense>

        </section>

    );
}