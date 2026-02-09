'use client'

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input as ShadcnInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePost } from "@/app/actions/posts"
import { Post } from "@prisma/client"
import { MediaUpload } from "@/components/media-upload"
import { RichTextEditor } from "@/components/editor/rich-text-editor"

const initialState = {
    error: '',
}

export function EditPostForm({ post, locale }: { post: Post, locale: string }) {
    const updatePostWithId = updatePost.bind(null, post.id)
    const [state, formAction, isPending] = useActionState(updatePostWithId, initialState)
    const [content, setContent] = useState(post.content_en)

    return (
        <form action={formAction} className="space-y-6 max-w-4xl">
            <input type="hidden" name="locale" value={locale} />

            <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <ShadcnInput id="title_en" name="title_en" required defaultValue={post.title_en} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <ShadcnInput id="slug" name="slug" required defaultValue={post.slug} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                    name="type"
                    defaultValue={post.type}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
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
                <ShadcnInput
                    id="coverImageUrl"
                    name="coverImageUrl"
                    placeholder="/images/cover.jpg"
                    defaultValue={post.coverImageUrl || ''}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content_en">Content</Label>
                {/* Hidden input to pass data to server action */}
                <input type="hidden" name="content_en" value={content} />
                <RichTextEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Start writing..."
                />
            </div>

            {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}

            <Button disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Post'}
            </Button>
        </form>
    )
}
