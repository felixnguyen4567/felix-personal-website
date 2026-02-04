import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { getPosts, deletePost } from "@/app/actions/posts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function AdminPostsPage() {
    const posts = await getPosts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Posts</h1>
                <Link href="/admin/posts/new">
                    <Button>Create New</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {posts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium">
                                {post.title_en}
                            </CardTitle>
                            <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                                {post.type}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                                /{post.slug}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled>Edit</Button>
                                <form action={async () => {
                                    'use server'
                                    await deletePost(post.id)
                                }}>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {posts.length === 0 && (
                    <p className="text-muted-foreground">No posts found.</p>
                )}
            </div>
        </div>
    )
}
