import { getPost } from "@/app/actions/posts"
import { EditPostForm } from "@/components/edit-post-form"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    const { id, locale } = await params
    const post = await getPost(id)

    if (!post) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <EditPostForm post={post} locale={locale} />
        </div>
    )
}
