import { EditProjectForm } from "@/components/edit-project-form"
import { getProject } from "@/app/actions/projects"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
    const { locale, id } = await params;
    const project = await getProject(id)

    if (!project) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <EditProjectForm project={project} locale={locale} />
        </div>
    )
}
