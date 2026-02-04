import { getPostBySlug } from '@/app/actions/posts';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
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

export default async function LogStartPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const post = await getPostBySlug(slug);

    if (!post || post.type !== 'LOG') {
        notFound();
    }

    return (
        <div className="py-10 max-w-2xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    {locale === 'vi' && post.title_vi ? post.title_vi : post.title_en}
                </h1>
                <time className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString(locale)}
                </time>
            </header>
            <article className="prose dark:prose-invert">
                <MDXContent source={locale === 'vi' && post.content_vi ? post.content_vi : post.content_en} />
            </article>
        </div>
    );
}
