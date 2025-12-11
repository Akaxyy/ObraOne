"use server"

import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
    // Aqui você faria a validação real (banco de dados, auth, etc)
    // const email = formData.get("email")
    // const password = formData.get("password")

    await new Promise((resolve) => setTimeout(resolve, 1000))

    redirect("/dashboard")
}