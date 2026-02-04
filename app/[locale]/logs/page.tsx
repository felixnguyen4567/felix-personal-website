import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function LogsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Nav' });

    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-4">{t('logs')}</h1>
            <p className="text-muted-foreground">Work logs coming soon.</p>
        </div>
    );
}
