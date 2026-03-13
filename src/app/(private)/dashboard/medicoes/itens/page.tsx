import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";

function formatDate(value?: string | null) {
    if (!value) {
        return "N/A";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
    }).format(new Date(value));
}

function getTokenPreview(token?: string | null) {
    if (!token) {
        return "Token não encontrado na sessão.";
    }

    if (token.length <= 80) {
        return token;
    }

    return `${token.slice(0, 40)}...${token.slice(-40)}`;
}

function decodeJwtPayload(token?: string | null) {
    if (!token) {
        return null;
    }

    const [, payload] = token.split(".");

    if (!payload) {
        return null;
    }

    try {
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
        const decoded = Buffer.from(padded, "base64").toString("utf-8");

        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

export default async function Item() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: { session } } = await supabase.auth.getSession();

    if (!user || !session) {
        redirect("/auth/sign-in");
    }

    const accessToken = session.access_token;
    const refreshToken = session.refresh_token;
    const decodedPayload = decodeJwtPayload(accessToken);

    return (
        <main className="min-h-full bg-muted/30 p-6 md:p-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <div className="rounded-2xl border bg-background p-6 shadow-sm">
                    <p className="text-sm font-medium text-primary">Sessão atual</p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                        Visualização do access token
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                        Esta tela mostra o token salvo na sessão do Supabase, com preview,
                        metadados básicos e o payload JWT decodificado.
                    </p>
                </div>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border bg-background p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Usuário
                        </p>
                        <p className="mt-3 break-all text-sm font-medium text-foreground">
                            {user.email ?? "Sem e-mail"}
                        </p>
                        <p className="mt-2 break-all text-xs text-muted-foreground">{user.id}</p>
                    </div>

                    <div className="rounded-2xl border bg-background p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Expira em
                        </p>
                        <p className="mt-3 text-sm font-medium text-foreground">
                            {formatDate(session.expires_at ? new Date(session.expires_at * 1000).toISOString() : null)}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            TTL: {session.expires_in ? `${session.expires_in}s` : "N/A"}
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Access token
                        </p>
                        <p className="mt-3 text-sm font-medium text-foreground">
                            {accessToken ? `${accessToken.length} caracteres` : "Indisponível"}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Tipo: {session.token_type ?? "N/A"}
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-5 shadow-sm">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Refresh token
                        </p>
                        <p className="mt-3 text-sm font-medium text-foreground">
                            {refreshToken ? `${refreshToken.length} caracteres` : "Indisponível"}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Última atualização: {formatDate(session.user.last_sign_in_at)}
                        </p>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border bg-background p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Preview do token</h2>
                                <p className="text-sm text-muted-foreground">
                                    Um resumo curto para inspeção rápida.
                                </p>
                            </div>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                access_token
                            </span>
                        </div>

                        <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                            <code>{getTokenPreview(accessToken)}</code>
                        </pre>
                    </div>

                    <div className="rounded-2xl border bg-background p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-foreground">Payload decodificado</h2>
                        <p className="text-sm text-muted-foreground">
                            Conteúdo do JWT após decodificar a parte central do token.
                        </p>

                        <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-emerald-300">
                            <code>{JSON.stringify(decodedPayload, null, 2) ?? "Não foi possível decodificar o payload."}</code>
                        </pre>
                    </div>
                </section>

                <section className="rounded-2xl border bg-background p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-foreground">Access token completo</h2>
                    <p className="text-sm text-muted-foreground">
                        Exibição integral do token retornado por `supabase.auth.getSession()`.
                    </p>

                    <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-amber-200">
                        <code>{accessToken ?? "Token não encontrado na sessão."}</code>
                    </pre>
                </section>

                <section className="rounded-2xl border bg-background p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-foreground">Sessão bruta</h2>
                    <p className="text-sm text-muted-foreground">
                        Se você quiser conferir mais campos disponíveis, eles estão aqui.
                    </p>

                    <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-sky-200">
                        <code>{JSON.stringify(session, null, 2)}</code>
                    </pre>
                </section>

                <section className="rounded-2xl border bg-background p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-foreground">User bruto</h2>
                    <p className="text-sm text-muted-foreground">
                        Campos de user.
                    </p>

                    <pre className="mt-4 max-h-[420px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-sky-200">
                        <code>{JSON.stringify(user, null, 2)}</code>
                    </pre>
                </section>
            </div>
        </main>
    );
}
