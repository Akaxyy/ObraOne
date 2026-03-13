import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { toProjectMutation, type Project, type ProjectFormData } from '@/src/types/projects'

export type UseProjectsReturn = {
  projects: Project[]
  loading: boolean
  saving: boolean
  error: string | null
  addProject: (data: ProjectFormData) => Promise<boolean>
  updateProject: (id: string, data: ProjectFormData) => Promise<boolean>
  deleteProject: (id: string) => Promise<boolean>
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = error.message

    if (typeof message === 'string') {
      return message
    }
  }

  return 'Erro inesperado ao processar projetos.'
}

export function useProjects(limit = 20): UseProjectsReturn {
  const [supabase] = useState(() => createClient())
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(limit)

      if (fetchError) {
        throw fetchError
      }

      setProjects(data ?? [])
    } catch (fetchError) {
      console.error('Error fetching projects:', fetchError)
      setError(getErrorMessage(fetchError))
    } finally {
      setLoading(false)
    }
  }, [limit, supabase])

  const runMutation = useCallback(
    async (mutation: () => Promise<{ error: { message: string } | null }>) => {
      setSaving(true)
      setError(null)

      try {
        const { error: mutationError } = await mutation()

        if (mutationError) {
          throw mutationError
        }

        await fetchProjects()
        return true
      } catch (mutationError) {
        console.error('Error mutating projects:', mutationError)
        setError(getErrorMessage(mutationError))
        return false
      } finally {
        setSaving(false)
      }
    },
    [fetchProjects]
  )

  const addProject = useCallback(
    async (data: ProjectFormData) => {
      const now = new Date().toISOString()

      return runMutation(() =>
        supabase.from('projects').insert({
          ...toProjectMutation(data),
          createdAt: now,
          updatedAt: now,
        })
      )
    },
    [runMutation, supabase]
  )

  const updateProject = useCallback(
    async (id: string, data: ProjectFormData) =>
      runMutation(() =>
        supabase
          .from('projects')
          .update({
            ...toProjectMutation(data),
            updatedAt: new Date().toISOString(),
          })
          .eq('id', id)
      ),
    [runMutation, supabase]
  )

  const deleteProject = useCallback(
    async (id: string) =>
      runMutation(() => supabase.from('projects').delete().eq('id', id)),
    [runMutation, supabase]
  )

  useEffect(() => {
    void fetchProjects()

    const channel = supabase
      .channel('projects-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
        },
        () => {
          void fetchProjects()
        }
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [fetchProjects, supabase])

  return {
    projects,
    loading,
    saving,
    error,
    addProject,
    updateProject,
    deleteProject,
  }
}
