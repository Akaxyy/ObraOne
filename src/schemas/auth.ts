import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, "Nome muito curto"),
    email: z.email("Email inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
});

export type SignupValues = z.infer<typeof signupSchema>;
