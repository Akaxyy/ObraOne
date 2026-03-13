import type { Database } from '@/src/types/supabase'

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']

export type ProjectFormData = {
  projectName: string
  tag: string
  scope: string
  team: string
  valueBudget: number
  valueRealized: number
}

export const TEAM_OPTIONS = ['Rotina', 'Tanques', 'Paradas', 'Pacotes', 'BM_Anterior'] as const

export type ProjectTeam = typeof TEAM_OPTIONS[number]

export function createEmptyFormData(): ProjectFormData {
  return {
    projectName: '',
    tag: '',
    scope: '',
    team: 'Rotina',
    valueBudget: 0,
    valueRealized: 0,
  }
}

export function projectToFormData(project: Project): ProjectFormData {
  return {
    projectName: project.projectName,
    tag: project.tag ?? '',
    scope: project.scope ?? '',
    team: project.team ?? 'Rotina',
    valueBudget: project.valueBudget ?? 0,
    valueRealized: project.valueRealized ?? 0,
  }
}

export function toProjectMutation(
  data: ProjectFormData
): Pick<ProjectInsert, 'projectName' | 'scope' | 'tag' | 'team' | 'valueBudget' | 'valueRealized'> {
  return {
    projectName: data.projectName.trim(),
    tag: data.tag.trim() || null,
    scope: data.scope.trim() || null,
    team: data.team || null,
    valueBudget: data.valueBudget,
    valueRealized: data.valueRealized,
  }
}