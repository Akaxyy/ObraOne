'use client';

import React from 'react';
import { FileText, Printer, CheckSquare, Square, Eye, Menu } from 'lucide-react';
import { useDocumentPrint } from '@/src/hooks/useDocumentPrint';

export default function DocumentManager({ data }: { data: any }) {
    const {
        previewId, setPreviewId, selectedIds, toggleSelection, toggleSelectAll,
        handlePrint, printRef, documentsToPrint, activeDocLabel, PreviewComponent, docsConfig,
        zoom, zoomIn, zoomOut
    } = useDocumentPrint(data);

    return (
        // AQUI VOCÊ PODE MUDAR O LAYOUT LIVREMENTE
        <div className="flex h-[85vh] w-full bg-gray-50 overflow-hidden border border-gray-200">

            {/* === NOVA SIDEBAR MAIS BONITA === */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-6">
                    <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                        <div className="p-2 bg-blue-600 text-white rounded-lg"><FileText size={18} /></div>
                        Documentação
                    </h2>
                    <p className="text-gray-400 text-xs mt-2 pl-1">Gerencie a impressão</p>
                </div>

                {/* Lista Scrollável */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
                    {/* Botão Select All Moderno */}
                    <button onClick={toggleSelectAll} className="w-full mb-4 flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-colors uppercase tracking-wider">
                        {selectedIds.length === docsConfig.length ? <CheckSquare size={16} className="text-blue-600" /> : <Square size={16} />}
                        Selecionar Todos
                    </button>

                    {docsConfig.map((doc) => {
                        const isSelected = selectedIds.includes(doc.id);
                        const isPreviewing = previewId === doc.id;

                        return (
                            <div key={doc.id} className={`group flex items-center p-1 rounded-xl transition-all duration-300 ${isPreviewing ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                                {/* Checkbox de Impressão */}
                                <button onClick={() => toggleSelection(doc.id)} className="p-2">
                                    {isSelected
                                        ? <CheckSquare size={18} className="text-blue-600 drop-shadow-sm" />
                                        : <Square size={18} className="text-gray-300 group-hover:text-gray-400" />
                                    }
                                </button>

                                {/* Botão de Preview */}
                                <button onClick={() => setPreviewId(doc.id)} className={`flex-1 text-left py-2 px-2 text-sm rounded-lg transition-colors ${isPreviewing ? 'text-blue-700 font-semibold' : 'text-gray-600'}`}>
                                    {doc.label}
                                </button>

                                {isPreviewing && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse" />}
                            </div>
                        );
                    })}
                </div>

                {/* Footer da Sidebar com Botão Flutuante Style */}
                <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-50">
                    <button
                        onClick={() => handlePrint()}
                        disabled={selectedIds.length === 0}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    >
                        <Printer size={18} />
                        <span>Imprimir {selectedIds.length > 0 && <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1">{selectedIds.length}</span>}</span>
                    </button>
                </div>
            </aside>

            {/* === ÁREA DE PREVIEW (Fundo diferente, sombras melhores) === */}
            <main className="flex-1 bg-slate-100/50 relative overflow-hidden flex flex-col">
                {/* Header do Preview */}
                <header className="h-16 border-b flex justify-between items-center px-8">
                    <span>Visualizando: {activeDocLabel}</span>

                    {/* Controles de Zoom */}
                    <div className="flex items-center gap-2 bg-white rounded-lg border p-1 shadow-sm">
                        <button onClick={zoomOut} className="p-1 hover:bg-gray-100 rounded">-</button>
                        <span className="text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
                        <button onClick={zoomIn} className="p-1 hover:bg-gray-100 rounded">+</button>
                    </div>
                </header>

                {/* Canvas de Papel */}
                <div className="flex-1 overflow-auto flex justify-center p-8 custom-scrollbar">
                    <div
                        className="bg-white shadow-xl w-[210mm] min-h-[297mm] origin-top transition-transform duration-200"
                        style={{ transform: `scale(${zoom})` }} // Aqui aplica o zoom
                    >
                        {PreviewComponent ? <PreviewComponent data={data} /> : <div className="flex items-center justify-center h-96 text-gray-400">Selecione um documento</div>}
                    </div>
                </div>
            </main>

            {/* === ÁREA OCULTA DE IMPRESSÃO (Mantém a lógica intacta aqui) === */}
            <div className="hidden print:block">
                <div ref={printRef}>
                    {documentsToPrint.map((doc) => {
                        const Component = doc.component;
                        return (
                            <div key={doc.id} className="page-break">
                                <div className="w-full h-auto min-h-[297mm] bg-white relative">
                                    <Component data={data} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}