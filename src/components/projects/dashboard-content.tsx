'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Wrench, TrendingUp } from "lucide-react"
import { MetricCard } from "@/src/components/projects/metric-card"
import { ProjectsContainer } from "@/src/components/projects/projects-container"
import { ProjectSidePanel } from "@/src/components/projects/project-side-panel"
import { Project } from "@/src/hooks/useProjects"
import { useSidebar } from "@/src/components/ui/sidebar"

export function DashboardContent() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [displayedProject, setDisplayedProject] = useState<Project | null>(null)
    const [isClosing, setIsClosing] = useState(false)

    const { state: sidebarState, setOpen: setSidebarOpen } = useSidebar()

    // Close Side Panel when Sidebar opens
    useEffect(() => {
        if (sidebarState === 'expanded' && selectedProject !== null) {
            // Trigger close animation
            setIsClosing(true)
            setSelectedProject(null)
            setTimeout(() => {
                setDisplayedProject(null)
                setIsClosing(false)
            }, 1)
        }
    }, [sidebarState])

    const handleSelectProject = (project: Project | null) => {
        if (project === null && selectedProject !== null) {
            setIsClosing(true)
            setSelectedProject(null)
            setTimeout(() => {
                setDisplayedProject(null)
                setIsClosing(false)
            }, 1)
        } else if (project !== null) {
            // Opening Side Panel: close Sidebar first
            setSidebarOpen(false)
            setDisplayedProject(project)
            setSelectedProject(project)
            setIsClosing(false)
        }
    }

    // Determine if side panel space should be shown (either open or closing)
    const showSidePanelSpace = displayedProject !== null

    return (
        <div className="flex h-full overflow-hidden">
            {/* Left Column: Main Content (Header, Metrics, Projects) */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ease-out">
                {/* Header Title Section */}
                <div className="bg-background pl-4 p-2 flex border-b border-border flex-col shrink-0">
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">
                        Projetos
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Gerencie e acompanhe todos os seus projetos em um só lugar.
                    </p>
                </div>

                {/* Metric Grid */}
                <div className="bg-background p-4 border-b border-border grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                    <MetricCard
                        icon={<DollarSign className="h-4 w-4 text-blue-600" />}
                        label="Orçamento Total"
                        value="R$177.494.731,56"
                    />
                    <MetricCard
                        icon={<Wrench className="h-4 w-4 text-blue-600" />}
                        label="Realizado Total"
                        value="R$64.395.563,40"
                    />
                    <MetricCard
                        icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
                        label="Realizado no Mês"
                        value="R$0,00"
                        subValue="R$3.726.668,37"
                    />
                </div>

                {/* Projects Container - includes FilterBar + ProjectsList */}
                <ProjectsContainer
                    selectedProject={selectedProject}
                    onSelectProject={handleSelectProject}
                />
            </div>

            {/* Right Column: Side Panel wrapper with animated width */}
            <div
                className={`shrink-0 transition-all duration-300 ease-out overflow-hidden ${showSidePanelSpace ? 'w-[300px]' : 'w-0'
                    }`}
            >
                {displayedProject && (
                    <ProjectSidePanel
                        project={displayedProject}
                        onEdit={() => { }}
                        isClosing={isClosing}
                    />
                )}
            </div>
        </div>
    )
}
