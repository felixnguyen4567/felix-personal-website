import { getPosts } from '@/app/actions/posts';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default async function NotesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Nav');
    const posts = await getPosts('NOTE');

    return (
        <div className="py-10 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t('notes')}</h1>
            <div className="grid gap-6">
                {posts.map((post) => (
                    <Link key={post.id} href={`/notes/${post.slug}`} className="block p-6 border rounded-lg hover:bg-muted/50 transition-colors">
                        <h2 className="text-xl font-semibold mb-2">
                            {locale === 'vi' && post.title_vi ? post.title_vi : post.title_en}
                        </h2>
                        <time className="text-sm text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString(locale)}
                        </time>
                    </Link>
                ))}
                {posts.length === 0 && (
                    <p className="text-muted-foreground italic">No notes published yet.</p>
                )}
            </div>
        </div>
    );
}
