"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { cn } from "@/src/lib/utils/utils";

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    subValue?: string;
    className?: string;
}

export function MetricCard({ icon, label, value, subValue, className }: MetricCardProps) {
    return (
        <Card
            shadow="sm"
            radius="md"
            // bg-background e border-border já garantem a adaptação do card
            className={cn("border rounded-md border-border bg-background", className)}
        >
            <CardBody className="flex-row items-center gap-3 px-3 py-2 overflow-hidden">
                {/* 1. bg-blue-50 -> bg-primary/10: Fundo suave baseado na cor da marca 
                   2. Adicionei text-primary para garantir que o ícone fique na cor certa se não tiver classe própria
                */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {icon}
                </div>

                <div className="flex flex-col justify-center h-full">
                    {/* 3. text-slate-500 -> text-muted-foreground: Texto secundário padrão */}
                    <span className="text-[14px] text-muted-foreground tracking-wide">
                        {label}
                    </span>

                    <div className="flex items-baseline gap-1.5">
                        {/* 4. text-slate-800 -> text-foreground: Garante contraste (preto no light, branco no dark) */}
                        <span className="text-[16px] font-bold text-foreground leading-none mt-0.5">
                            {value}
                        </span>

                        {subValue && (
                            // 5. text-slate-400 -> text-muted-foreground: Texto de apoio
                            <span className="text-xs text-muted-foreground font-normal leading-none">
                                / {subValue}
                            </span>
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}