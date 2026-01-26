import { AppSidebar } from "@/src/components/AppSidebar"; // O arquivo novo acima
import Navbar from "@/src/components/Navbar";
import { auth } from "@/src/lib/better-auth/auth";
import { headers } from "next/headers";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/src/components/ui/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return (
        // O Provider gerencia o estado (aberto/fechado) e cookies automaticamente
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />

            {/* SidebarInset é a área principal de conteúdo que se ajusta à sidebar */}
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-border bg-background px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="h-4 w-px bg-border mx-2" />
                    <Navbar user={session?.user} />
                </header>

                <main className="flex-1 flex flex-col pt-0 bg-muted/40 overflow-y-auto">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}