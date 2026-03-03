"use client";

import { HeroUIProvider } from "@heroui/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
// Importe o ThemeProvider que você criou ou que a lib fornece
import { ThemeProvider } from "@/src/components/providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NextTopLoader
                color="#2563EB"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2563EB,0 0 5px #2563EB"
            />
            {children}
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
}