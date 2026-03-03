// import { auth } from "@/src/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // });

    // if (!session) {
    //     redirect("/sign-in");
    // }
    // redirect("/dashboard");
    return <p>Hello World</p>;
}