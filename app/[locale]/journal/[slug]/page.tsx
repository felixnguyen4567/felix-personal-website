import { getPostBySlug } from '@/app/actions/posts';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';

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
        }
    };
}

export default async function JournalDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    setRequestLocale(locale);
    const post = await getPostBySlug(slug);

    if (!post || post.type !== 'JOURNAL') {
        notFound();
    }

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-3xl mx-auto">
            <Link href="/journal" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to Journal
            </Link>
            <header className="mb-12">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-meta mb-6">
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-border-light"></span>
                    <span className="text-primary">Journal</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-serif font-normal leading-tight text-text-main">
                    {locale === 'vi' && post.title_vi ? post.title_vi : post.title_en}
                </h1>
                {post.excerpt_en && (
                    <p className="mt-6 text-xl text-muted-foreground font-light leading-relaxed">
                        {locale === 'vi' && post.excerpt_vi ? post.excerpt_vi : post.excerpt_en}
                    </p>
                )}
            </header>
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-normal">
                <MDXContent source={locale === 'vi' && post.content_vi ? post.content_vi : post.content_en} />
            </article>
        </div>
    );
}
