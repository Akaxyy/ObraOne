"use client";

import React from "react";
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
        <div
            className={cn("border rounded-md border-border bg-background shadow-sm", className)}
        >
            <div className="flex flex-row items-center gap-3 px-3 py-2 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {icon}
                </div>

                <div className="flex flex-col justify-center h-full">
                    <span className="text-[14px] text-muted-foreground tracking-wide">
                        {label}
                    </span>

                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[16px] font-bold text-foreground leading-none mt-0.5">
                            {value}
                        </span>

                        {subValue && (
                            <span className="text-xs text-muted-foreground font-normal leading-none">
                                / {subValue}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}