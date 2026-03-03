"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Wrench, Scale, Bug, ChevronRight,
    FolderKanban, User, LogOut, MoreHorizontal, Settings
} from "lucide-react";
import { cn } from "@/src/lib/utils/utils";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from "@/src/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/src/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
//import { signOut } from "@/src/lib/better-auth/auth-client";

const navItems = [
    { title: "Projetos", icon: FolderKanban, url: "/dashboard/projetos" },
    {
        title: "Medições",
        icon: Wrench,
        items: [
            { title: "Itens", url: "/dashboard/medicoes/itens" },
            { title: "Boletins", url: "/dashboard/medicoes/boletins" },
            { title: "Acompanhamento", url: "/dashboard/medicoes/acompanhamentos" },
        ],
    },
    { title: "Administrador", icon: Scale, url: "/dashboard/admin" },
    { title: "Tickets", icon: Bug, url: "/dashboard/tickets" },
    { title: "Configurações", icon: Settings, url: "/dashboard/config" },
];

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { open, setOpen } = useSidebar();

    const handleSignOut = async () => {
        // await signOut({
        //     fetchOptions: { onSuccess: () => router.push("/sign-in") },
        // });
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader
                className={cn(
                    "bg-background border-b border-border flex items-center transition-all duration-300 ease-in-out",
                    open ? "h-14 justify-start px-4" : "h-12 justify-center px-2"
                )}
            >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-accent/50 active:bg-accent transition-colors rounded-md cursor-pointer outline-none focus-visible:ring-0 group-data-[collapsible=icon]:p-0!"
                        >
                            <a
                                href="/dashboard"
                                className="flex items-center w-full h-full outline-none overflow-hidden"
                            >
                                {/* Container interno */}
                                <div className={cn(
                                    "flex items-center min-w-0",
                                    open ? "mx-0" : "mx-auto"
                                )}>

                                    {/* "Obra" */}
                                    <div className={cn(
                                        "flex items-center overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
                                        open ? "max-w-20 mr-1 opacity-100" : "max-w-0 mr-0 opacity-0"
                                    )}>
                                        <span className="font-bold text-xl text-foreground tracking-tight">
                                            Obra
                                        </span>
                                    </div>

                                    {/* "One." */}
                                    <div className="flex items-baseline shrink-0">
                                        <span className={cn(
                                            "font-bold text-primary tracking-tight transition-all duration-300 ease-in-out",
                                            open ? "text-xl" : "text-base"
                                        )}>
                                            One
                                        </span>
                                        <div className={cn(
                                            "rounded-full bg-primary ml-0.5 mb-0.5 transition-all duration-300 ease-in-out",
                                            open ? "w-1.5 h-1.5" : "w-1 h-1"
                                        )} />
                                    </div>

                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-background">
                <SidebarGroup>
                    <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    // Always open Medições dropdown by default
                                    defaultOpen={item.title === "Medições" ? true : item.items?.some(sub => pathname === sub.url)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        {/* --- ITEM PRINCIPAL --- */}
                                        {item.items ? (
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    isActive={item.items.some(sub => pathname.startsWith(sub.url))}
                                                    onClick={() => setOpen(true)}
                                                    className="outline-none focus-visible:ring-0 text-muted-foreground hover:text-foreground data-[active=true]:text-primary data-[active=true]:font-medium transition-colors"
                                                >
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                        ) : (
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.title}
                                                isActive={pathname === item.url}
                                                // MESMA ALTERAÇÃO AQUI:
                                                className="outline-none focus-visible:ring-0 text-muted-foreground hover:text-foreground data-[active=true]:text-primary data-[active=true]:font-medium transition-colors"
                                            >
                                                <Link href={item.url!}>
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}

                                        {/* --- SUBITENS --- */}
                                        {item.items && (
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={pathname === subItem.url}
                                                                // ALTERAÇÃO NOS SUBITENS TAMBÉM:
                                                                className="text-muted-foreground hover:text-foreground data-[active=true]:text-primary"
                                                            >
                                                                <Link href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="bg-background border-t border-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground outline-none focus-visible:ring-0"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                        <User size={16} />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Thiago</span>
                                        <span className="truncate text-xs">Engenheiro</span>
                                    </div>
                                    <MoreHorizontal className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive cursor-pointer">
                                    <LogOut className="mr-2 size-4" />
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
