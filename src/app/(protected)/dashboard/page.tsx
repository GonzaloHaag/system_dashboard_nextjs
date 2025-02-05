import { auth } from "@/auth.config";
import { Card, SalesChart, SkeletonTableOrders, TableOrders, WinningsChart } from "@/components";
import { BadgeDollarSignIcon, BoxIcon, ShoppingBagIcon, UsersIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export default async function DashboardPage() {

  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const userId = parseInt(session.user.id);
  return (
    <section className="w-full flex flex-col gap-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card text="Ventas totales" count={'1,200'} Icon={ShoppingBagIcon} porcentaje={15.8} />
        <Card text="Total recaudado" count={'$83,560'} Icon={BadgeDollarSignIcon} porcentaje={-20.3} />
        <Card text="Clientes activos" count={'200'} Icon={UsersIcon} porcentaje={56.00} />
        <Card text="Productos totales" count={'620'} Icon={BoxIcon} porcentaje={100} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-neutral-900 font-medium text-lg text-center">Ventas totales</h2>
          <SalesChart />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-neutral-900 font-medium text-lg text-center">Ganancias totales</h2>
          <WinningsChart />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Órdenes recientes</h2>
        <Suspense fallback={<SkeletonTableOrders />}>
          <TableOrders userId={userId} />
        </Suspense>
      </div>
    </section>
  );
}