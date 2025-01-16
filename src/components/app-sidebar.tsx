'use client';

import { ClipboardListIcon, LayoutDashboardIcon, LayoutPanelTopIcon, ReceiptIcon, UsersIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    {
        title:'Dashboard',
        path:'/dashboard',
        icon: LayoutDashboardIcon
    },
    {
        title:'Clientes',
        path:'/clientes',
        icon: UsersIcon
    },
    {
        title:'Categorías',
        path:'/categorias',
        icon: UsersIcon
    },
    {
        title:'Productos',
        path:'/productos',
        icon: LayoutPanelTopIcon
    },
    {
        title:'Pedidos',
        path:'/pedidos',
        icon: ClipboardListIcon
    },
    {
        title:'Ventas',
        path:'/ventas',
        icon: ReceiptIcon
    },
]
export function AppSideBar() {

    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                Logo
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Aplicación
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {
                            items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.path} title={item.title} className={`transition-colors duration-200 ${pathname === item.path ? 'bg-slate-900 text-slate-100 hover:bg-slate-800 hover:text-slate-100' : 'bg-inherit'}`}>
                                          <item.icon />
                                          <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}