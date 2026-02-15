import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getPosts } from '@/app/actions/posts';
import { PostType } from '@prisma/client';
import { getPostCoverImage } from '@/lib/image-utils';
import { localized } from '@/lib/utils';
import { getReadingTime } from '@/lib/reading-time';

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
                                    <Link href={`/journal/${featuredPost.slug}`} className="block">
                                        <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-secondary border border-border-light transition-all group-hover:shadow-lg relative">
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
                                </div>
                                <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800">Featured</span>
                                        <span className="text-muted-foreground text-xs">{new Date(featuredPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="text-muted-foreground text-xs">·</span>
                                        <span className="text-muted-foreground text-xs">{getReadingTime(localized(locale, featuredPost.content_vi, featuredPost.content_en))}</span>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                                {recentPosts.map((post) => {
                                    const coverImage = getPostCoverImage(post);
                                    const content = localized(locale, post.content_vi, post.content_en);
                                    return (
                                        <article key={post.id} className="group">
                                            <Link href={`/journal/${post.slug}`} className="block">
                                                <div className="aspect-video overflow-hidden rounded-xl bg-secondary mb-5 border border-border-light relative group-hover:shadow-md transition-shadow">
                                                    {coverImage ? (
                                                        <Image src={coverImage} alt={localized(locale, post.title_vi, post.title_en)} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-muted-foreground text-xs">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    <span className="text-muted-foreground text-xs">·</span>
                                                    <span className="text-muted-foreground text-xs">{getReadingTime(content)}</span>
                                                </div>
                                                <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors text-text-main leading-snug">
                                                    {localized(locale, post.title_vi, post.title_en)}
                                                </h4>
                                            </Link>
                                            {(post.excerpt_en || post.excerpt_vi) && (
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                                                    {localized(locale, post.excerpt_vi, post.excerpt_en || '')}
                                                </p>
                                            )}
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
