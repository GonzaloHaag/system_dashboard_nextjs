import { auth } from "@/auth.config";
import { SearchBarAndButtons, SkeletonTableClients, SkeletonTableProducts, TableClients, TableProducts } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export const metadata:Metadata = {
   title:'Productos'
}

export default async function ProductosPage(props:{
  searchParams?:Promise<{
    search?:string;
    page?:string;
  }>
}) {

  const session = await auth();
  if (!session?.user) {
    redirect('/login')
  }
  const userId = parseInt(session.user.id);

  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search ?? '';
  return (
    <section className="w-full flex flex-col gap-y-6">
      <SearchBarAndButtons placeholder="Buscar producto..." textButton="Nuevo producto" linkHref='/productos/nuevo-producto' />
      <Suspense key={ searchQuery } fallback={<SkeletonTableProducts />}>
        <TableProducts userId={userId} searchQuery={ searchQuery } />
      </Suspense>
    </section>
  );
}