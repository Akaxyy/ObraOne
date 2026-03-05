import { useState, useMemo } from 'react'
import type { Project } from '@/src/types/projects'

export type ProjectFilters = {
    projectName: string;
    teams: string[];
    ss: string;
    limit: string;
    status: string;
    unit: string;
};

export const defaultFilters: ProjectFilters = {
    projectName: "",
    teams: [],
    ss: "",
    limit: "20",
    status: "",
    unit: "maua",
};

export function useProjectFilters(projects: Project[]) {
    const [filters, setFilters] = useState<ProjectFilters>(defaultFilters)

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            // Filter by project name (case-insensitive)
            if (filters.projectName) {
                const searchTerm = filters.projectName.toLowerCase()
                const projectName = (project.projectName || '').toLowerCase()
                if (!projectName.includes(searchTerm)) {
                    return false
                }
            }

            // Filter by teams (if any selected, project must match one of them)
            if (filters.teams.length > 0) {
                const projectTeam = (project.team || '').toLowerCase()
                const matchesTeam = filters.teams.some(
                    (team) => team.toLowerCase() === projectTeam
                )
                if (!matchesTeam) {
                    return false
                }
            }

            // Add more filters here as needed (ss, status, etc.)
            // Note: ss, limit, status, unit filters are not yet implemented in the filtering logic
            // but the state is available for future expansion.

            return true
        })
    }, [projects, filters])

    return {
        filters,
        setFilters,
        filteredProjects,
    }
}
