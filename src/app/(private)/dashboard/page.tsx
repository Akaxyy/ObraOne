import { auth } from "@/src/auth"
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="bg-slate-100 p-6 rounded-md shadow-sm flex items-center gap-4">
                {/* Lógica: Se tem imagem, mostra ela. Se não, mostra a bolinha com a inicial */}
                {session?.user?.image ? (
                    <Image
                        src={session.user.image}
                        alt={session.user.name || "User Avatar"}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-blue-500"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white shadow-sm">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}

                <div>
                    <p className="text-lg font-medium">
                        Olá, {session?.user?.name}!
                    </p>
                    <p className="text-gray-500 text-sm">
                        {session?.user?.email}
                    </p>
                </div>
            </div>

            {/* Se quiser manter o debug escondido ou menor, use assim: */}
            {/* <pre className="mt-8 text-xs bg-gray-900 text-white p-4 rounded overflow-auto h-40">
        {JSON.stringify(session, null, 2)}
      </pre> */}
        </div>
    );
}