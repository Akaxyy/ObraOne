'use client'

import { useState, forwardRef, useImperativeHandle } from 'react'
import {
    type Project,
    type ProjectFormData,
    TEAM_OPTIONS,
    createEmptyFormData,
    projectToFormData,
} from '@/src/types/projects'
import { ProjectRow } from './ProjectRow'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/src/components/ui/dialog'
import Loading from "@/src/app/loading"

interface ProjectsContainerProps {
    projects: Project[]
    filteredProjects: Project[]
    loading: boolean
    saving: boolean
    error: string | null
    addProject: (data: ProjectFormData) => Promise<boolean>
    updateProject: (id: string, data: ProjectFormData) => Promise<boolean>
    deleteProject: (id: string) => Promise<boolean>
    selectedProject: Project | null
    onSelectProject: (project: Project | null) => void
}

export const ProjectsContainer = forwardRef<{ openAddDialog: () => void }, ProjectsContainerProps>(
    ({
        projects,
        filteredProjects,
        loading,
        saving,
        error,
        addProject,
        updateProject,
        deleteProject,
        selectedProject,
        onSelectProject
    }, ref) => {

        const [editingProject, setEditingProject] = useState<Project | null>(null)
        const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
        const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
        const [formData, setFormData] = useState<ProjectFormData>(createEmptyFormData())

        // Expose openAddDialog to parent via ref
        useImperativeHandle(ref, () => ({
            openAddDialog: () => {
                setFormData(createEmptyFormData())
                setIsAddDialogOpen(true)
            }
        }))

        const handleEdit = (project: Project) => {
            setEditingProject(project)
            setFormData(projectToFormData(project))
            setIsEditDialogOpen(true)
        }

        const handleSelect = (project: Project) => {
            // Toggle selection
            if (selectedProject?.id === project.id) {
                onSelectProject(null)
            } else {
                onSelectProject(project)
            }
        }

        const handleSave = async () => {
            if (!editingProject) return
            const success = await updateProject(editingProject.id, formData)
            if (success) {
                setIsEditDialogOpen(false)
                setEditingProject(null)
            }
        }

        const handleAdd = async () => {
            const success = await addProject(formData)
            if (success) {
                setIsAddDialogOpen(false)
                setFormData(createEmptyFormData())
            }
        }

        const handleDelete = async (id: string) => {
            if (!confirm('Tem certeza que deseja excluir este projeto?')) return
            await deleteProject(id)
            if (selectedProject?.id === id) onSelectProject(null)
        }

        return (
            <div className="flex flex-col h-full overflow-hidden">
                {/* Projects List - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 pb-24 scroll-smooth">
                    {error && (
                        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                            Erro: {error}
                        </div>
                    )}

                    {loading ? (
                        <Loading />
                    ) : filteredProjects.length === 0 ? (
                        <div className="bg-background border border-border rounded-lg p-8 text-center text-slate-500">
                            {projects.length === 0
                                ? 'Nenhum projeto encontrado. Clique em "Novo Projeto" para criar um.'
                                : 'Nenhum projeto corresponde aos filtros aplicados.'
                            }
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 transition-all duration-300">
                            {selectedProject ? (
                                // FOCUS MODE: Show only selected project
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <ProjectRow
                                        key={selectedProject.id}
                                        project={selectedProject}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onSelect={handleSelect}
                                        isSelected={true}
                                    />
                                </div>
                            ) : (
                                // LIST MODE: Show filtered projects with staggered animation
                                filteredProjects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                                        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                                    >
                                        <ProjectRow
                                            project={project}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onSelect={handleSelect}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Dialogs */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Editar Projeto</DialogTitle>
                        </DialogHeader>
                        <ProjectForm formData={formData} setFormData={setFormData} />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button onClick={handleSave} disabled={saving}>
                                {saving ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Novo Projeto</DialogTitle>
                        </DialogHeader>
                        <ProjectForm formData={formData} setFormData={setFormData} />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button onClick={handleAdd} disabled={saving || !formData.projectName}>
                                {saving ? 'Adicionando...' : 'Adicionar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
)

ProjectsContainer.displayName = 'ProjectsContainer'

// Form component
function ProjectForm({
    formData,
    setFormData,
}: {
    formData: ProjectFormData
    setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>
}) {
    return (
        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="projectName">Nome do Projeto</Label>
                <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="Digite o nome do projeto"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="tag">TAG</Label>
                <Input
                    id="tag"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="Ex: M-529"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="scope">Escopo</Label>
                <Input
                    id="scope"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    placeholder="Descreva o escopo"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="team">Equipe</Label>
                <select
                    id="team"
                    className="w-full border rounded-md p-2 text-sm"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                >
                    {TEAM_OPTIONS.map((team) => (
                        <option key={team} value={team}>
                            {team.replace('_', ' ')}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="valueBudget">Orçamento (R$)</Label>
                    <Input
                        id="valueBudget"
                        type="number"
                        value={formData.valueBudget}
                        onChange={(e) => setFormData({ ...formData, valueBudget: parseFloat(e.target.value) || 0 })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="valueRealized">Realizado (R$)</Label>
                    <Input
                        id="valueRealized"
                        type="number"
                        value={formData.valueRealized}
                        onChange={(e) => setFormData({ ...formData, valueRealized: parseFloat(e.target.value) || 0 })}
                    />
                </div>
            </div>
        </div>
    )
}
