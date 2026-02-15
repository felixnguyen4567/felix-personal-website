import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getPosts } from '@/app/actions/posts';
import { PostType } from '@prisma/client';
import { getPostCoverImage } from '@/lib/image-utils';
import { localized } from '@/lib/utils';
import { getReadingTime } from '@/lib/reading-time';

export default async function AINewsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const posts = await getPosts(PostType.AI_NEWS);
    const featuredPost = posts[0];
    const trendingPosts = posts.slice(1, 3);
    const latestPosts = posts.slice(3, 5);

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
                            <Link href={`/ai-news/${featuredPost.slug}`} className="block">
                                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-secondary mb-8 border border-border-light transition-all group-hover:shadow-lg relative">
                                    {featuredCover ? (
                                        <Image
                                            src={featuredCover}
                                            alt={localized(locale, featuredPost.title_vi, featuredPost.title_en)}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary" />
                                    )}
                                </div>
                            </Link>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800">Featured Story</span>
                                    <span className="text-muted-foreground text-xs">{new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <span className="text-muted-foreground text-xs">·</span>
                                    <span className="text-muted-foreground text-xs">{getReadingTime(localized(locale, featuredPost.content_vi, featuredPost.content_en))}</span>
                                </div>
                                <Link href={`/ai-news/${featuredPost.slug}`} className="block">
                                    <h2 className="text-4xl font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                                        {localized(locale, featuredPost.title_vi, featuredPost.title_en)}
                                    </h2>
                                </Link>
                                {(featuredPost.excerpt_en || featuredPost.excerpt_vi) && (
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                                        {localized(locale, featuredPost.excerpt_vi, featuredPost.excerpt_en || '')}
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
                        <div className="mt-16 pt-12 border-t border-border-light">
                            <h3 className="text-2xl font-bold mb-10 text-text-main">Trending News</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
                                {trendingPosts.map((post) => {
                                    const coverImage = getPostCoverImage(post);
                                    const content = localized(locale, post.content_vi, post.content_en);
                                    return (
                                        <article key={post.id} className="group">
                                            <Link href={`/ai-news/${post.slug}`} className="block">
                                                <div className="aspect-video overflow-hidden rounded-xl bg-secondary mb-5 border border-border-light relative group-hover:shadow-md transition-shadow">
                                                    {coverImage ? (
                                                        <Image src={coverImage} alt={localized(locale, post.title_vi, post.title_en)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800">AI News</span>
                                                    <span className="text-muted-foreground text-xs">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    <span className="text-muted-foreground text-xs">·</span>
                                                    <span className="text-muted-foreground text-xs">{getReadingTime(content)}</span>
                                                </div>
                                                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-text-main leading-snug">{localized(locale, post.title_vi, post.title_en)}</h4>
                                            </Link>
                                            {(post.excerpt_en || post.excerpt_vi) && (
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{localized(locale, post.excerpt_vi, post.excerpt_en || '')}</p>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <aside className="lg:col-span-4 space-y-12">
                    {latestPosts.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-8 pb-4 border-b border-border-light">Latest Updates</h3>
                            <div className="space-y-8">
                                {latestPosts.map((post) => {
                                    const coverImage = getPostCoverImage(post);
                                    return (
                                        <article key={post.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0 relative border border-border-light">
                                                {coverImage ? (
                                                    <Image src={coverImage} alt={localized(locale, post.title_vi, post.title_en)} fill className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary" />
                                                )}
                                            </div>
                                            <div className="space-y-1.5 min-w-0">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">AI News</span>
                                                <Link href={`/ai-news/${post.slug}`} className="block">
                                                    <h5 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors text-text-main line-clamp-2">{localized(locale, post.title_vi, post.title_en)}</h5>
                                                </Link>
                                                <Link className="text-[10px] font-bold text-primary tracking-wider hover:underline inline-block" href={`/ai-news/${post.slug}`}>READ ARTICLE</Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-border-light">
                        <h3 className="text-xl font-bold mb-3 text-text-main">Subscribe to AI Digest</h3>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Join 25,000+ experts receiving weekly insights on the future of machine intelligence.</p>
                        <form className="space-y-3">
                            <input className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none" placeholder="Email address" type="email" />
                            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">Explore Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Machine Learning', 'Neural Networks', 'NLP', 'GPU Cluster', 'Computer Vision', 'Robotics'].map((topic) => (
                                <Link key={topic} className="px-4 py-2 border border-border-light rounded-full text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors" href="#">{topic}</Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
