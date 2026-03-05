"use client";

import { cn } from "@/src/lib/utils/utils";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createClient } from "@/src/lib/supabase/client";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const supabase = createClient();

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setError(null);

    startTransition(async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha os dados abaixo para se registrar.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200 text-center">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="nome@c3engenharia.com.br"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input name="password" id="password" type="password" required />
        </Field>

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Registrando..." : "Registrar"}
          </Button>
        </Field>

        <FieldSeparator>Ou</FieldSeparator>

        <Field>
          <Button
            variant="outline"
            type="button"
            className="w-full flex gap-2"
            disabled={isPending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 21"
              className="size-5"
            >
              <rect x="1" y="1" width="9" height="9" fill="#F25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
              <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
            </svg>
            Registrar com Microsoft
          </Button>

          <FieldDescription className="text-center mt-2">
            Já tem uma conta?{" "}
            <a href="/auth/sign-in" className="underline underline-offset-4">
              Faça login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}