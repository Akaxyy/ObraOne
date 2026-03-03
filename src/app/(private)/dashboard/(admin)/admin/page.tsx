export default function Admin() {
    return (
        <div className="p-10 space-y-4">
            Teste
            <h1 className="text-3xl font-bold">Painel de Controle</h1>
            <p className="text-muted-foreground">
                Este texto está usando a fonte Geist Sans padrão.
            </p>

            <div className="bg-muted p-4 rounded-md border">
                <p className="text-sm mb-2">ID da Transição:</p>

                <span className="font-mono bg-background px-2 py-1 rounded border text-primary">
                    TX-8842-XF
                </span>

                <p className="mt-2 text-xs font-mono text-muted-foreground">
                    Log do sistema iniciado...
                </p>
            </div>
        </div>
    )
}