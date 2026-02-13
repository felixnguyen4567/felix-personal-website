import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getPosts } from '@/app/actions/posts';
import { PostType } from '@prisma/client';
import { getPostCoverImage } from '@/lib/image-utils';
import { localized } from '@/lib/utils';

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const posts = await getPosts(PostType.JOURNAL);
    const featuredPost = posts[0];
    const recentPosts = posts.slice(1);

    const featuredCover = featuredPost ? getPostCoverImage(featuredPost) : null;

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <header className="mb-16 border-b border-border-light pb-12">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-text-main">The Journal</h1>
                <p className="text-muted-foreground text-xl max-w-2xl font-light">
                    Curated thoughts on the intersection of craft, technology, and the future of artificial intelligence.
                </p>
            </header>

            {posts.length === 0 ? (
                <p className="text-muted-foreground text-center py-16">No journal entries yet. Create one in the admin panel.</p>
            ) : (
                <div className="space-y-20">
                    {/* Featured Post */}
                    {featuredPost && (
                        <article className="group">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-7">
                                    <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-secondary shadow-soft transition-all group-hover:shadow-hover-soft relative">
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
                                </div>
                                <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800">Featured</span>
                                        <span className="text-muted-foreground text-xs">{new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <Link href={`/journal/${featuredPost.slug}`} className="block">
                                        <h2 className="text-3xl lg:text-4xl font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                                            {localized(locale, featuredPost.title_vi, featuredPost.title_en)}
                                        </h2>
                                    </Link>
                                    {(featuredPost.excerpt_en || featuredPost.excerpt_vi) && (
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {localized(locale, featuredPost.excerpt_vi, featuredPost.excerpt_en || '')}
                                        </p>
                                    )}
                                    <Link href={`/journal/${featuredPost.slug}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest group/link">
                                        READ FULL STORY
                                        <span className="material-symbols-outlined text-base transition-transform group-hover/link:translate-x-1">arrow_right_alt</span>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* Recent Posts */}
                    {recentPosts.length > 0 && (
                        <div className="pt-10 border-t border-border-light">
                            <h3 className="text-2xl font-bold mb-10 text-text-main">Recent Entries</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                                {recentPosts.map((post) => {
                                    const coverImage = getPostCoverImage(post);
                                    return (
                                        <article key={post.id} className="group">
                                            <Link href={`/journal/${post.slug}`} className="block">
                                                <div className="aspect-video overflow-hidden rounded-xl bg-secondary mb-6 shadow-soft relative">
                                                    {coverImage ? (
                                                        <Image src={coverImage} alt={localized(locale, post.title_vi, post.title_en)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800">Journal</span>
                                                    <span className="text-muted-foreground text-xs">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-text-main">
                                                    {localized(locale, post.title_vi, post.title_en)}
                                                </h4>
                                            </Link>
                                            {(post.excerpt_en || post.excerpt_vi) && (
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                                    {localized(locale, post.excerpt_vi, post.excerpt_en || '')}
                                                </p>
                                            )}
                                            <Link href={`/journal/${post.slug}`} className="text-xs font-bold text-primary tracking-widest hover:underline">READ MORE</Link>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
