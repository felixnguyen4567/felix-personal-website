'use client'

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input as ShadcnInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProject } from "@/app/actions/projects"
import { Textarea } from "@/components/ui/textarea"
import { Project } from "@prisma/client"

const initialState = {
    error: '',
}

export function EditProjectForm({ project, locale }: { project: Project, locale: string }) {
    const updateProjectWithId = updateProject.bind(null, project.id)
    const [state, formAction, isPending] = useActionState(updateProjectWithId, initialState)

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            <input type="hidden" name="locale" value={locale} />

            <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <ShadcnInput id="title_en" name="title_en" required defaultValue={project.title_en} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <ShadcnInput id="slug" name="slug" required defaultValue={project.slug} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="link">Project Link</Label>
                <ShadcnInput id="link" name="link" defaultValue={project.link || ''} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="desc_en">Description (Short)</Label>
                <Textarea
                    id="desc_en"
                    name="desc_en"
                    required
                    defaultValue={project.desc_en}
                    className="min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content_en">Content (Markdown)</Label>
                <Textarea
                    id="content_en"
                    name="content_en"
                    required
                    defaultValue={project.content_en}
                    className="min-h-[200px]"
                />
            </div>

            {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}

            <Button disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Project'}
            </Button>
        </form>
    )
}
