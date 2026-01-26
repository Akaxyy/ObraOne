import { betterAuth, string } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "@/src/lib/prisma/prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                input: false,
            },
            contractsId: {
                type: "string",
                required: false,
                input: false,
            },
            teams: {
                type: "string[]",
                required: false,
                input: false,
            }
        }
    },
    plugins: [nextCookies()]
})