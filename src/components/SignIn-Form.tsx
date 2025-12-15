"use client"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { useTransition } from "react"
import { loginWithMicrosoft } from "@/src/lib/auth-actions"

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const [isPending, startTransition] = useTransition()

    // Handler para o login de email/senha (se tiver)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        startTransition(async () => {
            // await loginAction(formData)
            console.log("Login com email/senha ainda a implementar")
        })
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Entre com suas credenciais de acesso.
                    </p>
                </div>

                {/* Inputs de Email/Senha */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input name="email" id="email" type="email" placeholder="nome@c3engenharia.com.br" required />
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <Input name="password" id="password" type="password" required />
                </Field>

                <Field>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Entrando..." : "Login"}
                    </Button>
                </Field>

                <FieldSeparator>Ou</FieldSeparator>

                {/* BOTÃO DA MICROSOFT */}
                <Field>
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full flex gap-2"
                        onClick={() => startTransition(() => loginWithMicrosoft())}
                        disabled={isPending}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="size-5">
                            <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                            <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                            <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                            <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                        </svg>
                        Entrar com @c3engenharia.com.br
                    </Button>

                    <FieldDescription className="text-center mt-2">
                        Não tem uma conta?{" "}
                        <a href="/sign-up" className="underline underline-offset-4">
                            Registre-se
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}