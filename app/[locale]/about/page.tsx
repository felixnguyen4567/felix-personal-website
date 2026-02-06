import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Nav' });

    return (
        <div className="py-20 px-8 max-w-4xl mx-auto">
            <h1 className="text-6xl font-serif italic mb-12">About.</h1>
            <div className="prose prose-lg dark:prose-invert font-light text-muted-foreground">
                <p className="text-2xl leading-relaxed text-text-main mb-8">
                    I am a developer and designer positioned at the intersection of aesthetic minimalism and high-performance engineering.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12 text-base">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Background</h3>
                        <p>
                            With a background in both computer science and visual arts, I strive to build software that is not only functional but also inherently beautiful. I believe that the best tools are the ones that get out of the way, allowing human creativity to flourish.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Focus</h3>
                        <p>
                            Currently, I am exploring the capabilities of Generative AI to redefine user interfaces. My work focuses on creating &quot;intent-based&quot; systems where the UI adapts to the user&apos;s needs in real-time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
