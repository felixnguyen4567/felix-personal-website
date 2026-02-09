import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { PostType } from '@prisma/client';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    // const t = await getTranslations('HomePage');

    const [aiNewsPosts, journalPosts] = await Promise.all([
        prisma.post.findMany({
            where: { type: PostType.AI_NEWS, published: true },
            orderBy: { createdAt: 'desc' },
            take: 2
        }),
        prisma.post.findMany({
            where: { type: PostType.JOURNAL, published: true },
            orderBy: { createdAt: 'desc' },
            take: 3
        })
    ]);

    // Helper to strip markdown and get excerpt
    const getExcerpt = (markdown: string, length: number = 120) => {
        const text = markdown
            .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
            .replace(/[#*`_]/g, '') // Remove formatting chars
            .replace(/\n/g, ' ') // Replace newlines with spaces
            .trim();
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <div className="pt-48 pb-32 px-6">
            <section className="max-w-4xl mx-auto text-center mb-32">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-border-light text-text-muted mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Open for collaboration</span>
                </div>
                <div className="mb-8 relative w-32 h-32 mx-auto">
                    <Image
                        src="/images/felix.jpg"
                        alt="Felix Ng"
                        fill
                        className="object-cover rounded-full border-2 border-slate-100 dark:border-slate-800 shadow-sm"
                        priority
                    />
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-text-main tracking-tight mb-8">
                    Designing interfaces that bridge <span className="text-primary font-normal italic font-serif">human intelligence</span> and technology.
                </h1>
                <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
                    A minimalist approach to complex systems. Focused on building clean, accessible digital products and exploring the frontiers of AI.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/projects" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-medium transition-all hover:bg-slate-800 dark:hover:bg-slate-700 shadow-soft">
                        View My Work
                    </Link>
                    <Link href="/journal" className="bg-background border border-border-light text-text-muted px-8 py-3.5 rounded-lg font-medium transition-all hover:bg-secondary">
                        Read Journal
                    </Link>
                </div>
            </section>

            <section className="section-padding bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl mb-32">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                        <div className="max-w-lg">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Selected Work</h2>
                            <h3 className="text-3xl font-semibold text-text-main">Featured Projects</h3>
                        </div>
                        <Link href="/projects" className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 font-medium text-sm group">
                            Browse all projects <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Project 1 */}
                        <Link href="/projects/neural-interface" className="group bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-hover-soft transition-all duration-300 block">
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Ke16QYAllrTqBK6KkJHSZdAqDPOOakWMg8MidxownvOfMjLHSN9fWFvn9qnZQfNRB29E-Pq4bMjSDenDtwTDMmBaTvNjWNJYEdEPd2vFhrmsYvk2gnBjrDuryjsgENPPSfXmt0-KRoe67LcM9qiYRwkK_rDFCrNIV2hs9IJBzn4ME7QGE0OH1IKcMwbsluPx2iB--cmWzoyNO9fDXrE8_0bOrfIwDFBu-gdCkMvygcRPWnflAGaB2RPYS5wVUr_RxkqCVNb3aMA"
                                    alt="Neural Interface"
                                    fill
                                    className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-3 mb-4">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">UI/UX</span>
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">AI</span>
                                </div>
                                <h4 className="text-xl font-semibold text-text-main mb-3">Neural Interface</h4>
                                <p className="text-text-muted text-sm leading-relaxed mb-6">Simplifying brain-computer interaction through intuitive visual feedback systems.</p>
                                <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-widest">
                                    CASE STUDY <span className="material-symbols-outlined text-sm">trending_flat</span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 2 */}
                        <Link href="/projects/autonomous-crawler" className="group bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-hover-soft transition-all duration-300 block">
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA1DAao22vQSxbt_tDymtb6d66aek1vVEmHZyamUgxrKKYF99pWoSt1KBKqLttL1ywaA0H8yV2EBrshKZ0ows0Fs5cTxIggMwj204VDPXxMNZD3Z_28wyge4TM4yTx7LLKELHGAGiEsuGaABvBEfYGBrWiDX70lQUkyKjIDJ_3ae0nlbmfEDNz-4j3P0K5j8aXAVMx_jHSg_UC2_MAa92S2h1_eN3kOnOZfd7Wxt6f0l6esLC32HqmXDeNzX1k7WJFwUpN8pcefHs"
                                    alt="Data Crawler"
                                    fill
                                    className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-3 mb-4">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Python</span>
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Scraping</span>
                                </div>
                                <h4 className="text-xl font-semibold text-text-main mb-3">Autonomous Crawler</h4>
                                <p className="text-text-muted text-sm leading-relaxed mb-6">Intelligent agents designed to map unstructured data patterns across distributed networks.</p>
                                <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-widest">
                                    VIEW GITHUB <span className="material-symbols-outlined text-sm">trending_flat</span>
                                </div>
                            </div>
                        </Link>

                        {/* Project 3 */}
                        <Link href="/projects/generative-engine" className="group bg-background rounded-xl overflow-hidden shadow-soft hover:shadow-hover-soft transition-all duration-300 block">
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1gU6nd1Vqxs0OQearW6_NlxQPvChtU-1lqjjKJ8EW9AwXZf8ei_EARC3DiEEFkM2gDx7ns98UIDwAwiEt8JcAyBK0UfqAihIxHxhP1xqXu4BK9a1qmn97f5L_aASpgUg3zzJb2Rg-vplmmg3jk6Cjbb5MjOfGiwC59HZ5zRQ01i4EA-cBitouPXM9q5wiqNfjaTtFezxjsJ7ocaqpMlPAHVmelDxKo-XhTEDaciX5IpUENiuavV2W-G0xoqwYIYcMwvYOZk9i-wY"
                                    alt="Generative Art"
                                    fill
                                    className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex gap-3 mb-4">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">GANs</span>
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Art</span>
                                </div>
                                <h4 className="text-xl font-semibold text-text-main mb-3">Generative Engine</h4>
                                <p className="text-text-muted text-sm leading-relaxed mb-6">Fine-tuning architectural models to generate mid-century inspired conceptual sketches.</p>
                                <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-widest">
                                    EXPLORE <span className="material-symbols-outlined text-sm">trending_flat</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-7">
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-text-main flex items-center gap-3">
                                Latest in AI
                            </h3>
                            <div className="h-0.5 w-10 bg-primary/20 mt-4"></div>
                        </div>
                        <div className="space-y-12">
                            {aiNewsPosts.map((post) => (
                                <div key={post.id} className="group flex gap-8 items-start">
                                    <Link href={`/ai-news/${post.slug}`} className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 relative block">
                                        {post.coverImageUrl ? (
                                            <Image
                                                src={post.coverImageUrl}
                                                alt={post.title_en}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-secondary">
                                                <span className="text-2xl">🤖</span>
                                            </div>
                                        )}
                                    </Link>
                                    <div>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">AI News</span>
                                        <Link href={`/ai-news/${post.slug}`}>
                                            <h4 className="text-lg font-semibold text-text-main mt-1 mb-2 group-hover:text-primary transition-colors">
                                                {post.title_en}
                                            </h4>
                                        </Link>
                                        <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
                                            {getExcerpt(post.content_en)}
                                        </p>
                                        <Link href={`/ai-news/${post.slug}`} className="inline-block mt-3 text-xs font-semibold text-primary/70 hover:text-primary uppercase tracking-tighter">
                                            Read Full Insight
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {aiNewsPosts.length === 0 && (
                                <p className="text-text-muted italic">No AI News available yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="mb-12">
                            <h3 className="text-2xl font-semibold text-text-main flex items-center gap-3">
                                Recent Journal
                            </h3>
                            <div className="h-0.5 w-10 bg-primary/20 mt-4"></div>
                        </div>
                        <div className="flex flex-col">
                            {journalPosts.map((post) => (
                                <Link key={post.id} href={`/journal/${post.slug}`} className="group py-6 border-b border-border-light first:pt-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                                            {formatDate(post.createdAt)}
                                        </span>
                                        <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">arrow_outward</span>
                                    </div>
                                    <h4 className="text-lg font-medium text-text-main group-hover:text-primary transition-colors">
                                        {post.title_en}
                                    </h4>
                                </Link>
                            ))}
                            {journalPosts.length === 0 && (
                                <div className="py-6 border-b border-border-light text-text-muted italic">
                                    No journal entries yet.
                                </div>
                            )}

                            <Link href="/journal" className="mt-8 text-primary text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all tracking-widest">
                                VIEW ALL POSTS <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
