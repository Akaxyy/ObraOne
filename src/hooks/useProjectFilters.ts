import { useMemo, useState } from 'react'
import { type Project, type ProjectTeam } from '@/src/types/projects'

export type ProjectFilters = {
  projectName: string
  contract: string
  ss: string
  boletim: string
  teams: ProjectTeam[]
}

const defaultFilters: ProjectFilters = {
  projectName: '',
  contract: '',
  ss: '',
  boletim: '',
  teams: [],
}

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<ProjectFilters>(defaultFilters)

  const filteredProjects = useMemo(() => {
    const searchTerm = filters.projectName.trim().toLowerCase()
    const contractTerm = filters.contract.trim().toLowerCase()
    const ssTerm = filters.ss.trim().toLowerCase()
    const boletimTerm = filters.boletim.trim().toLowerCase()

    return projects.filter((project) => {
      if (searchTerm && !project.projectName.toLowerCase().includes(searchTerm)) {
        return false
      }

      if (contractTerm && !(project.contract ?? '').toLowerCase().includes(contractTerm)) {
        return false
      }

      if (ssTerm && !(project.budgetId ?? '').toLowerCase().includes(ssTerm)) {
        return false
      }

      if (boletimTerm && !(project.uniqueId ?? '').toLowerCase().includes(boletimTerm)) {
        return false
      }

      if (filters.teams.length > 0 && !project.team) {
        return false
      }

      if (filters.teams.length > 0 && !filters.teams.some((team) => team === project.team)) {
        return false
      }

      return true
    })
  }, [filters, projects])

  return {
    filters,
    setFilters,
    filteredProjects,
  }
}
