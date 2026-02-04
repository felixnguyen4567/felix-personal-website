import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function NotesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Nav' });

    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-4">{t('notes')}</h1>
            <p className="text-muted-foreground">Research notes coming soon.</p>
        </div>
    );
}
