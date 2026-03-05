import { redirect } from "next/navigation"
import { createClient } from "@/src/lib/supabase/server"
import { logout } from "@/src/actions/auth"
import { Button } from "@/src/components/ui/button"

export default async function Dashboard() {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!user || !session) {
        redirect("/login")
    }

    async function debugAuth() {
        "use server"

        const token = session?.access_token

        // const payloadBase64 = token?.split(".")[1]

        // const decodedPayload = JSON.parse(
        //     Buffer.from(payloadBase64?.toString() || "", "base64").toString("utf-8")
        // )

        // console.log("===== USER =====")
        // console.log(user)

        console.log("===== SESSION =====")
        console.log(session)

        console.log("===== ACCESS TOKEN =====")
        console.log(token)

        // console.log("===== JWT PAYLOAD =====")
        // console.log(decodedPayload)

        // console.log("===== APPS CLAIM =====")
        // console.log(decodedPayload.app_metadata.apps)
    }

    return (
        <div className="h-screen overflow-auto flex flex-col items-center gap-4">
            <h1>Dashboard</h1>

            <form action={debugAuth}>
                <Button variant="secondary" type="submit">
                    Debug Auth
                </Button>
            </form>

            <pre>{JSON.stringify(user, null, 2)}</pre>

            <form action={logout}>
                <button type="submit">
                    Logout
                </button>
            </form>
        </div>
    )
}