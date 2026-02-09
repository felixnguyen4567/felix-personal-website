'use client'

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input as ShadcnInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProject } from "@/app/actions/projects"
import { Textarea } from "@/components/ui/textarea"
import { MediaUpload } from "@/components/media-upload"
import { slugify } from "@/lib/utils"

const initialState = {
    error: '',
}

export function CreateProjectForm({ locale }: { locale: string }) {
    const [state, formAction, isPending] = useActionState(createProject, initialState)
    const [slug, setSlug] = useState('')
    const [slugManual, setSlugManual] = useState(false)

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            <input type="hidden" name="locale" value={locale} />

            <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <ShadcnInput id="title_en" name="title_en" required onChange={(e) => { if (!slugManual) setSlug(slugify(e.target.value)); }} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug <span className="text-xs text-muted-foreground">(auto-generated from title)</span></Label>
                <ShadcnInput id="slug" name="slug" required placeholder="my-project-slug" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <ShadcnInput id="category" name="category" placeholder="e.g. Web App, AI, CLI" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="tags">Tags <span className="text-xs text-muted-foreground">(comma-separated)</span></Label>
                <ShadcnInput id="tags" name="tags" placeholder="React, TypeScript, AI" />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="coverImageUrl">Cover Image</Label>
                    <MediaUpload onUpload={(url) => {
                        const input = document.getElementById('coverImageUrl') as HTMLInputElement;
                        if (input) input.value = url;
                    }} />
                </div>
                <ShadcnInput id="coverImageUrl" name="coverImageUrl" placeholder="/images/project-cover.jpg" />
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
