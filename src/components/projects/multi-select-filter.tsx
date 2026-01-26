"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/src/lib/utils/utils";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";

// Team options based on TEAM_OPTIONS from useProjects
const teamOptions = [
    { value: "rotina", label: "Rotina" },
    { value: "pacote", label: "Pacote" },
    { value: "tanques", label: "Tanques" },
    { value: "bm_anterior", label: "BM Anterior" },
    { value: "parada", label: "Parada" },
];

interface MultiSelectFilterProps {
    selected: string[];
    onSelectionChange: (selected: string[]) => void;
    placeholder?: string;
}

export function MultiSelectFilter({
    selected,
    onSelectionChange,
    placeholder = "Filtrar Equipe..."
}: MultiSelectFilterProps) {
    const [open, setOpen] = React.useState(false);

    const maxDisplay = 2;

    const handleSelect = (currentValue: string) => {
        const newSelected = selected.includes(currentValue)
            ? selected.filter((value) => value !== currentValue)
            : [...selected, currentValue];
        onSelectionChange(newSelected);
    };

    const handleRemove = (valueToRemove: string) => {
        onSelectionChange(selected.filter((value) => value !== valueToRemove));
    };

    const handleClear = () => onSelectionChange([]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-10 w-full md:w-[280px] justify-between bg-white border-slate-300 hover:bg-slate-50 px-3"
                >
                    <div className="flex gap-1 items-center overflow-hidden">
                        {selected.length === 0 && (
                            <span className="text-muted-foreground font-normal truncate">
                                {placeholder}
                            </span>
                        )}

                        {/* Renderiza apenas os primeiros 'maxDisplay' itens */}
                        {selected.slice(0, maxDisplay).map((val) => (
                            <Badge
                                variant="secondary"
                                key={val}
                                className="font-normal bg-slate-100 text-slate-700 border-slate-200 px-1.5 h-6 shrink-0"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(val);
                                }}
                            >
                                {teamOptions.find((f) => f.value === val)?.label}
                                <X className="ml-1 h-3 w-3 text-slate-400 hover:text-red-500 cursor-pointer" />
                            </Badge>
                        ))}

                        {/* Renderiza o contador (+X) se houver mais itens */}
                        {selected.length > maxDisplay && (
                            <Badge
                                variant="secondary"
                                className="bg-slate-100 text-slate-500 border-slate-200 px-1.5 h-6 shrink-0"
                            >
                                +{selected.length - maxDisplay}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center ml-auto">
                        {/* Botãozinho X para limpar tudo se tiver seleção */}
                        {selected.length > 0 && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }}
                                className="mr-2 cursor-pointer text-slate-400 hover:text-red-500"
                            >
                                <X className="h-4 w-4" />
                            </div>
                        )}
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Buscar equipe..." />
                    <CommandList>
                        <CommandEmpty>Nenhuma equipe encontrada.</CommandEmpty>
                        <CommandGroup>
                            {teamOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            selected.includes(option.value)
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <Check className={cn("h-4 w-4 text-white")} />
                                    </div>
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}