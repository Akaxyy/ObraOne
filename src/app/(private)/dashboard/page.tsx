import { auth } from "@/src/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/src/components/projects/dashboard-content";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // if (!session) {
    //     redirect("/sign-in");
    // }

    return (
        <div className="h-full overflow-hidden bg-muted/40 flex flex-col">
            <DashboardContent />
        </div>
    );
}


