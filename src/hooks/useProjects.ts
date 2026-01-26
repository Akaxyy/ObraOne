import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/src/lib/supabase/supabase'

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

export type ProjectFormData = {
    projectName: string
    tag: string
    scope: string
    team: string
    valueBudget: number
    valueRealized: number
}

export type UseProjectsReturn = {
    // State
    projects: Project[]
    loading: boolean
    saving: boolean
    lastUpdate: Date | null
    error: string | null

    // Actions
    addProject: (data: ProjectFormData) => Promise<boolean>
    updateProject: (id: string, data: ProjectFormData) => Promise<boolean>
    deleteProject: (id: string) => Promise<boolean>
    refreshProjects: () => Promise<void>
}

export function useProjects(limit: number = 20): UseProjectsReturn {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
    const [error, setError] = useState<string | null>(null)

    // Fetch projects
    const fetchProjects = useCallback(async () => {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
            .from('projects')
            .select('*')
            .order('createdAt', { ascending: false })
            .limit(limit)

        if (fetchError) {
            console.error('Error fetching projects:', fetchError)
            setError(fetchError.message)
        } else {
            setProjects(data || [])
        }
        setLoading(false)
    }, [limit])

    // Add project
    const addProject = useCallback(async (data: ProjectFormData): Promise<boolean> => {
        setSaving(true)
        setError(null)

        const { error: insertError } = await supabase.from('projects').insert({
            projectName: data.projectName,
            tag: data.tag || null,
            scope: data.scope || null,
            team: data.team,
            valueBudget: data.valueBudget,
            valueRealized: data.valueRealized,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })

        setSaving(false)

        if (insertError) {
            console.error('Error adding project:', insertError)
            setError(insertError.message)
            return false
        }

        return true
    }, [])

    // Update project
    const updateProject = useCallback(async (id: string, data: ProjectFormData): Promise<boolean> => {
        setSaving(true)
        setError(null)

        const { error: updateError } = await supabase
            .from('projects')
            .update({
                projectName: data.projectName,
                tag: data.tag || null,
                scope: data.scope || null,
                team: data.team,
                valueBudget: data.valueBudget,
                valueRealized: data.valueRealized,
                updatedAt: new Date().toISOString(),
            })
            .eq('id', id)

        setSaving(false)

        if (updateError) {
            console.error('Error updating project:', updateError)
            setError(updateError.message)
            return false
        }

        return true
    }, [])

    // Delete project
    const deleteProject = useCallback(async (id: string): Promise<boolean> => {
        setSaving(true)
        setError(null)

        const { error: deleteError } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

        setSaving(false)

        if (deleteError) {
            console.error('Error deleting project:', deleteError)
            setError(deleteError.message)
            return false
        }

        return true
    }, [])

    // Initial fetch and Realtime subscription
    useEffect(() => {
        fetchProjects()

        // Subscribe to Realtime changes
        const channel = supabase
            .channel('projects-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'projects',
                },
                (payload) => {
                    setLastUpdate(new Date())

                    if (payload.eventType === 'INSERT') {
                        setProjects((prev) => [payload.new as Project, ...prev])
                    } else if (payload.eventType === 'UPDATE') {
                        setProjects((prev) =>
                            prev.map((p) =>
                                p.id === (payload.new as Project).id
                                    ? (payload.new as Project)
                                    : p
                            )
                        )
                    } else if (payload.eventType === 'DELETE') {
                        setProjects((prev) =>
                            prev.filter((p) => p.id !== (payload.old as Project).id)
                        )
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [fetchProjects])

    return {
        projects,
        loading,
        saving,
        lastUpdate,
        error,
        addProject,
        updateProject,
        deleteProject,
        refreshProjects: fetchProjects,
    }
}

// Utility constants
export const TEAM_OPTIONS = ['Rotina', 'Tanques', 'Paradas', 'Pacotes', 'BM_Anterior'] as const

export const TEAM_COLORS: Record<string, string> = {
    Rotina: 'bg-blue-500',
    Tanques: 'bg-green-500',
    Paradas: 'bg-orange-500',
    Pacotes: 'bg-purple-500',
    BM_Anterior: 'bg-gray-500',
}

// Utility functions
export function formatCurrency(value: number | null): string {
    if (value === null || value === undefined) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)
}

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
