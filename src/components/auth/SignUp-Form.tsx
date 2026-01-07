"use client";

import { cn } from "@/src/lib/utils";
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
import { signUp } from "@/src/lib/auth-client";
import { translateAuthError } from "@/src/lib/auth-utils";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    startTransition(async () => {
      const res = await signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      });

      if (res.error) {
        setError(translateAuthError(res.error) ?? "Algo errado aconteceu.");
      } else {
        router.push("/dashboard");
      }
    });
  };


  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha os dados abaixo para começar.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200 text-center">
            {error}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
          <Input name="name" id="name" type="text" placeholder="Digite seu nome..." required />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input name="email" id="email" type="email" placeholder="Digite seu email..." required />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input name="password" id="password" type="password" placeholder="********" required />
          <FieldDescription>
            Deve ter no mínimo 8 caracteres.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirme a Senha</FieldLabel>
          <Input name="confirm-password" id="confirm-password" type="password" placeholder="********" required />
        </Field>

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Criando conta..." : "Criar a Conta"}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="size-5">
              <rect x="1" y="1" width="9" height="9" fill="#F25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
              <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
            </svg>
            Entre com @c3engenharia.com.br
          </Button>
          <FieldDescription className="px-6 text-center mt-2">
            Já tem uma conta? <a href="/sign-in" className="underline underline-offset-4">Entre na Conta</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}