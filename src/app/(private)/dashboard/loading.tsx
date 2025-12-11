// src/app/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-gray-50/50">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-gray-500">Carregando...</p>
            </div>
        </div>
    );
}