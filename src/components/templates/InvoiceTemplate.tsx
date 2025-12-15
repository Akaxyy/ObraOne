import React from 'react';

// Interfaces baseadas nos dados da sua imagem
export interface InvoiceData {
    number: string;
    emissionDate: string;
    contratante: string;
    local: string;
    contrato: string;
    contratada: string;
    objeto: string;
    escopo: string;
    periodo: string;
    items: InvoiceItem[];
}

interface InvoiceItem {
    type: 'header' | 'subheader' | 'item';
    description?: string;
    unit?: string;
    qty?: number;
    unitPrice?: number;
    totalPrice?: number;
}

export const InvoiceTemplate = ({ data }: { data: InvoiceData }) => {
    // Cores baseadas na imagem (Azul escuro Engenharia)
    const borderClass = "border border-blue-900";
    const labelClass = "font-bold text-right pr-2 text-sm flex items-center justify-end w-32 shrink-0";
    const valueClass = "pl-2 text-sm flex items-center flex-1";

    return (
        <div className="w-full h-full p-8 font-sans flex flex-col justify-between">

            {/* Container Principal com Borda grossa azul e cantos arredondados */}
            <div className={`border-2 border-blue-900 rounded-lg overflow-hidden`}>

                {/* === HEADER === */}
                <div className="flex border-b-2 border-blue-900 h-24">
                    {/* Logo Box */}
                    <div className="w-48 flex items-center justify-center border-r border-blue-900 p-2">
                        {/* Placeholder para a logo C3 */}
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-900 text-white font-black text-4xl p-1 tracking-tighter">C3</div>
                            <div className="text-[0.6rem] leading-tight font-bold text-blue-900 uppercase">
                                Engenharia<br />& Soluções
                            </div>
                        </div>
                    </div>

                    {/* Title Box */}
                    <div className="flex-1 flex items-center justify-center text-blue-900 font-bold text-lg text-center px-4 uppercase leading-tight">
                        Orçamento | {data.number} | Atividade Técnica em Eletricidade - EEP
                    </div>

                    {/* Date Box */}
                    <div className="w-32 border-l border-blue-900 flex flex-col">
                        <div className="text-xs text-center pt-2">Emissão</div>
                        <div className="flex-1 flex items-center justify-center font-bold text-lg">
                            {data.emissionDate}
                        </div>
                    </div>
                </div>

                {/* === DADOS GERAIS (Grid estilo formulário) === */}
                <div className="text-sm">

                    {/* Linha: Contratante | Local | Contrato */}
                    <div className="flex border-b border-blue-900 min-h-[30px]">
                        <div className={labelClass}>Contratante</div>
                        <div className={`${valueClass} border-r border-blue-900`}>{data.contratante}</div>

                        <div className="flex w-[350px] shrink-0">
                            <div className="font-bold px-2 flex items-center bg-gray-50 border-r border-l border-blue-900">Local</div>
                            <div className="flex-1 flex items-center px-2 truncate border-r border-blue-900">{data.local}</div>

                            <div className="font-bold px-2 flex items-center bg-gray-50">Contrato</div>
                            <div className="flex-1 flex items-center justify-end px-2">{data.contrato}</div>
                        </div>
                    </div>

                    {/* Linha: Contratada */}
                    <div className="flex border-b border-blue-900 min-h-[30px]">
                        <div className={labelClass}>Contratada</div>
                        <div className={valueClass}>{data.contratada}</div>
                    </div>

                    {/* Linha: Objeto */}
                    <div className="flex border-b border-blue-900 py-2">
                        <div className={`${labelClass} self-start mt-1`}>Objeto</div>
                        <div className="pl-2 text-sm pr-2 text-justify leading-snug text-gray-800">
                            {data.objeto}
                        </div>
                    </div>

                    {/* Linha: Escopo */}
                    <div className="flex py-2">
                        <div className={`${labelClass} self-start mt-1`}>Escopo do projeto</div>
                        <div className="pl-2 text-sm pr-2 flex-1">
                            <p className="mb-2 leading-snug">{data.escopo}</p>
                            <p className="text-gray-600">{data.periodo}</p>
                        </div>
                    </div>
                </div>

                {/* === TABELA DE ITENS === */}
                <div className="border-t-2 border-blue-900">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-[#004aad] text-white font-bold text-xs uppercase text-left">
                                <th className="p-1 pl-2 w-14 border-r border-white/30 text-center">Item</th>
                                <th className="p-1 pl-2 border-r border-white/30">Descrição</th>
                                <th className="p-1 w-12 text-center border-r border-white/30">Unid</th>
                                <th className="p-1 w-20 text-center border-r border-white/30">Qnd</th>
                                <th className="p-1 w-24 text-right pr-2 border-r border-white/30">Preço Unid</th>
                                <th className="p-1 w-24 text-right pr-2">Preço Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, idx) => {
                                // Renderização condicional baseada no tipo de linha (Header cinza, Subheader azul claro, ou item normal)

                                if (item.type === 'header') {
                                    return (
                                        <tr key={idx} className="bg-gray-700 text-white font-bold text-xs">
                                            <td colSpan={6} className="p-1 pl-2">{item.description}</td>
                                        </tr>
                                    );
                                }

                                if (item.type === 'subheader') {
                                    return (
                                        <tr key={idx} className="bg-[#4287f5] text-white font-bold text-xs">
                                            <td colSpan={6} className="p-1 pl-2">{item.description}</td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr key={idx} className="text-xs border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-2 text-center font-semibold text-gray-700 border-r border-dotted border-gray-400">
                                            {/* Ex: 8.27 */}
                                            {item.description?.split(' ')[0]}
                                        </td>
                                        <td className="p-2 border-r border-dotted border-gray-400">
                                            {/* Remove o numero do inicio para a descricao */}
                                            {item.description?.substring(item.description.indexOf(' ') + 1)}
                                        </td>
                                        <td className="p-2 text-center border-r border-dotted border-gray-400">{item.unit}</td>
                                        <td className="p-2 text-center border-r border-dotted border-gray-400">{item.qty?.toFixed(3)}</td>
                                        <td className="p-2 text-right border-r border-dotted border-gray-400">
                                            {item.unitPrice && new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.unitPrice)}
                                        </td>
                                        <td className="p-2 text-right font-bold">
                                            {item.totalPrice && new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.totalPrice)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Espaço em branco no final para não cortar na impressão */}
            <div className="h-20"></div>
        </div>
    );
};