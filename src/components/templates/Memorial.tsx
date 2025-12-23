import React from 'react';

export const MemorialCalculo = ({ data }: { data: any }) => {
    return (
        <div className="max-w-5xl mx-auto p-8 space-y-8 text-slate-800">

            {/* Título */}
            <header className="border-b border-blue-200 pb-4">
                <h1 className="text-3xl font-bold text-blue-700">
                    Memorial de Cálculo
                </h1>
                <p className="text-sm text-blue-500 mt-1">
                    Documento técnico para apresentação gerencial
                </p>
            </header>

            {/* Introdução */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                    1. Objetivo
                </h2>
                <p className="leading-relaxed">
                    Este memorial de cálculo tem como objetivo apresentar, de forma clara
                    e estruturada, os critérios técnicos, premissas adotadas e métodos de
                    cálculo utilizados no desenvolvimento do projeto, garantindo
                    transparência, rastreabilidade e confiabilidade das informações para
                    tomada de decisão estratégica.
                </p>
            </section>

            {/* Premissas */}
            <section>
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    2. Premissas Consideradas
                </h2>

                <ul className="list-disc list-inside space-y-2">
                    <li>Dados operacionais fornecidos pelas áreas responsáveis.</li>
                    <li>Parâmetros técnicos baseados em normas e boas práticas do setor.</li>
                    <li>Período de análise previamente definido e validado.</li>
                    <li>Margens de segurança aplicadas conforme criticidade do processo.</li>
                </ul>
            </section>

            {/* Metodologia */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    3. Metodologia de Cálculo
                </h2>

                <p className="leading-relaxed mb-4">
                    A metodologia adotada baseia-se na consolidação dos dados coletados,
                    aplicação de fórmulas matemáticas apropriadas e validação dos
                    resultados por meio de análise comparativa e consistência lógica.
                </p>

                <p className="leading-relaxed">
                    Todos os cálculos foram realizados considerando cenários conservadores,
                    visando minimizar riscos operacionais e financeiros.
                </p>
            </section>

            {/* Resultados */}
            <section>
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    4. Resultados Obtidos
                </h2>

                <p className="leading-relaxed">
                    Os resultados indicam que os valores apurados atendem aos critérios
                    estabelecidos no escopo do projeto, demonstrando viabilidade técnica e
                    aderência aos parâmetros definidos inicialmente.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    4. Resultados Obtidos
                </h2>

                <p className="leading-relaxed">
                    Os resultados indicam que os valores apurados atendem aos critérios
                    estabelecidos no escopo do projeto, demonstrando viabilidade técnica e
                    aderência aos parâmetros definidos inicialmente.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    4. Resultados Obtidos
                </h2>

                <p className="leading-relaxed">
                    Os resultados indicam que os valores apurados atendem aos critérios
                    estabelecidos no escopo do projeto, demonstrando viabilidade técnica e
                    aderência aos parâmetros definidos inicialmente.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    4. Resultados Obtidos
                </h2>

                <p className="leading-relaxed">
                    Os resultados indicam que os valores apurados atendem aos critérios
                    estabelecidos no escopo do projeto, demonstrando viabilidade técnica e
                    aderência aos parâmetros definidos inicialmente.
                </p>
            </section>
        </div>
    );
}
