"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import React from "react";

// Mapa para traduzir as rotas (opcional, mas deixa mais bonito)
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

export default function Navbar() {
    const pathname = usePathname();

    // Divide a URL em segmentos (ex: ['dashboard', 'projetos'])
    const segments = pathname.split("/").filter(Boolean);

    // Gera o breadcrumb acumulando os caminhos
    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
        const isLast = index === segments.length - 1;

        return { href, label, isLast };
    });

    return (
        <nav className="h-16 w-full px-6 border-b border-neutral-200 bg-white flex items-center justify-between shrink-0 z-30">

            {/* --- ESQUERDA: BREADCRUMBS --- */}
            <div className="flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                        {index > 0 && (
                            <ChevronRight size={14} className="text-neutral-400" />
                        )}

                        <Link
                            href={crumb.href}
                            className={cn(
                                "transition-colors duration-200",
                                crumb.isLast
                                    ? "font-semibold text-neutral-900 pointer-events-none" // Último item (ativo)
                                    : "text-neutral-500 hover:text-neutral-900" // Itens anteriores (links)
                            )}
                        >
                            {crumb.label}
                        </Link>
                    </React.Fragment>
                ))}
            </div>

            {/* --- DIREITA: PERFIL / AVATAR --- */}
            <div className="flex items-center gap-4">
                {/* Avatar "TH" igual à foto image_47384f.png */}
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer hover:bg-blue-700 transition-colors">
                    TH
                </div>
            </div>
        </nav>
    );
}