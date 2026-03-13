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
import { TEAM_OPTIONS, type ProjectTeam } from "@/src/types/projects";

const teamOptions = TEAM_OPTIONS.map((team) => ({
  value: team,
  label: team.replace("_", " "),
}));

interface MultiSelectFilterProps {
  selected: ProjectTeam[];
  onSelectionChange: (selected: ProjectTeam[]) => void;
  placeholder?: string;
}

export function MultiSelectFilter({
  selected,
  onSelectionChange,
  placeholder = "Filtrar equipe...",
}: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);

  const maxDisplay = 2;

  const handleSelect = (currentValue: ProjectTeam) => {
    const newSelected = selected.includes(currentValue)
      ? selected.filter((value) => value !== currentValue)
      : [...selected, currentValue];

    onSelectionChange(newSelected);
  };

  const handleRemove = (valueToRemove: ProjectTeam) => {
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
          className="w-full justify-between bg-white border-slate-300 hover:bg-slate-50 px-3"
        >
          <div className="flex gap-1 items-center overflow-hidden">
            {selected.length === 0 && (
              <span className="text-muted-foreground font-normal truncate">
                {placeholder}
              </span>
            )}

            {selected.slice(0, maxDisplay).map((value) => (
              <Badge
                variant="secondary"
                key={value}
                className="font-normal bg-slate-100 text-slate-700 border-slate-200 px-1.5 h-6 shrink-0"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemove(value);
                }}
              >
                {teamOptions.find((option) => option.value === value)?.label}
                <X className="ml-1 h-3 w-3 text-slate-400 hover:text-red-500 cursor-pointer" />
              </Badge>
            ))}

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
            {selected.length > 0 && (
              <div
                onClick={(event) => {
                  event.stopPropagation();
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
      <PopoverContent className="w-40 p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar equipe..." />
          <CommandList>
            <CommandEmpty>Nenhuma equipe encontrada.</CommandEmpty>
            <CommandGroup>
              {teamOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
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
