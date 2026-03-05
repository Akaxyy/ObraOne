import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import type { Project, ProjectFormData } from '@/src/types/projects'

// Re-export types and utilities for backward compatibility
export type { Project, ProjectFormData } from '@/src/types/projects'
export { TEAM_OPTIONS, TEAM_COLORS, createEmptyFormData, projectToFormData } from '@/src/types/projects'
export { formatCurrency } from '@/src/lib/format'

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
    const supabase = useMemo(() => createClient(), [])

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
    }, [supabase, limit])

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
    }, [supabase])

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
    }, [supabase])

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
    }, [supabase])

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
    }, [supabase, fetchProjects])

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
