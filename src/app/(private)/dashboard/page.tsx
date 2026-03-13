import { redirect } from "next/navigation";
import { DashboardContent } from "@/src/components/projects/DashboardContent";
import { createClient } from "@/src/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.role !== "authenticated") {
        redirect("/auth/sign-in");
    }

    return (
        <div className="h-full overflow-hidden bg-muted/40 flex flex-col">
            <DashboardContent />
        </div>
    );
}
