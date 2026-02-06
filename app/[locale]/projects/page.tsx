import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    // const t = await getTranslations('ProjectsPage');

    return (
        <div className="py-20 px-4 sm:px-8">
            <div className="flex flex-col gap-12 mb-20">
                <div className="max-w-3xl">
                    <h1 className="text-6xl md:text-7xl font-serif italic mb-8">Selected Works</h1>
                    <p className="text-muted-foreground text-xl leading-relaxed font-light">
                        A curated gallery focusing on the intersection of minimalist aesthetics and high-performance engineering.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-primary bg-primary text-primary-foreground transition-all">All</button>
                    <button className="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-border-light bg-secondary hover:border-primary transition-all">AI & ML</button>
                    <button className="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-border-light bg-secondary hover:border-primary transition-all">Development</button>
                    <button className="px-6 py-2 text-xs font-bold tracking-widest uppercase border border-border-light bg-secondary hover:border-primary transition-all">Product Design</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                {/* Project 1 */}
                <Link href="/projects/neural-interface" className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-8">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnJdlPGvxoiYO5EJ-M2GUjQugOVeDsSEVZspZsVMOOkFvufiBEIfLHMagmBofbX7hweZxi2YP_TOXIF1mXzSKDX0cW6MeQqfp_27ev58IHB7q1J0-y5V3UfUIAeKKrhsFJnKqolQNijJcIDNWY90ICyQtRUNqJ2_B7P25_4sBd2IfSDa38fhuLhtoOqcmHa6TZWxdClaLTsPkNINoUt5mnQEa_sM4b9s0BGArGhTDfhbe1WBJTDk6H4_mApUmXMlI54PEmOW50rAA"
                            alt="Neural Vision Core"
                            fill
                            className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-border-light">Artificial Intelligence</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">Neural Vision Core</h3>
                            <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary transition-colors">north_east</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                            Real-time object detection engine optimized for minimal resource environments.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-light">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Python</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">TensorFlow</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">OpenCV</span>
                        </div>
                    </div>
                </Link>

                {/* Project 2 */}
                <Link href="/projects/fintech-suite-pro" className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-8">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdYjVfjPCkVEpYFs0dNGH5kPlfKlI4E1UrKNX_AB8EIKrZ__sz3KGGv_6AAM-yRZW_21-UmCPKDl0fe7t9GDnNVqoeIrsk00iGCA0i2jZ5UnrDyezyU4j6NKzlsQDSEp7WBK49pQluy9tFvyISf9Er2WiLZ7LufF5ZtigW-M7Lt1FGVhAyiulu9RGojOemwwcNrEPAU51O2CZsrzJQHORQTVOwyBzdThApai-ANyCYPxPmJGQZgizZcTMTXtIGBedu4OjPvR4BD5U"
                            alt="FinTech Suite Pro"
                            fill
                            className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-border-light">Development</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">FinTech Suite Pro</h3>
                            <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary transition-colors">north_east</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                            A streamlined banking interface focused on clarity and transaction transparency.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-light">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">React</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Node.js</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PostgreSQL</span>
                        </div>
                    </div>
                </Link>

                {/* Project 3 */}
                <Link href="/projects/healthsync-interface" className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-8">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7M91JI7XIPOvJNfuXKNjsg2cYWJGH70bbYA0HT7LSrDsHQVxSS43PCi_8YfCxVWIgS2IKjUshi01qVzuOvm3s78vYhgc3BcECgSxDrWCA7B9rsqYGLtr5zRUThGzKWaDsjHessWn80QNJfObUClR_u9z_UIgUCqEpv27WawNjFSQBwVv0QEQ-jUNOESae-J40QqeY6O0VTlQCJkXQs2YnPDgYgOL5tx2S-ojYwEReYRh961XiNX9yrW9dMDWQB50OsgCISWr_jr8"
                            alt="HealthSync Interface"
                            fill
                            className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-border-light">UX Research</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">HealthSync Interface</h3>
                            <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary transition-colors">north_east</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                            Human-centered accessibility study for remote patient monitoring platforms.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-light">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Figma</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Prototyping</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Case Study</span>
                        </div>
                    </div>
                </Link>

                {/* Project 4 */}
                <Link href="/projects/semantic-search" className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-8">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1HutkHIuo9Zi3U-MxcRkvTj_1R9BrxjR7taNy7pfbO8gGAHme9fqyJxyBq23OmRMWbRebc2awmXPRS45wSUWYPsduA58ngis4WIEYWAnfaAz8XJUJsa_Giu2gr-4uxSUHEYjKDT-FgBpqUl3hHsgprYvgSeKBrlGIO55G7EdlndFNVXRbWOK20dqCMXox8kiH6ZUEn2DetWHZ0vNWgYqM4w5tLDjeMHX9gim4ReDZkib6RpK0Q0WgQ_7ccBa_Oj5AcphAPp5NkiM"
                            alt="Semantic Search"
                            fill
                            className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-border-light">AI & ML</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">Semantic Search</h3>
                            <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary transition-colors">north_east</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                            Vector-based indexing for hyper-fast retrieval in documentation ecosystems.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-light">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PyTorch</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pinecone</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Next.js</span>
                        </div>
                    </div>
                </Link>

                {/* Project 5 */}
                <Link href="/projects/growth-engine" className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-8">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB127Pg7wmNt8IsXhdcKJ1lNry9_hHVRuBkgNVAbfbcQZpSahu6qfXNpmt4KBD3K08bglTlIdVHaGk5G9T_A-yOBSJdmpv5EDEqL0siANz6j1qixO6xtnoE3sLOBtWZtkiK_RgjaqYtzsc5_UWYzWNLzWS5T8uhgTsPGaHaOWRC9JzQitJG_Fy4hwBgq2pG8xzoaWkaw9yFP-9HRuMu5yuAtze7K2N-mAknjrfGCZXrMdosJlA51WFW7N4JwDmOoXFDTYnswGWO-VQ"
                            alt="Growth Engine"
                            fill
                            className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-border-light">Product Design</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">Growth Engine</h3>
                            <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary transition-colors">north_east</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                            A conversion-focused SaaS architecture with high-fidelity interactive elements.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-light">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Three.js</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tailwind</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Framer</span>
                        </div>
                    </div>
                </Link>

                {/* Project 6 */}
                <Link href="/projects/e-learn-system" className="group flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-8">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJlIKsTgEdHbppflA55KUvR94jxybWPCle622rFwffDiv-9YLWtRsZnJnCLCD6A9MQXz6S0NFykBJyrOeK8ITRmy1Kt82f1ekZboQnU_OuxoGfEnOxOY1GUsiidHVqIXjOrVmlMhEy90yPRO6KBIf-E06Us3dVRn7My2Ps0Eh61pPmYC2JCHes146_sleGymSeHT22IXqZMlLtUSKYIBcWLciaVsD40lkADzFqvMVhrvOVwMk6TVfUTendE3QEJm9Iq1mfdjMi4ds"
                            alt="E-Learn System"
                            fill
                            className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-border-light">Design System</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">E-Learn System</h3>
                            <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary transition-colors">north_east</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
                            Unified visual language ensuring consistency across multi-platform educational tools.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-light">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tokens</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Storybook</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Accessibility</span>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="mt-32 flex flex-col items-center gap-8">
                <button className="group flex items-center gap-4 px-12 py-4 border border-primary text-xs font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all">
                    Explore More <span className="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform">expand_more</span>
                </button>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">6 of 24 projects documented</p>
            </div>
        </div>
    );
}
