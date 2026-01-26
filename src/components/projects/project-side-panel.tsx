import { Project } from "@/src/hooks/useProjects";
import { Button } from "@/src/components/ui/button";
import {
    Pencil,
    FileText,
    History,
    MessageSquare,
    GitBranch,
    Wrench,
    Send
} from "lucide-react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils/utils";

interface ProjectSidePanelProps {
    project: Project;
    onEdit: (project: Project) => void;
    isClosing?: boolean;
}

export function ProjectSidePanel({ project, onEdit, isClosing = false }: ProjectSidePanelProps) {
    return (
        <div className={cn(
            "w-full max-w-[300px] bg-background border-l border-border h-full flex flex-col shrink-0 min-h-0 overflow-hidden duration-300",
            isClosing
                ? "animate-out slide-out-to-right-10 fade-out"
                : "animate-in slide-in-from-right-10"
        )}>
            {/* Header */}
            <div className="p-2 border-b border-border shrink-0">
                <h2 className="text-lg font-semibold text-foreground">Painel do Projeto</h2>
                <p className="text-sm text-muted-foreground">Ferramentas e Colaboração</p>
            </div>

            <div className="flex-1 flex flex-col p-4 gap-6 overflow-hidden">
                {/* Actions Group */}
                <div className="space-y-3 shrink-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        <Wrench className="w-4 h-4" />
                        <span>Ações</span>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-12 text-foreground border-border hover:bg-muted/50 hover:text-primary transition-colors"
                        onClick={() => onEdit(project)}
                    >
                        <Pencil className="w-4 h-4" />
                        Editar projeto
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-12 text-foreground border-border hover:bg-muted/50 hover:text-primary transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        Gerar documentação
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-12 text-foreground border-border hover:bg-muted/50 hover:text-primary transition-colors"
                    >
                        <GitBranch className="w-4 h-4" />
                        Registrar revisão
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-12 text-foreground border-border hover:bg-muted/50 hover:text-primary transition-colors"
                    >
                        <History className="w-4 h-4" />
                        Histórico de Medição
                    </Button>
                </div>

                {/* Comments Section */}
                <div className="flex-1 flex flex-col min-h-0 bg-muted/20 rounded-xl border border-border overflow-hidden">
                    <div className="p-4 border-b border-border bg-background/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <MessageSquare className="w-4 h-4" />
                            <span>Comentários</span>
                        </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60 mt-10">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Nenhum comentário</p>
                                <p className="text-xs text-muted-foreground">Adicione um abaixo para iniciar</p>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="p-3 bg-background border-t border-border shrink-0">
                        <div className="relative flex items-center">
                            <Input
                                placeholder="Adicionar comentário..."
                                className="pr-12 bg-muted/30 border-border focus-visible:ring-primary/20"
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary hover:bg-muted/50"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

