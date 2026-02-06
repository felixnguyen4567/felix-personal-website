'use client'

import { useActionState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input as ShadcnInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPost } from "@/app/actions/posts"
import { Textarea } from "@/components/ui/textarea"
import { MediaUpload } from "@/components/media-upload"

const initialState = {
    error: '',
}

export function CreatePostForm({ locale }: { locale: string }) {
    const [state, formAction, isPending] = useActionState(createPost, initialState)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    const handleMediaUpload = (url: string) => {
        if (contentRef.current) {
            const textarea = contentRef.current
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const text = textarea.value
            const imageMarkdown = `\n![image](${url})\n`
            textarea.value = text.substring(0, start) + imageMarkdown + text.substring(end)
            textarea.focus()
        }
    }

    return (
        <form action={formAction} className="space-y-6 max-w-2xl">
            <input type="hidden" name="locale" value={locale} />

            <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <ShadcnInput id="title_en" name="title_en" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <ShadcnInput id="slug" name="slug" required placeholder="my-post-slug" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select name="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="LOG">LOG</option>
                    <option value="NOTE">NOTE</option>
                    <option value="JOURNAL">JOURNAL</option>
                    <option value="AI_NEWS">AI NEWS</option>
                </select>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                    <MediaUpload onUpload={(url) => {
                        const input = document.getElementById('coverImageUrl') as HTMLInputElement;
                        if (input) input.value = url;
                    }} />
                </div>
                <ShadcnInput id="coverImageUrl" name="coverImageUrl" placeholder="/images/cover.jpg" />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="content_en">Content (Markdown)</Label>
                    <MediaUpload onUpload={handleMediaUpload} />
                </div>
                <Textarea
                    ref={contentRef}
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
                {isPending ? 'Creating...' : 'Create Post'}
            </Button>
        </form>
    )
}
