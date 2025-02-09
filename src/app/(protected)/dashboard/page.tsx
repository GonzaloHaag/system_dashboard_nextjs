import { auth } from "@/auth.config";
import { CardsContainer, SalesChart, SkeletonTableOrders, TableOrders, WinningsChart } from "@/components";
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
      <CardsContainer userId={ userId } />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-neutral-900 font-medium text-lg text-center">Ventas totales</h2>
          <SalesChart userId={ userId } />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-neutral-900 font-medium text-lg text-center">Ganancias totales</h2>
          <WinningsChart userId={ userId } />
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