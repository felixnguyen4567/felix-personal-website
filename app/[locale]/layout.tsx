import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: {
            template: '%s | Felix Ng',
            default: t('title')
        },
        description: t('description'),
        openGraph: {
            title: 'Felix Ng',
            description: t('description'),
            url: 'https://felixng.com',
            siteName: 'Felix Ng',
            locale: locale,
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <NextIntlClientProvider messages={messages}>
                    <NavBar />
                    <main className="flex-grow w-full max-w-5xl mx-auto p-4 sm:p-6">
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
