// components/templates/HistoricoRevisoes.tsx
import { ProjectData } from '@/src/lib/mock-data';

export const HistoricoRevisoes = ({ data }: { data: ProjectData }) => (
    <div className="p-10 font-sans h-full bg-white text-black">

        {/* Cabeçalho simples */}
        <div className="border-b-2 border-blue-900 mb-8 pb-4">
            <h1 className="text-2xl font-bold uppercase text-blue-900">Histórico de Revisões</h1>
            <p className="text-sm text-gray-500">Documento: {data.number}</p>
        </div>

        <table className="w-full text-left border-collapse border border-gray-300">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                    <th className="p-3 border border-gray-300 w-16 text-center">Rev</th>
                    <th className="p-3 border border-gray-300 w-32 text-center">Data</th>
                    <th className="p-3 border border-gray-300">Descrição da Alteração</th>
                    <th className="p-3 border border-gray-300 w-48">Responsável</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {data.revisoes.map((rev, index) => (
                    <tr key={index} className="even:bg-gray-50">
                        <td className="p-3 border border-gray-300 text-center font-bold">{rev.rev}</td>
                        <td className="p-3 border border-gray-300 text-center">{rev.date}</td>
                        <td className="p-3 border border-gray-300">{rev.description}</td>
                        <td className="p-3 border border-gray-300 text-gray-600">{rev.author}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="mt-20 border-t border-gray-300 pt-4 text-xs text-gray-400 text-center">
            Este documento é parte integrante do contrato {data.contract}.
        </div>
    </div>
);