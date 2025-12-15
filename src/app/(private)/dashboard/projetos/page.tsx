'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import DocumentModal from '@/src/components/modals/DocumentModal';
import { mockProjectData } from '@/src/lib/mock-data';

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = mockProjectData;

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-6">

            {/* Conteúdo da sua página (Dashboard, Tabela, etc) */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-800">Painel do Projeto: {data.number}</h1>
                <p className="text-slate-500">Gerencie as medições e orçamentos deste contrato.</p>

                {/* === ABRIR MODAL === */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
                >
                    <FileText size={24} />
                    Abrir Central de Documentação
                </button>
            </div>

            {/* === O MODAL === */}
            <DocumentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={data}
            />

        </div>
    );
}