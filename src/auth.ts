// src/auth.ts
import NextAuth from "next-auth"
//import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        MicrosoftEntraID({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
            authorization: {
                params: {
                    scope: 'openid profile email User.Read',
                },
            },
        }),
    ],
    trustHost: true,
    pages: {
        signIn: '/sign-in',
    }
});