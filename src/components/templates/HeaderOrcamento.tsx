export const CapaOrcamento = ({ data }: { data: any }) => (
    <div className="h-full flex flex-col items-center justify-center p-20 border-4 border-double border-blue-900">
        <h1 className="text-5xl font-black text-blue-900 mb-4">PROPOSTA COMERCIAL</h1>
        <h2 className="text-2xl text-gray-600">{data.cliente}</h2>
        <div className="mt-20 text-center">
            <p>Ref: {data.numero}</p>
            <p>{new Date().toLocaleDateString()}</p>
        </div>
    </div>
);