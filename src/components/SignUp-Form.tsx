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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
          <Input id="name" type="text" placeholder="Digite seu nome..." required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="Digite seu email..." required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>
            Deve ter no mínimo 8 caracteres.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirme a Senha</FieldLabel>
          <Input id="confirm-password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Criar a Conta</Button>
        </Field>
        <FieldSeparator>Ou</FieldSeparator>
        <Field>
          <button className="flex w-full items-center justify-center gap-2 rounded-md border bg-white p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="size-5">
              <rect x="1" y="1" width="9" height="9" fill="#F25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
              <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
            </svg>
            Entre com @c3engenharia.com.br
          </button>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <a href="/sign-in">Entre na Conta</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
