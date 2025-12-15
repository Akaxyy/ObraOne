import React from 'react';

import { InvoiceTemplate } from '@/src/components/templates/InvoiceTemplate';
import { CapaOrcamento } from '@/src/components/templates/HeaderOrcamento';
import { HistoricoRevisoes } from '@/src/components/templates/HistoricoRevisoes';
import { MemorialCalculo } from "@/src/components/templates/Memorial";
import { RelatorioFotografico } from '@/src/components/templates/RelatorioFotografico';

export const DOCS_CONFIG = [
    {
        id: 'capa',
        label: '1. Capa do Orçamento',
        component: CapaOrcamento
    },
    {
        id: 'orcamento',
        label: '2. Orçamento Detalhado',
        component: InvoiceTemplate
    },
    {
        id: 'historico',
        label: '3. Histórico de Revisões',
        component: HistoricoRevisoes
    },
    {
        id: 'memorial',
        label: '4. Memorial Descritivo',
        component: MemorialCalculo
    },
    {
        id: 'fotos',
        label: '5. Relatório Fotográfico',
        component: RelatorioFotografico
    },
];