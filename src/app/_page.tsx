'use client';

import { Button } from "@/src/components/ui/button"; // shadcn
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react"; // HeroUI


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 bg-zinc-100">

      {/* ---- Card HeroUI ---- */}
      <Card className="w-80 shadow-md">
        <CardHeader className="font-semibold text-lg">
          HeroUI Card
        </CardHeader>

        <CardBody className="text-zinc-700">
          Esse card vem direto do HeroUI — pronto, estiloso e rápido de usar.
        </CardBody>

        <CardFooter>
          <Button variant="default" className="w-full">
            Botão do shadcn
          </Button>
        </CardFooter>
      </Card>

      {/* ---- Botão shadcn isolado ---- */}
      <Button variant="outline">
        Outro botão shadcn
      </Button>

    </main>
  );
}
