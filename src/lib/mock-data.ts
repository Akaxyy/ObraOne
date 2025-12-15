// lib/mock-data.ts

// 1. Definição das Interfaces (Tipagem)
export interface InvoiceItem {
    type: 'header' | 'subheader' | 'item';
    description: string;
    unit?: string;
    qty?: number;
    unitPrice?: number;
    totalPrice?: number;
}

export interface Revision {
    rev: string;
    date: string;
    author: string;
    description: string;
}

export interface ProjectData {
    id: string;
    number: string;     // Ex: SS-107/2025
    contract: string;   // Ex: 5900.012...
    emissionDate: string;
    periodo: string;    // Ex: Semana 43 a 47

    // Envolvidos
    contratante: string;
    local: string;
    contratada: string;
    cnpjContratada: string;

    // Descritivos
    objeto: string;
    escopo: string;

    // Financeiro / Itens
    items: InvoiceItem[];
    totalValue: number;

    // Controle
    revisoes: Revision[];
}

// 2. O Objeto de Dados Fictício
export const mockProjectData: ProjectData = {
    id: "proj-001",
    number: "SS-107/2025 | PP-194",
    contract: "5900.0127251.24.2",
    emissionDate: "15/12/2025",
    periodo: "Semana 43.2025 a 47.2025",

    contratante: "PETRÓLEO BRASILEIRO S.A. - PETROBRAS",
    local: "RECAP Mauá - SP",
    contratada: "C3 ENGENHARIA & SOLUÇÕES INDUSTRIAIS LTDA",
    cnpjContratada: "12.345.678/0001-90",

    objeto: "Serviços de caldeiraria, complementar, mecânica, elétrica, instrumentação, automação, movimentação de cargas, planejamento de manutenção, manutenção de tanques, pequenas paradas e serviços de apoio para tratamento de despejos industriais.",

    escopo: "Pacote de serviços em HS para atendimento de demandas da rotina em atividades técnicas em eletricidade. Referente ao Boletim de Medição (BM) 18.",

    items: [
        // --- GRUPO 1 ---
        {
            type: 'header',
            description: '1. MÃO DE OBRA DIRETA'
        },
        {
            type: 'subheader',
            description: '1.1 Equipe de Elétrica e Instrumentação'
        },
        {
            type: 'item',
            description: '8.27 Hs1 - Eletricista Montador (Qualificado)',
            unit: 'Hs',
            qty: 422.000,
            unitPrice: 95.83,
            totalPrice: 40440.26
        },
        {
            type: 'item',
            description: '8.28 Hs1 - Auxiliar de Elétrica',
            unit: 'Hs',
            qty: 200.000,
            unitPrice: 55.20,
            totalPrice: 11040.00
        },
        {
            type: 'item',
            description: '8.29 Hs1 - Instrumentista Tubista',
            unit: 'Hs',
            qty: 150.500,
            unitPrice: 102.45,
            totalPrice: 15418.72
        },

        // --- GRUPO 2 ---
        {
            type: 'header',
            description: '2. EQUIPAMENTOS E FERRAMENTAS'
        },
        {
            type: 'subheader',
            description: '2.1 Locação de Maquinário'
        },
        {
            type: 'item',
            description: '12.05 - Caminhão Munck 12t (Com Operador)',
            unit: 'Dia',
            qty: 5.000,
            unitPrice: 1250.00,
            totalPrice: 6250.00
        },
        {
            type: 'item',
            description: '12.08 - Plataforma Elevatória Articulada (PTA)',
            unit: 'Dia',
            qty: 10.000,
            unitPrice: 450.00,
            totalPrice: 4500.00
        },

        // --- GRUPO 3 (Para testar scroll) ---
        {
            type: 'header',
            description: '3. MATERIAIS DE CONSUMO'
        },
        {
            type: 'item',
            description: 'Eletrodo 7018 - Lata 20kg',
            unit: 'Un',
            qty: 4.000,
            unitPrice: 320.00,
            totalPrice: 1280.00
        },
        {
            type: 'item',
            description: 'Disco de Corte 7" Inox',
            unit: 'Cx',
            qty: 12.000,
            unitPrice: 85.50,
            totalPrice: 1026.00
        },
    ],

    // Soma fictícia dos totais acima
    totalValue: 79954.98,

    revisoes: [
        {
            rev: "0",
            date: "01/12/2025",
            author: "Eng. Rafael Silva",
            description: "Emissão Inicial para aprovação."
        },
        {
            rev: "A",
            date: "10/12/2025",
            author: "Eng. Rafael Silva",
            description: "Ajuste no quantitativo de horas do Eletricista conforme RDO 45."
        },
        {
            rev: "B",
            date: "15/12/2025",
            author: "Coord. Ana Souza",
            description: "Inclusão de equipamentos de apoio (Munck)."
        }
    ]
};