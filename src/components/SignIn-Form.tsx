"use client";

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
import { loginAction } from "@/src/lib/actions"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await loginAction(formData)
        })
    }

    return (
        <form action={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Entre com suas credenciais de acesso.
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input name="email" id="email" type="email" placeholder="Digite seu email..." required />
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Esqueceu a senha?
                        </a>
                    </div>
                    <Input name="password" id="password" type="password" placeholder="Digite sua senha..." required />
                </Field>
                <Field>
                    {/* O botão ficará desabilitado enquanto a action roda */}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Entrando..." : "Login"}
                    </Button>
                </Field>
                <FieldSeparator>Ou</FieldSeparator>
                <Field>
                    <button type="button" className="flex w-full items-center justify-center gap-2 rounded-md border bg-white p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 cursor-pointer ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="size-5">
                            <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                            <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                            <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                            <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                        </svg>
                        Entre com @c3engenharia.com.br
                    </button>
                    <FieldDescription className="text-center">
                        Não tem uma conta?{" "}
                        <a href="/sing-up" className="underline underline-offset-4">
                            Registre-se
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}