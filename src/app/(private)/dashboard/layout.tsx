import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Container Principal: Flex Row (Lado a Lado)
        <div className="flex h-screen bg-neutral-50 overflow-hidden">

            {/* 1. Sidebar (Esquerda) - Controla sua própria largura e altura */}
            <Sidebar />

            {/* 2. Coluna da Direita (Ocupa o resto do espaço) */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

                {/* A. Navbar (Topo da direita, fixa) */}
                <Navbar />

                {/* B. Área de Conteúdo (Abaixo da Navbar, com scroll próprio) */}
                <main className="flex-1 overflow-y-auto scroll-smooth bg-neutral-50">
                    <div>
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
}