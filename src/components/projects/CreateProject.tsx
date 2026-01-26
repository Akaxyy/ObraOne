import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import { MultiSelectFilter } from "./multi-select-filter";

// Filter state type for future expansion
export type ProjectFilters = {
    projectName: string;
    teams: string[];
    ss: string;          // For future use
    limit: string;       // For future use
    status: string;      // For future use
    unit: string;        // For future use
};

export const defaultFilters: ProjectFilters = {
    projectName: "",
    teams: [],
    ss: "",
    limit: "20",
    status: "",
    unit: "maua",
};

type CreateProjectButtonProps = {
    onAddClick?: () => void;
    showAddButton?: boolean;
    filters: ProjectFilters;
    onFiltersChange: (filters: ProjectFilters) => void;
};

export function CreateProjectButton({
    onAddClick,
    showAddButton = true,
    filters,
    onFiltersChange,
}: CreateProjectButtonProps) {

    const handleProjectNameChange = (value: string) => {
        onFiltersChange({ ...filters, projectName: value });
    };

    const handleTeamsChange = (teams: string[]) => {
        onFiltersChange({ ...filters, teams });
    };

    const handleSSChange = (value: string) => {
        onFiltersChange({ ...filters, ss: value });
    };

    const handleLimitChange = (value: string) => {
        onFiltersChange({ ...filters, limit: value });
    };

    const handleStatusChange = (value: string) => {
        onFiltersChange({ ...filters, status: value });
    };

    const handleUnitChange = (value: string) => {
        onFiltersChange({ ...filters, unit: value });
    };

    return (
        <div className="flex flex-col xl:flex-row gap-3 items-start xl:items-center w-full">
            {/* 1. Select Principal (Unit) */}
            <Select value={filters.unit} onValueChange={handleUnitChange}>
                <SelectTrigger className="w-full xl:w-[320px] h-10 bg-white border-slate-300">
                    <SelectValue placeholder="Selecione a unidade" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="maua">
                        (5900.0127251.24.2) RECAP Mauá - SP
                    </SelectItem>
                    <SelectItem value="cubatao">
                        RPBC Cubatão - SP
                    </SelectItem>
                </SelectContent>
            </Select>

            {/* Grupo de Inputs centrais */}
            <div className="flex gap-3 flex-1 w-full">
                <Input
                    placeholder="SS..."
                    value={filters.ss}
                    onChange={(e) => handleSSChange(e.target.value)}
                    className="w-20 bg-white border-slate-300"
                />

                <Input
                    placeholder="Nome do projeto..."
                    value={filters.projectName}
                    onChange={(e) => handleProjectNameChange(e.target.value)}
                    className="flex-1 bg-white border-slate-300"
                />

                <Input
                    value={filters.limit}
                    onChange={(e) => handleLimitChange(e.target.value)}
                    className="w-[60px] bg-white border-slate-300 text-center"
                />

                <Input
                    placeholder="Status"
                    value={filters.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-[100px] bg-white border-slate-300 hidden sm:block"
                />
            </div>

            {/* MultiSelect for Teams */}
            <div className="w-full xl:w-auto shrink-0">
                <MultiSelectFilter
                    selected={filters.teams}
                    onSelectionChange={handleTeamsChange}
                    placeholder="Filtrar Equipe..."
                />
            </div>

            {/* Botão de Ação */}
            {showAddButton && (
                <Button
                    onClick={onAddClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 shadow-sm w-full xl:w-auto mt-2 xl:mt-0"
                >
                    <Plus className="h-4 w-4" />
                    Novo Projeto
                </Button>
            )}
        </div>
    );
}
