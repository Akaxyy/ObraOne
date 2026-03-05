import { redirect } from "next/navigation";

// Root page — redirects authenticated users to the dashboard.
// TODO: Add auth check to redirect unauthenticated users to /auth/sign-in
export default async function Home() {
    redirect("/dashboard");
}