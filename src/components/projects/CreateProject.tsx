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
import { MultiSelectFilter } from "./MultiSelectFilter";
import { ProjectFilters } from "@/src/hooks/useProjectFilters";
import type { ProjectTeam } from "@/src/types/projects";

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

  const handleContractChange = (value: string) => {
    onFiltersChange({ ...filters, contract: value });
  };

  const handleSsChange = (value: string) => {
    onFiltersChange({ ...filters, ss: value });
  };

  const handleBoletimChange = (value: string) => {
    onFiltersChange({ ...filters, boletim: value });
  };

  const handleTeamsChange = (teams: ProjectTeam[]) => {
    onFiltersChange({ ...filters, teams });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 items-center w-full">
      <div className="w-full lg:w-70 shrink-0">
        <Select value={filters.contract} onValueChange={handleContractChange}>
          <SelectTrigger className="w-full bg-background border-border text-left">
            <SelectValue placeholder="Selecione o contrato..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RECAP - REFINARIA DE CAPUAVA">
              (5900.0127251.24.2) RECAP Mauá - SP
            </SelectItem>
            <SelectItem value="FAFEN - SE">
              (ET-9525.02-3210-940-1MT-003) FAFEN - SE
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full lg:w-25 shrink-0">
        <Input
          placeholder="SS..."
          value={filters.ss}
          onChange={(e) => handleSsChange(e.target.value)}
          className="w-full bg-background border-border"
        />
      </div>

      <div className="w-full flex-1 min-w-50">
        <Input
          placeholder="Nome do projeto..."
          value={filters.projectName}
          onChange={(e) => handleProjectNameChange(e.target.value)}
          className="w-full bg-background border-border"
        />
      </div>

      <div className="w-full lg:w-25 shrink-0">
        <Input
          placeholder="Boletim..."
          value={filters.boletim}
          onChange={(e) => handleBoletimChange(e.target.value)}
          className="w-full bg-background border-border"
        />
      </div>

      <div className="w-full lg:w-45 shrink-0">
        <MultiSelectFilter
          selected={filters.teams}
          onSelectionChange={handleTeamsChange}
          placeholder="Filtrar equipe..."
        />
      </div>

      {showAddButton && (
        <Button
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 shadow-sm w-full lg:w-auto shrink-0"
        >
          <Plus className="h-4 w-4" />
          Novo Projeto
        </Button>
      )}
    </div>
  );
}