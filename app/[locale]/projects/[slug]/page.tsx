import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    // const t = await getTranslations('ProjectDetailPage');

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 font-display">
            {/* Hero Section */}
            <div className="flex flex-col gap-8 mb-16 lg:mb-24">
                <div className="flex flex-wrap gap-2 text-sm font-medium text-muted-foreground">
                    <Link className="hover:text-primary" href="/projects">Projects</Link>
                    <span>/</span>
                    <span className="text-text-main">AI-Driven Analytics Dashboard</span>
                </div>
                <div className="max-w-4xl">
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-text-main mb-6">
                        Redefining data visualization with AI.
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                        A comprehensive analytics platform that uses machine learning to predict market trends and automate reporting for enterprise clients.
                    </p>
                </div>
                <div className="w-full aspect-[21/9] rounded-xl overflow-hidden shadow-2xl bg-background relative">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ggC4UP5dsL4oadCgUqxs8M9nQA75wv1Da4aMAimtSDvco_fgZSL6vdRQTu2GtxcIAltvdoqeq5xJazz_111EtTMjsFSBnujKbERrXepDhp8QzlKlRGh_flms_lZ7S8YmyPYExxIgiZZQq71iPnnuOQPqmQz7F8VdjyXYe2UQCEH1StWelad9UReg2ZzVvh2HMJwZszpHIhj-eN69hw4eA38cNPGK91JcXKIPr077bSuGNp_G41zbMX08xGtYJOPkCsFvKc1x_-4"
                        alt="Dashboard UI"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Project Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                {/* Sidebar (Metadata) */}
                <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-10">
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Role</h4>
                            <p className="text-lg font-semibold text-text-main">Lead UI Designer & Frontend Developer</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold text-text-main">React</span>
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold text-text-main">Tailwind CSS</span>
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold text-text-main">Python</span>
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold text-text-main">TensorFlow</span>
                                <span className="px-3 py-1 bg-secondary rounded-full text-xs font-bold text-text-main">PostgreSQL</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Links</h4>
                            <div className="flex flex-col gap-3">
                                <a className="flex items-center gap-2 text-primary font-bold hover:underline" href="#">
                                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                    View Live Demo
                                </a>
                                <a className="flex items-center gap-2 text-muted-foreground font-bold hover:text-text-main" href="#">
                                    <span className="material-symbols-outlined text-[18px]">code</span>
                                    GitHub Repository
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-sm italic text-muted-foreground leading-relaxed">
                            &quot;The goal was to make complex data feel approachable. We focused on clarity over decoration.&quot;
                        </p>
                    </div>
                </aside>

                {/* Case Study Text */}
                <div className="lg:col-span-8 space-y-16">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-text-main">Overview</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-muted-foreground space-y-4">
                            <p>
                                In the rapidly evolving landscape of enterprise business, data is king. However, raw data often creates more noise than insight. This project was born from the need to provide executives with a &quot;single pane of glass&quot; view into their company&apos;s operational health.
                            </p>
                            <p>
                                The AI-Driven Analytics Dashboard integrates with existing CRMs to pull real-time data, process it through a custom-trained LLM, and output actionable intelligence rather than just rows of numbers.
                            </p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-text-main">The Challenge</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-muted-foreground space-y-4">
                            <p>
                                The primary hurdle was <strong>information density</strong>. Users were overwhelmed by traditional dashboards that tried to show everything at once. We needed a system that prioritized information based on urgency and relevance to the specific user role.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li>Optimizing rendering for datasets with over 100,000 live nodes.</li>
                                <li>Creating a natural language interface for data querying.</li>
                                <li>Ensuring accessibility standards across complex SVG visualizations.</li>
                            </ul>
                        </div>
                    </section>
                    <div className="grid grid-cols-2 gap-4 my-8">
                        <div className="aspect-video bg-secondary rounded-lg overflow-hidden shadow-md relative">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCviEurp_M7L4Toukz4kWLyoamgAEWAN5K67KWF6Y3_wTsufYtumkysPKy6lowlc2np1fmnXugvGNa_qh03FNnz7L8sMs8HYS0PA_uZjUb7dq3YujiMfyWiTFozXjujmRiP6Arr-aE69Ij8cq9znHcu9_Hdxj_09r2t95kV6YWnpV_MKws9aSbzHhRxIeoolqnTK9so4GkQSx_jP0TS9PP2AzagEFKNFWNfJccDOUZo0BJn6RClZhIlM8_e_yJFZY9CFmH14pHdlg0" alt="Mobile View" fill className="object-cover" />
                        </div>
                        <div className="aspect-video bg-secondary rounded-lg overflow-hidden shadow-md relative">
                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtXcO9AwlBTi8NlOzwn_WKKu0qShFa7UB_oKwbDVBNZiC6sWpv-4hrgGm5k4D96BFX7cj2OKyh6wMva1vyHwNUf-AMXmX7pCjDCnAcCTEstK0bgvKO0eCd4o1vE0s2dFMVY9OXqc-lmP81vhAOmWZmTaUquv35lwyTyMvgAPOAaHyuLNCjjP5BIgmabD8l0bEC9D3xlEtG8UgPFD29tTpIJJLt4I4F3IkC9Y-aU6W3rTFyI2s7TE-rvwF5MM6bpDbSAPZZKHoMaHw" alt="Analytics" fill className="object-cover" />
                        </div>
                    </div>
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-text-main">The Solution</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-muted-foreground space-y-4">
                            <p>
                                We implemented a &quot;Progressive Disclosure&quot; design pattern. The home screen features three high-level KPIs that, when clicked, drill down into deeper levels of granularity.
                            </p>
                            <p>
                                The standout feature is the <strong>AI Assistant Panel</strong>, which allows users to ask questions like &quot;Why did our churn rate increase in Q3?&quot; and receive a generated report with supporting visual evidence.
                            </p>
                            <div className="bg-background p-8 rounded-xl border border-border-light mt-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-4 text-text-main">The Outcome</h3>
                                <p>The platform reduced the time spent on monthly reporting by 70% and increased data engagement across non-technical departments by 45% within the first three months of implementation.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Next Project Navigation */}
            <div className="mt-24 lg:mt-32 pt-12 border-t border-border-light">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">Next Project</h4>
                <Link href="/projects/fintech-mobile-app" className="group block relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtxlOJ9F_4sNsl417hvd_A47c9MjmYT-4GG6mSSZyl4VIeWOMpbjSIGJhIW819_wDHKlyHc9JEujRR_WeTO9d4tTE6a7eumkuy9gVkHmMEAw5A3IKgZRRZ9qOy9GFgXkiqKPAdGKeyD9W1ydmwj5Io045au2PHCB95gS8u-m30YbkQWaciziZAfPxuUhFohLYn8tg7OC-b1BsP6aNTlq8rvAGuQVsH68lvPccpIMKcG8E30ONQoU4ihIjxsxiAR-cw_kQuYxrSKkc"
                        alt="Next Project Preview"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6">
                        <span className="text-sm font-bold bg-white/20 backdrop-blur-md px-4 py-1 rounded-full mb-4">Case Study</span>
                        <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight">FinTech Mobile App</h3>
                        <div className="mt-6 flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                            View Project <span className="material-symbols-outlined">arrow_forward</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
