import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect(`/${locale}/admin/login`);
    }

    async function signOut() {
        'use server'
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect(`/${locale}/admin/login`)
    }

    return (
        <div className="space-y-6 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                    <form action={signOut}>
                        <Button variant="outline" size="sm">Sign out</Button>
                    </form>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="text-lg font-semibold">Posts</h3>
                    <p className="text-sm text-muted-foreground mb-4">Manage your logs, notes, and systems.</p>
                    <Link href="/admin/posts">
                        <Button variant="secondary" className="w-full">Manage Posts</Button>
                    </Link>
                </div>
                <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="text-lg font-semibold">Projects</h3>
                    <p className="text-sm text-muted-foreground">Showcase your work.</p>
                </div>
            </div>
        </div>
    );
}
