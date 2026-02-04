import { getPosts } from '@/app/actions/posts';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default async function LogsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Nav');
    const posts = await getPosts('LOG');

    return (
        <div className="py-10 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t('logs')}</h1>
            <div className="space-y-8">
                {posts.map((post) => (
                    <article key={post.id} className="border-b pb-4 last:border-0">
                        <Link href={`/logs/${post.slug}`} className="group">
                            <h2 className="text-xl font-semibold group-hover:underline mb-2">
                                {locale === 'vi' && post.title_vi ? post.title_vi : post.title_en}
                            </h2>
                        </Link>
                        <time className="text-sm text-muted-foreground block mb-2">
                            {new Date(post.createdAt).toLocaleDateString(locale)}
                        </time>
                        <p className="text-gray-600 line-clamp-3">
                            {post.excerpt_en || 'Read more...'}
                        </p>
                    </article>
                ))}
                {posts.length === 0 && (
                    <p className="text-muted-foreground italic">No logs published yet.</p>
                )}
            </div>
        </div>
    );
}
