// ──────────────────────────────────────────────
// Project types, constants, and helper functions
// ──────────────────────────────────────────────

/** Represents a project row from the `projects` table in Supabase. */
export type Project = {
    id: string
    uniqueId: string | null
    budgetId: string | null
    contract: string | null
    projectName: string
    scope: string | null
    sector: string | null
    tag: string | null
    team: string | null
    valueBudget: number | null
    valueRealized: number | null
    valueRemaining: number | null
    slug: string | null
    createdAt: string
    updatedAt: string
}

/** Form data used when creating or editing a project. */
export type ProjectFormData = {
    projectName: string
    tag: string
    scope: string
    team: string
    valueBudget: number
    valueRealized: number
}

// ── Constants ────────────────────────────────

export const TEAM_OPTIONS = ['Rotina', 'Tanques', 'Paradas', 'Pacotes', 'BM_Anterior'] as const

export const TEAM_COLORS: Record<string, string> = {
    Rotina: 'bg-blue-500',
    Tanques: 'bg-green-500',
    Paradas: 'bg-orange-500',
    Pacotes: 'bg-purple-500',
    BM_Anterior: 'bg-gray-500',
}

// ── Helper functions ─────────────────────────

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
        tag: project.tag || '',
        scope: project.scope || '',
        team: project.team || 'Rotina',
        valueBudget: project.valueBudget || 0,
        valueRealized: project.valueRealized || 0,
    }
}
