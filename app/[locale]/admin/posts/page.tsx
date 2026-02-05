import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { getPosts, deletePost, togglePublish } from "@/app/actions/posts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function AdminPostsPage() {
    const posts = await getPosts(undefined, false) // Fetch all posts including drafts

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
                    <Card key={post.id} className={post.published ? '' : 'bg-muted/30 border-dashed'}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium flex items-center gap-2">
                                {post.title_en}
                                {!post.published && (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-200">
                                        Draft
                                    </span>
                                )}
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
                                <Link href={`/admin/posts/${post.id}/edit`}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </Link>

                                <form action={async () => {
                                    'use server'
                                    await togglePublish(post.id, post.published)
                                }}>
                                    <Button
                                        variant={post.published ? "secondary" : "default"}
                                        size="sm"
                                    >
                                        {post.published ? 'Unpublish' : 'Publish'}
                                    </Button>
                                </form>

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
