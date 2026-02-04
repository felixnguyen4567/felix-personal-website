import { CreateProjectForm } from "@/components/create-project-form"

export default async function CreateProjectPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <CreateProjectForm locale={locale} />
        </div>
    )
}
