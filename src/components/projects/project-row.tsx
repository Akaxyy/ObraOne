'use client'

import { useState, useMemo } from 'react'
import { Project, formatCurrency } from '@/src/hooks/useProjects'
import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'
import {
    ChevronDown,
    DollarSign,
    Wrench,
    Calendar,
    TrendingUp,
    Pencil,
    Trash2
} from 'lucide-react'
import { cn } from '@/src/lib/utils/utils'

interface ProjectRowProps {
    project: Project
    onEdit: (project: Project) => void
    onDelete: (id: string) => void
    onSelect?: (project: Project) => void
    isSelected?: boolean
}

function CircularProgress({ value }: { value: number }) {
    const radius = 16
    const circumference = 2 * Math.PI * radius
    const progress = Math.min(Math.max(value, 0), 100)
    const dashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    className="text-muted/20"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="24"
                    cy="24"
                />
                <circle
                    className="text-primary transition-all duration-500 ease-out"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="24"
                    cy="24"
                />
            </svg>
            <span className="absolute text-[10px] font-medium text-foreground">
                {Math.round(value)}%
            </span>
        </div>
    )
}

export function ProjectRow({ project, onEdit, onDelete, onSelect, isSelected }: ProjectRowProps) {
    const [isExpandedLocal, setIsExpandedLocal] = useState(false)
    const isExpanded = isSelected || isExpandedLocal

    // Memoized calculations for performance
    const percentage = useMemo(() => {
        if (!project.valueBudget || project.valueBudget <= 0) return 0
        return ((project.valueRealized || 0) / project.valueBudget) * 100
    }, [project.valueBudget, project.valueRealized])

    // Month values - ready for real data integration
    const valueMonthPredicted = project.valueRemaining ?? 0
    const valueMonthRealized = 0 // TODO: Replace with actual month data

    return (
        <div className={cn(
            "bg-background border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden",
            isSelected ? "border-blue-500 ring-1 ring-blue-500/20" : "border-border"
        )}>
            {/* Main Row Content */}
            <div
                className={cn(
                    "flex flex-col xl:flex-row items-start xl:items-center p-4 gap-5 cursor-pointer transition-colors",
                    isSelected ? "bg-blue-50/10" : "hover:bg-muted/50"
                )}
                onClick={() => onSelect ? onSelect(project) : setIsExpandedLocal(!isExpandedLocal)}
            >
                {/* 1. Progress Circle */}
                <div className="shrink-0 flex items-center justify-center">
                    <CircularProgress value={percentage} />
                </div>

                {/* 2. Main Info - Fixed Width to prevent cascading */}
                <div className="w-full xl:w-[320px] xl:shrink-0 space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground text-base tracking-tight line-clamp-1">
                            {project.projectName}
                        </h3>
                        {(new Date().getTime() - new Date(project.createdAt).getTime()) < 172800000 && (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-[10px] px-1.5 py-0 h-5 border-blue-100">
                                Novo
                            </Badge>
                        )}
                    </div>

                    {/* Linha de Subtítulo específica: TAG | ID | RO | Setor */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium flex-wrap">
                        <span className="text-foreground/80">{project.tag || 'S/ TAG'}</span>
                        <span className="text-muted-foreground/30">|</span>

                        <span>{project.budgetId ? `SS - ${project.budgetId}` : 'S/ ID'}</span>
                        <span className="text-muted-foreground/30">|</span>

                        <span>RO - </span>
                        <span className="text-muted-foreground/30">|</span>

                        <span>{project.sector || 'S/ Setor'}</span>
                    </div>
                </div>

                <div className="hidden xl:block w-px h-10 bg-border mx-2" />

                {/* 3. Metrics Columns Container - Grouped & Fixed */}
                <div className={cn("flex flex-col xl:flex-row gap-6 xl:gap-0", isSelected && "gap-2")}>

                    {/* Grupo 1: Totais (Orçado + Medido) */}
                    <div className={cn("flex items-center gap-6", isSelected && "gap-3")}>
                        {/* Orçado - Largura fixa */}
                        <div className="flex flex-col min-w-[120px]">
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1 uppercase tracking-wide">
                                <DollarSign className="w-3 h-3 opacity-70" />
                                <span>Orçado</span>
                            </div>
                            <span className="font-bold text-foreground text-sm">
                                {formatCurrency(project.valueBudget)}
                            </span>
                        </div>

                        {/* Total Medido - Largura fixa */}
                        <div className="flex flex-col min-w-[180px]">
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1 uppercase tracking-wide">
                                <Wrench className="w-3 h-3 opacity-70" />
                                <span>Total Medido</span>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="font-bold text-foreground text-sm">
                                    {formatCurrency(project.valueRealized)}
                                </span>
                                <span className="text-[10px] text-primary font-medium shrink-0">
                                    / {percentage.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Divisor Vertical entre grupos */}
                    <div className={cn("hidden xl:block w-px h-8 bg-border/80 mx-6 self-center", isSelected && "mx-3")} />

                    {/* Grupo 2: Mês (Previsto + Realizado) */}
                    <div className={cn("flex items-center gap-6", isSelected && "gap-3")}>
                        {/* Previsto no Mês - Largura fixa */}
                        <div className="flex flex-col min-w-[120px]">
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1 uppercase tracking-wide">
                                <Calendar className="w-3 h-3 opacity-70" />
                                <span>Previsto Mês</span>
                            </div>
                            <span className="font-bold text-foreground text-sm opacity-90">
                                {formatCurrency(valueMonthPredicted)}
                            </span>
                        </div>

                        {/* Realizado no Mês - Largura fixa */}
                        <div className="flex flex-col min-w-[120px]">
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1 uppercase tracking-wide">
                                <TrendingUp className="w-3 h-3 opacity-70" />
                                <span>Realizado Mês</span>
                            </div>
                            <span className="font-bold text-foreground text-sm opacity-90">
                                {formatCurrency(valueMonthRealized)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Spacer para empurrar conteúdo para esquerda e chevron para direita */}
                <div className="flex-1" />

                <div className="hidden xl:flex items-center justify-center shrink-0 w-8 h-8 rounded-full hover:bg-muted transition-colors">
                    <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-200", isExpanded && "transform rotate-180")} />
                </div>
            </div>

            {/* Expanded Content (Actions) */}
            {isExpanded && (
                <div className="border-t border-border bg-muted/20 p-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex flex-col gap-1 text-sm">
                            <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Escopo</span>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                {project.scope || 'Nenhum escopo definido para este projeto.'}
                            </p>
                        </div>

                        <div className="flex gap-2 self-start mt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-background hover:bg-muted text-foreground gap-1.5 border-border shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(project);
                                }}
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                Editar
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="gap-1.5 shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(project.id);
                                }}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Excluir
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
