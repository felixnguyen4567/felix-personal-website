import { CreatePostForm } from "@/components/create-post-form"

export default async function CreatePostPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <CreatePostForm locale={locale} />
        </div>
    )
}
