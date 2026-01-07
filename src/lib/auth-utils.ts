// src/lib/auth-utils.ts

export function translateAuthError(error: { code?: string; message?: string } | null | undefined): string {
    if (!error) return "Erro desconhecido.";

    const message = error.message?.toLowerCase() || "";

    // Fallbacks genéricos para segurança
    if (message.includes("invalid email or password")) return "Email ou senha incorreta.";
    if (message.includes("invalid password")) return "Email ou senha incorreta.";
    if (message.includes("user not found")) return "Email ou senha incorreta.";

    if (message.includes("email not verified")) return "Por favor, verifique seu email antes de entrar.";
    if (message.includes("account already exists")) return "Já existe uma conta com este email.";
    if (message.includes("password too short")) return "A senha deve ter no mínimo 8 caracteres.";
    if (message.includes("too many requests")) return "Muitas tentativas. Aguarde um momento.";

    return "Ocorreu um erro ao processar sua solicitação.";
}