import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DOCS_CONFIG } from "@/src/lib/docs-registry";

export function useDocumentPrint(data: any) {
    const [previewId, setPreviewId] = useState(DOCS_CONFIG[0].id);
    const [selectedIds, setSelectedIds] = useState<string[]>([DOCS_CONFIG[0].id]);
    const [zoom, setZoom] = useState(1); // 1 = 100%
    const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.0)); // Max 200%
    const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5)); // Min 50%
    const printRef = useRef<HTMLDivElement>(null);

    const toggleSelection = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === DOCS_CONFIG.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(DOCS_CONFIG.map((d) => d.id));
        }
    };

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Documentacao-${data.number}`,
    });

    // Helpers para a UI
    const activeDocLabel = DOCS_CONFIG.find((d) => d.id === previewId)?.label;
    const PreviewComponent = DOCS_CONFIG.find((d) => d.id === previewId)?.component;

    // Documentos filtrados para impressão
    const documentsToPrint = DOCS_CONFIG.filter((doc) => selectedIds.includes(doc.id));

    return {
        // Estado
        previewId,
        setPreviewId,
        selectedIds,
        printRef,
        documentsToPrint,
        activeDocLabel,
        zoom,
        PreviewComponent,
        docsConfig: DOCS_CONFIG, // Expõe a config para a UI iterar

        // Ações
        toggleSelection,
        toggleSelectAll,
        handlePrint,
        zoomIn,
        zoomOut
    };
}