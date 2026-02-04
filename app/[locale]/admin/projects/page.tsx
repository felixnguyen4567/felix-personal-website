import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { getProjects, deleteProject } from "@/app/actions/projects"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function AdminProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Link href="/admin/projects/new">
                    <Button>Create New</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium">
                                {project.title_en}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                                /{project.slug}
                            </div>
                            <p className="text-sm mb-4 line-clamp-2">{project.desc_en}</p>
                            <div className="flex gap-2">
                                <Link href={`/admin/projects/${project.id}`}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                                <form action={async () => {
                                    'use server'
                                    await deleteProject(project.id)
                                }}>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {projects.length === 0 && (
                    <p className="text-muted-foreground">No projects found.</p>
                )}
            </div>
        </div>
    )
}
