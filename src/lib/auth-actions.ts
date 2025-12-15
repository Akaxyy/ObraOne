"use server"

import { signIn } from "@/src/auth"

export async function loginWithMicrosoft() {
    await signIn("microsoft-entra-id", { redirectTo: "/dashboard" })
}