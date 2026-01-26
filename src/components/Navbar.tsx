"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils/utils";
import React from "react";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

const routeMap: Record<string, string> = {
    dashboard: "Início",
    projetos: "Projetos",
    medicoes: "Medições",
    itens: "Itens",
    boletins: "Boletins",
    acompanhamentos: "Acompanhamentos",
    admin: "Administrador",
    tickets: "Tickets",
};

interface NavbarProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export default function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
        const isLast = index === segments.length - 1;

        return { href, label, isLast };
    });

    return (
        <nav className="h-full flex-1 px-4 flex items-center justify-between z-30">

            {/* --- BREADCRUMBS --- */}
            <div className="flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                        {index > 0 && (
                            <ChevronRight size={14} className="text-muted-foreground" />
                        )}

                        <Link
                            href={crumb.href}
                            className={cn(
                                "transition-colors duration-200",
                                crumb.isLast
                                    ? "font-semibold text-foreground pointer-events-none" // Último item (ativo)
                                    : "text-muted-foreground hover:text-foreground" // Itens anteriores (links)
                            )}
                        >
                            {crumb.label}
                        </Link>
                    </React.Fragment>
                ))}
            </div>

            {/* --- AVATAR --- */}
            <div className="flex items-center gap-4">
                { /* --- THEME TOGGLE --- */}
                <ModeToggle />

                {user?.image ? (
                    <Image
                        src={user.image}
                        alt={user.name || "Avatar"}
                        width={36}
                        height={36}
                        className="rounded-full object-cover border border-border cursor-pointer shadow-sm">
                    </Image>
                ) : (
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm cursor-pointer hover:bg-primary/90 transition-colors">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
            </div>
        </nav>
    );
}