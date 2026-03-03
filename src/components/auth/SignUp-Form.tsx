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
//import { signUp } from "@/src/lib/better-auth/auth-client";
import { translateAuthError } from "@/src/utils/auth-utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupValues } from "@/src/schemas/auth";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupValues) => {
    setError(null);
    startTransition(async () => {
      // const res = await signUp.email({
      //   email: data.email,
      //   password: data.password,
      //   name: data.name,
      //   callbackURL: "/dashboard",
      // });

      // if (res.error) {
      //   setError(translateAuthError(res.error) ?? "Erro ao criar conta.");
      // } else {
      //   router.push("/dashboard");
      // }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
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

        <Field className="relative">
          <FieldLabel>Nome Completo</FieldLabel>
          <Input
            {...register("name")}
            placeholder="Seu nome"
            className={errors.name && "border-red-500 focus-visible:ring-red-500"}
          />
          {errors.name && (
            <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
              {errors.name.message}
            </span>
          )}
        </Field>

        <Field className="relative">
          <FieldLabel>Email</FieldLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="seu@email.com"
            className={errors.email && "border-red-500 focus-visible:ring-red-500"}
          />
          {errors.email && (
            <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
              {errors.email.message}
            </span>
          )}
        </Field>

        <Field className="relative">
          <FieldLabel>Senha</FieldLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="********"
            className={errors.password && "border-red-500 focus-visible:ring-red-500"}
          />
          {errors.password && (
            <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
              {errors.password.message}
            </span>
          )}
        </Field>

        <Field className="relative">
          <FieldLabel>Confirmar Senha</FieldLabel>
          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="********"
            className={errors.confirmPassword && "border-red-500 focus-visible:ring-red-500"}
          />
          {errors.confirmPassword && (
            <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">
              {errors.confirmPassword.message}
            </span>
          )}
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