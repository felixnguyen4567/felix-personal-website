import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPosts } from '@/app/actions/posts';
import { PostType } from '@prisma/client';

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const posts = await getPosts(PostType.JOURNAL);

    return (
        <div className="pt-32 pb-48 px-4 sm:px-8 max-w-[1400px] mx-auto" data-theme="journal">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                <aside className="hidden lg:block md:col-span-3 lg:col-span-2">
                    <div className="sticky top-48">
                        <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.25em] mb-8">Categories</h3>
                        <nav className="flex flex-col gap-2 -ml-4">
                            <a className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary bg-neutral-50 px-4 py-2" href="#">All Posts</a>
                            <a className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all px-4 py-2" href="#">Design</a>
                            <a className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all px-4 py-2" href="#">Engineering</a>
                            <a className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all px-4 py-2" href="#">Research</a>
                        </nav>
                    </div>
                </aside>
                <div className="col-span-1 md:col-span-9 lg:col-span-8 lg:col-start-4">
                    <header className="mb-32">
                        <h1 className="text-xs font-bold uppercase tracking-[0.4em] text-meta mb-6">Volume 01</h1>
                        <h2 className="text-6xl lg:text-7xl font-serif font-light leading-tight tracking-tight text-text-main">The Journal.</h2>
                        <p className="mt-8 text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                            Curated thoughts on the intersection of craft, technology, and the future of artificial intelligence.
                        </p>
                    </header>
                    <div className="space-y-32">
                        {posts.length === 0 ? (
                            <p className="text-muted-foreground text-center py-16">No journal entries yet. Create one in the admin panel.</p>
                        ) : (
                            posts.map((post) => (
                                <article key={post.id} className="group">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-meta">
                                            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            <span className="w-1 h-1 rounded-full bg-border-light"></span>
                                            <span className="text-primary">Journal</span>
                                        </div>
                                        <Link className="block" href={`/journal/${post.slug}`}>
                                            <h3 className="text-4xl lg:text-5xl font-serif font-normal leading-tight text-text-main group-hover:text-muted-foreground transition-colors duration-500">
                                                {post.title_en}
                                            </h3>
                                            {post.excerpt_en && (
                                                <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed max-w-2xl line-clamp-2">
                                                    {post.excerpt_en}
                                                </p>
                                            )}
                                        </Link>
                                        <div className="mt-4">
                                            <Link className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] border-b border-primary pb-1 transition-all hover:pr-4 text-text-main" href={`/journal/${post.slug}`}>
                                                Read Manuscript
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
