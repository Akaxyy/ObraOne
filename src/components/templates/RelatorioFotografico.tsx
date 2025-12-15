import React from 'react';

export const RelatorioFotografico = ({ data }: { data: any }) => {
    return (
        // A classe w-full h-full garante que o template ocupe a folha A4 inteira
        <div className="w-full h-full p-8 font-sans bg-white text-black flex flex-col">

            {/* === 1. CABEÇALHO PADRÃO (Igual aos outros) === */}
            <div className="flex border-2 border-blue-900 h-24 mb-6 shrink-0">
                {/* Logo Box */}
                <div className="w-40 flex items-center justify-center border-r-2 border-blue-900 bg-gray-50">
                    <h1 className="font-black text-2xl text-blue-900 tracking-tighter">LOGO</h1>
                </div>
                {/* Título */}
                <div className="flex-1 flex flex-col justify-center items-center text-center px-2">
                    <h2 className="font-bold text-lg text-blue-900 uppercase">Relatório Fotográfico</h2>
                    <p className="text-xs text-gray-600">{data.objeto?.substring(0, 80)}...</p>
                </div>
                {/* Data */}
                <div className="w-32 border-l-2 border-blue-900 flex flex-col justify-center items-center bg-gray-50">
                    <span className="text-xs text-gray-500">Emissão</span>
                    <span className="font-bold">{data.emissionDate}</span>
                </div>
            </div>

            {/* === 2. CONTEÚDO DO DOCUMENTO (Aqui você cria livremente) === */}
            <div className="flex-1 border border-gray-300 p-4">

                <div className="mb-4 pb-2 border-b border-gray-200">
                    <h3 className="font-bold text-blue-800 uppercase text-sm">Registro de Atividades - {data.local}</h3>
                </div>

                {/* Exemplo: Grid de Fotos */}
                <div className="grid grid-cols-2 gap-6">

                    {/* FOTO 1 (Mockada ou vinda de data.fotos) */}
                    <div className="flex flex-col gap-1">
                        <div className="h-48 bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-400">
                            [FOTO 01]
                        </div>
                        <p className="text-xs font-bold">Foto 01: Início da montagem dos painéis.</p>
                    </div>

                    {/* FOTO 2 */}
                    <div className="flex flex-col gap-1">
                        <div className="h-48 bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-400">
                            [FOTO 02]
                        </div>
                        <p className="text-xs font-bold">Foto 02: Passagem de cabeamento.</p>
                    </div>

                    {/* FOTO 3 */}
                    <div className="flex flex-col gap-1">
                        <div className="h-48 bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-400">
                            [FOTO 03]
                        </div>
                        <p className="text-xs font-bold">Foto 03: Testes de continuidade.</p>
                    </div>

                    {/* FOTO 4 */}
                    <div className="flex flex-col gap-1">
                        <div className="h-48 bg-gray-200 border border-gray-400 flex items-center justify-center text-gray-400">
                            [FOTO 04]
                        </div>
                        <p className="text-xs font-bold">Foto 04: Finalização e limpeza.</p>
                    </div>

                </div>

                {/* Rodapé da página */}
                <div className="mt-auto pt-10 text-center">
                    <p className="text-xs text-gray-400">Página 1 de 1 - {data.contrato}</p>
                </div>

            </div>
        </div>
    );
};