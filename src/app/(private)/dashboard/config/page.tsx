"use client";

import React, { useState } from "react";

// UI primitives
import { Card, CardHeader, CardFooter, CardTitle, CardContent, CardDescription } from "@/src/components/ui/card";
import { ModeToggle } from "@/src/components/ModeToggle";

// Config page: simple interface to adjust theme and language
export default function Page() {
  const [locale, setLocale] = useState<string>(() => {
    if (typeof window === "undefined") {
      return "pt-BR";
    }

    try {
      return localStorage.getItem("obra.locale") ?? "pt-BR";
    } catch {
      return "pt-BR";
    }
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  // Persist locale choice
  function saveLocale(next: string) {
    setLocale(next);
    try {
      localStorage.setItem("obra.locale", next);
      setSavedAt(new Date().toLocaleString());
    } catch {
      // ignore
    }
  }

  return (
    <section className="min-h-screen p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
          <CardDescription>Ajuste preferências da aplicação, como tema e idioma.</CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theme */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Tema</label>
            <ModeToggle />
          </div>

          {/* Language */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Idioma</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => saveLocale("pt-BR")}
                className={"px-3 py-2 rounded-md border " + (locale === "pt-BR" ? "border-primary" : "border-border")}
              >
                PT-BR
              </button>
              <button
                onClick={() => saveLocale("en")}
                className={"px-3 py-2 rounded-md border " + (locale === "en" ? "border-primary" : "border-border")}
              >
                EN
              </button>
            </div>
            <div className="text-sm text-muted-foreground">Atual: {locale}</div>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <button
            className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent"
            onClick={() => setSavedAt(new Date().toLocaleString())}
          >
            Salvar
          </button>
        </CardFooter>
      </Card>

      {savedAt && (
        <div className="mt-4 text-sm text-center text-foreground">Salvo em {savedAt}</div>
      )}
    </section>
  );
}
