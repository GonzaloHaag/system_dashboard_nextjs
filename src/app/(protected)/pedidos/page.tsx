import { auth } from "@/auth.config";
import { PedidosFetcher, PedidosFetcherSkeleton, SearchBarAndButtons } from "@/components";
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
    return (
        <section className="w-full flex flex-col gap-y-6">
            <SearchBarAndButtons placeholder="Buscar pedido..." textButton="Nuevo pedido" linkHref='/pedidos/nuevo-pedido' />
            <hr />
            <Suspense fallback={<PedidosFetcherSkeleton />}>
                <PedidosFetcher userId={ userId } />
            </Suspense>
        </section>

    );
}