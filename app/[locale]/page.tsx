import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    // const t = await getTranslations('HomePage');

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
                            {/* AI Post 1 */}
                            <div className="group flex gap-8 items-start">
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 relative">
                                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF3YgB-XURCTWAaw2jEsm883Kp1KZwsCNS4MAYbcTmCOgQX0jhtCnq2SiKm_if05bcDqbmviR6YdRAjZbIeuEI5SOpWszzi5nqFA33SYKnNWBMUyX-Dt2KUbZgslylXs5Ypvce4s_KS6jzw567HG_R0AhFFGb0SvJYCLVFUGWWYF5YpZNkm2f5uHR_EhFynd3O7H1I7H1-PC6gIq_oedLqIeH8fVSm7Mfr1R86wzhgJMPzg_YiUqh6M4VJxWtKxQRJwWBsqe637Ew" alt="Hardware" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Hardware</span>
                                    <h4 className="text-lg font-semibold text-text-main mt-1 mb-2 group-hover:text-primary transition-colors">NVIDIA Blackwell: A Quantum Leap?</h4>
                                    <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">Analyzing the latest architecture gains in token-per-second throughput for large scale models.</p>
                                    <Link href="/ai-news/hardware-blackwell" className="inline-block mt-3 text-xs font-semibold text-primary/70 hover:text-primary uppercase tracking-tighter">Read Full Insight</Link>
                                </div>
                            </div>
                            {/* AI Post 2 */}
                            <div className="group flex gap-8 items-start">
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 relative">
                                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtf4n9GOaZIFBCz92vXsnrNs6fQaALQUaN_bE98cgrBCgf6qbJoEJt-ISnb4tzOqfJVL-kaIoRifZiY3Pjj3ODRPCUGkjxvHnEGVReJzdZ8qCQ4pYh54qwZ8vYFsz_tpOUgYv9xCtmNQh4q5v6hZig9qQnREQWQW9pmlkxuP4ahhDHVuD66OrR-l9tArq_9t0-KqE7dk4jU-fon5rAH_MjkbAeLCOf5fbdPotk4e3xqEwU_gKjdeYyAHYsnUNjnQWDndvEGOddFnY" alt="Research" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Research</span>
                                    <h4 className="text-lg font-semibold text-text-main mt-1 mb-2 group-hover:text-primary transition-colors">The Rise of Localized LLMs</h4>
                                    <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">How small language models (SLMs) are becoming the standard for enterprise-grade edge computing.</p>
                                    <Link href="/ai-news/slm-research" className="inline-block mt-3 text-xs font-semibold text-primary/70 hover:text-primary uppercase tracking-tighter">Read Full Insight</Link>
                                </div>
                            </div>
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
                            <Link href="/journal/designing-for-discomfort" className="group py-6 border-b border-border-light first:pt-0">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Oct 12, 2024</span>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">arrow_outward</span>
                                </div>
                                <h4 className="text-lg font-medium text-text-main group-hover:text-primary transition-colors">Designing for Discomfort: Why friction in AI matters.</h4>
                            </Link>
                            <Link href="/journal/python-vs-rust" className="group py-6 border-b border-border-light">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Sep 28, 2024</span>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">arrow_outward</span>
                                </div>
                                <h4 className="text-lg font-medium text-text-main group-hover:text-primary transition-colors">Python vs. Rust for Scalable Data Crawlers.</h4>
                            </Link>
                            <Link href="/journal/death-of-static-ui" className="group py-6 border-b border-border-light">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Aug 15, 2024</span>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">arrow_outward</span>
                                </div>
                                <h4 className="text-lg font-medium text-text-main group-hover:text-primary transition-colors">The death of the static UI: Moving to generative systems.</h4>
                            </Link>
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
