import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'HomePage' });

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
                <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-lg text-muted-foreground">{t('intro')}</p>
                <p className="text-sm text-gray-500">{t('sub_intro')}</p>
            </main>
        </div>
    );
}
