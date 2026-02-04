import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Nav' });

    return (
        <div className="py-10 mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">{t('about')}</h1>
            <div className="prose dark:prose-invert">
                <p>
                    Explorer. Builder. Minimalist.
                </p>
            </div>
        </div>
    );
}
