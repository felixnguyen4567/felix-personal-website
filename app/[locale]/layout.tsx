import { Geist_Mono, Inter, Space_Grotesk, Crimson_Pro, Manrope, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
    variable: "--font-crimson-pro",
    subsets: ["latin"],
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair-display",
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
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
                <script dangerouslySetInnerHTML={{
                    __html: `
                    (function(){
                        var t=localStorage.getItem('theme');
                        var d=t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme:dark)').matches);
                        if(d)document.documentElement.classList.add('dark');
                    })();
                `}} />
            </head>
            <body
                className={`${inter.variable} ${spaceGrotesk.variable} ${crimsonPro.variable} ${manrope.variable} ${playfair.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-text-main font-sans selection:bg-primary selection:text-white`}
            >
                <NextIntlClientProvider messages={messages}>
                    <NavBar />
                    <main className="flex-grow w-full">
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
