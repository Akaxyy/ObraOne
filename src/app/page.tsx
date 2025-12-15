import { auth } from "@/src/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();

    if (!session) {
        redirect("/sign-in");
    }

    redirect("/dashboard");
}