import { getPostBySlug } from '@/app/actions/posts';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getReadingTime } from '@/lib/reading-time';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
    const { locale, slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const post = await getPostBySlug(slug);

    if (!post) {
        return {};
    }

    const title = locale === 'vi' && post.title_vi ? post.title_vi : post.title_en;
    const description = locale === 'vi' && post.excerpt_vi ? post.excerpt_vi : post.excerpt_en;

    return {
        title,
        description,
        openGraph: {
            title,
            description: description || undefined,
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
        }
    };
}

export default async function AINewsDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    setRequestLocale(locale);
    const post = await getPostBySlug(slug);

    if (!post || post.type !== 'AI_NEWS') {
        notFound();
    }

    const content = locale === 'vi' && post.content_vi ? post.content_vi : post.content_en;

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-4xl mx-auto">
            <Link href="/ai-news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to AI News
            </Link>

            {post.coverImageUrl && (
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-secondary mb-10 shadow-soft relative">
                    <Image
                        src={post.coverImageUrl}
                        alt={post.title_en}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-primary uppercase tracking-wider dark:bg-slate-800">AI News</span>
                    <span className="text-muted-foreground text-xs">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-border-light"></span>
                    <span className="text-muted-foreground text-xs">{getReadingTime(content)}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-text-main">
                    {locale === 'vi' && post.title_vi ? post.title_vi : post.title_en}
                </h1>
                {post.excerpt_en && (
                    <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                        {locale === 'vi' && post.excerpt_vi ? post.excerpt_vi : post.excerpt_en}
                    </p>
                )}
            </header>
            <article>
                <MDXContent source={content} />
            </article>
        </div>
    );
}
