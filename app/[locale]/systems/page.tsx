import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function SystemsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Nav' });

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <header className="mb-16 pb-12 border-b border-border-light">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-text-main">{t('systems')}</h1>
                <p className="text-muted-foreground text-xl max-w-2xl font-light">
                    Systems and frameworks — coming soon.
                </p>
            </header>

            <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="material-symbols-outlined text-6xl text-border-light mb-6">construction</span>
                <p className="text-muted-foreground text-lg font-light max-w-md">
                    This section is under construction. Check back soon for documentation of systems, tools, and workflows.
                </p>
            </div>
        </div>
    );
}
