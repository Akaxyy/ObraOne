"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Wrench, Scale, Bug, ChevronRight,
    FolderKanban, User
} from "lucide-react";
import { cn } from "@/src/lib/utils";

type NavItem = {
    label: string;
    icon: React.ElementType;
    href?: string;
    subItems?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
    { label: "Projetos", icon: FolderKanban, href: "/dashboard/projetos" },
    {
        label: "Medições",
        icon: Wrench,
        subItems: [
            { label: "Itens", href: "/dashboard/medicoes/itens" },
            { label: "Boletins", href: "/dashboard/medicoes/boletins" },
            { label: "Acompanhamento", href: "/dashboard/medicoes/acompanhamentos" },
        ],
    },
    { label: "Administrador", icon: Scale, href: "/dashboard/admin" },
    { label: "Tickets", icon: Bug, href: "/dashboard/tickets" },
];

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
    const pathname = usePathname();
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsExpanded(true);
        }, 200);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsExpanded(false);
        setOpenSubmenus([]);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    const toggleSubmenu = (label: string) => {
        if (!isExpanded) {
            setIsExpanded(true);
            setOpenSubmenus([label]);
            return;
        }
        setOpenSubmenus((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        );
    };

    return (
        <aside
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "flex flex-col h-screen z-40 relative bg-white border-r border-neutral-200",
                "transition-[width] duration-300 ease-in-out will-change-[width]",
                isExpanded ? "w-[200px]" : "w-[68px]"
            )}
        >
            {/* --- LOGO AREA --- */}
            <div className={cn(
                "h-16 flex items-center border-b border-neutral-100 shrink-0 overflow-hidden relative",
                // Mantido exatamente como solicitado: alinhado à esquerda com padding 4
                "justify-start pl-4"
            )}>
                <Link href="/dashboard" className="flex items-center overflow-hidden whitespace-nowrap outline-none">

                    {/* Parte "Obra" - Slide suave */}
                    <div
                        className={cn(
                            "flex items-center justify-end overflow-hidden transition-all duration-300 ease-in-out",
                            // Removi o blur e efeitos extras, mantendo apenas opacidade e largura
                            isExpanded ? "max-w-12 opacity-100" : "max-w-0 opacity-0"
                        )}
                    >
                        {/* Fonte Bold padrão (mesmo peso do One) */}
                        <span className="font-bold text-xl text-neutral-900 tracking-tight">Obra</span>
                    </div>

                    {/* Parte "One" - Estática */}
                    <div className="flex items-baseline">
                        {/* Removi o font-black exagerado e drop-shadow */}
                        <span className="font-bold text-xl text-blue-600 tracking-tight">One</span>

                        {/* O Ponto (.) - Aparece suavemente */}
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full bg-blue-600 ml-0.5 mb-0.5 transition-all duration-300",
                            isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        )} />
                    </div>
                </Link>
            </div>

            {/* --- NAVIGATION --- */}
            <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 no-scrollbar overflow-x-hidden">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = item.href ? pathname === item.href : false;
                    const hasSubmenu = item.subItems && item.subItems.length > 0;
                    const isSubmenuActive = hasSubmenu && item.subItems!.some(sub => pathname === sub.href);
                    const activeState = isActive || isSubmenuActive;
                    const isSubmenuOpen = openSubmenus.includes(item.label);

                    return (
                        <div key={index} className="flex flex-col px-2">
                            <button
                                onClick={() => (hasSubmenu ? toggleSubmenu(item.label) : null)}
                                className={cn(
                                    "relative flex items-center h-10 rounded-md transition-all duration-200 group/item outline-none overflow-hidden select-none",
                                    activeState
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                                )}
                            >
                                {/* Container do Ícone - Centralizado na largura fechada (52px = 68px total - 16px padding) */}
                                <div className="w-[52px] flex items-center justify-center shrink-0">
                                    <Icon size={19} className="transition-transform duration-300" />
                                </div>

                                {/* Container do Texto */}
                                <div
                                    className={cn(
                                        "flex items-center overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap",
                                        isExpanded ? "w-full opacity-100 translate-x-0" : "w-0 opacity-0"
                                    )}
                                >
                                    <span className="text-[13px] font-medium tracking-tight">
                                        {item.label}
                                    </span>
                                </div>

                                {/* Seta do Submenu */}
                                {hasSubmenu && (
                                    <div
                                        className={cn(
                                            "absolute right-2 transition-all duration-300",
                                            isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                                        )}
                                    >
                                        <ChevronRight
                                            size={14}
                                            className={cn(
                                                "transition-transform duration-300 text-neutral-400",
                                                isSubmenuOpen && "rotate-90 text-blue-600"
                                            )}
                                        />
                                    </div>
                                )}

                                {!hasSubmenu && item.href && (
                                    <Link href={item.href} className="absolute inset-0 z-20" aria-label={item.label} />
                                )}
                            </button>

                            {/* --- SUBMENU --- */}
                            <div
                                className={cn(
                                    "grid transition-all duration-300 ease-in-out",
                                    isExpanded && isSubmenuOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <div className="flex flex-col gap-0.5 border-l border-neutral-200 ml-[27px] pl-3 mb-1">
                                        {item.subItems?.map((subItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                href={subItem.href}
                                                className={cn(
                                                    "py-1.5 px-3 text-[12px] rounded-md transition-colors duration-200 whitespace-nowrap block truncate",
                                                    pathname === subItem.href
                                                        ? "text-blue-700 font-medium bg-blue-50/50"
                                                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                                                )}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* --- USER PROFILE --- */}
            <div className="p-2 border-t border-neutral-100 shrink-0 overflow-hidden bg-white">
                <div className={cn(
                    "flex items-center gap-2 rounded-lg p-1.5 transition-colors",
                    isExpanded ? "hover:bg-neutral-50" : ""
                )}>
                    {/* Avatar Simples (Sem gradiente) */}
                    <div className="w-10 flex items-center justify-center shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                            <User size={16} />
                        </div>
                    </div>

                    <div className={cn(
                        "flex flex-col overflow-hidden transition-all duration-300 whitespace-nowrap",
                        isExpanded ? "w-full opacity-100" : "w-0 opacity-0"
                    )}>
                        <p className="text-[13px] font-semibold text-neutral-800 leading-none mb-0.5">Thiago</p>
                        <p className="text-[11px] text-neutral-500 leading-none">Engenheiro</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}