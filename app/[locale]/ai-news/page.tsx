import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getPosts } from '@/app/actions/posts';
import { PostType } from '@prisma/client';
import { getPostCoverImage } from '@/lib/image-utils';

export default async function AINewsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const posts = await getPosts(PostType.AI_NEWS);
    const featuredPost = posts[0];
    const trendingPosts = posts.slice(1, 3);
    const latestPosts = posts.slice(3, 5);

    // Pre-compute cover images for all posts
    const featuredCover = featuredPost ? getPostCoverImage(featuredPost) : null;

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <header className="mb-16 border-b border-border-light pb-12">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-text-main">The Intelligence Feed</h1>
                <p className="text-muted-foreground text-xl max-w-2xl font-light">Curating the most significant breakthroughs in artificial intelligence and robotics.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8">
                    {featuredPost ? (
                        <article className="group">
                            <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-secondary mb-8 shadow-soft transition-all group-hover:shadow-hover-soft relative">
                                {featuredCover ? (
                                    <Image
                                        src={featuredCover}
                                        alt={featuredPost.title_en}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary" />
                                )}
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800">Featured Story</span>
                                    <span className="text-muted-foreground text-xs">{new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <Link href={`/ai-news/${featuredPost.slug}`} className="block">
                                    <h2 className="text-4xl font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                                        {featuredPost.title_en}
                                    </h2>
                                </Link>
                                {featuredPost.excerpt_en && (
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                                        {featuredPost.excerpt_en}
                                    </p>
                                )}
                                <Link href={`/ai-news/${featuredPost.slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest group/link">
                                    READ FULL STORY
                                    <span className="material-symbols-outlined text-base transition-transform group-hover/link:translate-x-1">arrow_right_alt</span>
                                </Link>
                            </div>
                        </article>
                    ) : (
                        <p className="text-muted-foreground text-center py-16">No AI news articles yet. Create one in the admin panel.</p>
                    )}

                    {trendingPosts.length > 0 && (
                        <div className="mt-20 pt-16 border-t border-border-light">
                            <h3 className="text-2xl font-bold mb-10 text-text-main">Trending News</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {trendingPosts.map((post) => {
                                    const coverImage = getPostCoverImage(post);
                                    return (
                                        <article key={post.id} className="group">
                                            <Link href={`/ai-news/${post.slug}`} className="block">
                                                <div className="aspect-video overflow-hidden rounded-xl bg-secondary mb-6 shadow-soft relative">
                                                    {coverImage ? (
                                                        <Image src={coverImage} alt={post.title_en} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary" />
                                                    )}
                                                </div>
                                                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800 mb-4 inline-block">AI News</span>
                                                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-text-main">{post.title_en}</h4>
                                            </Link>
                                            {post.excerpt_en && (
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt_en}</p>
                                            )}
                                            <Link href={`/ai-news/${post.slug}`} className="text-xs font-bold text-primary tracking-widest hover:underline">READ MORE</Link>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <aside className="lg:col-span-4 space-y-16">
                    {latestPosts.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-8 pb-4 border-b border-border-light">Latest Updates</h3>
                            <div className="space-y-10">
                                {latestPosts.map((post) => {
                                    const coverImage = getPostCoverImage(post);
                                    return (
                                        <article key={post.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0 relative">
                                                {coverImage ? (
                                                    <Image src={coverImage} alt={post.title_en} fill className="object-cover grayscale hover:grayscale-0 transition-all" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary" />
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">AI News</span>
                                                <Link href={`/ai-news/${post.slug}`} className="block"><h5 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors text-text-main">{post.title_en}</h5></Link>
                                                <Link className="text-[10px] font-bold text-primary tracking-tighter hover:underline" href={`/ai-news/${post.slug}`}>READ ARTICLE</Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-border-light shadow-soft">
                        <h3 className="text-xl font-bold mb-3 text-text-main">Subscribe to AI Digest</h3>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Join 25,000+ experts receiving weekly insights on the future of machine intelligence.</p>
                        <form className="space-y-3">
                            <input className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Email address" type="email" />
                            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">Explore Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            <Link className="px-4 py-2 border border-border-light rounded-full text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors" href="#">Machine Learning</Link>
                            <Link className="px-4 py-2 border border-border-light rounded-full text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors" href="#">Neural Networks</Link>
                            <Link className="px-4 py-2 border border-border-light rounded-full text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors" href="#">NLP</Link>
                            <Link className="px-4 py-2 border border-border-light rounded-full text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors" href="#">GPU Cluster</Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
