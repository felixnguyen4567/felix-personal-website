'use client'

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input as ShadcnInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProject } from "@/app/actions/projects"
import { Textarea } from "@/components/ui/textarea"

const initialState = {
    error: '',
}

export function CreateProjectForm({ locale }: { locale: string }) {
    const [state, formAction, isPending] = useActionState(createProject, initialState)

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            <input type="hidden" name="locale" value={locale} />

            <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <ShadcnInput id="title_en" name="title_en" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <ShadcnInput id="slug" name="slug" required placeholder="my-project-slug" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="link">Project Link</Label>
                <ShadcnInput id="link" name="link" placeholder="https://..." />
            </div>

            <div className="space-y-2">
                <Label htmlFor="desc_en">Description (Short)</Label>
                <Textarea
                    id="desc_en"
                    name="desc_en"
                    required
                    className="min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content_en">Content (Markdown)</Label>
                <Textarea
                    id="content_en"
                    name="content_en"
                    required
                    className="min-h-[200px]"
                />
            </div>

            {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}

            <Button disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Project'}
            </Button>
        </form>
    )
}
