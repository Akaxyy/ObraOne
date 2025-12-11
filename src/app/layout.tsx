"use client";

import { HeroUIProvider } from "@heroui/react";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        {/* O Loader fica aqui, como primeiro item do body */}
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

        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}