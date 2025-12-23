'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import DocumentManager from '../DocumentManager';

interface DocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}

export default function DocumentModal({ isOpen, onClose, data }: DocumentModalProps) {

    // Fecha com a tecla ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        // === 1. OVERLAY (Fundo Preto) ===
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity animate-in fade-in duration-200">

            {/* === 2. ÁREA DE CLIQUE PARA FECHAR (Opcional) === 
          Se clicar fora do modal, ele fecha.
      */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* === 3. CONTAINER DO MODAL === */}
            <div className="relative w-[95%] md:w-11/12 max-w-6xl 2xl:max-w-[1400px] bg-transparent pointer-events-none">

                {/* Botão de Fechar Flutuante (Lado de fora ou canto) */}
                <button
                    onClick={onClose}
                    className="pointer-events-auto absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors flex items-center gap-2 font-medium"
                >
                    Fechar <X size={24} />
                </button>

                {/* === 4. O SEU DOCUMENT MANAGER === 
            Note o 'pointer-events-auto' para reativar cliques dentro do modal
        */}
                <div className="pointer-events-auto shadow-2xl rounded-2xl overflow-hidden">
                    {/* Dica: O DocumentManager já tem altura fixa (h-[85vh]). 
                Isso é perfeito para modal. Não precisa mexer lá.
             */}
                    <DocumentManager data={data} />
                </div>
            </div>
        </div>
    );
}