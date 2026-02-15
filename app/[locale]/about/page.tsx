import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

const techStack = [
    { name: 'TypeScript', icon: '⚡' },
    { name: 'React / Next.js', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Prisma', icon: '🔷' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Supabase', icon: '⚡' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AI / LLMs', icon: '🤖' },
];

const timeline = [
    { year: '2024–Present', role: 'AI & Full-Stack Engineer', detail: 'Building agentic AI systems and full-stack web applications. Exploring the intersection of human-centered design and machine intelligence.' },
    { year: '2023', role: 'Web Developer', detail: 'Focused on modern web technologies, responsive design, and performance optimization for production applications.' },
    { year: '2022', role: 'Technology Explorer', detail: 'Deep dive into cloud infrastructure, DevOps practices, and distributed systems design.' },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="pt-32 pb-32 px-4 sm:px-8 max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 pb-24 border-b border-border-light">
                <div className="md:col-span-4 flex justify-center md:justify-start">
                    <div className="relative w-48 h-48 md:w-full md:h-72 rounded-2xl overflow-hidden bg-secondary shadow-sm border border-border-light">
                        <Image
                            src="/images/felix.jpg"
                            alt="Felix Ng"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
                <div className="md:col-span-8 flex flex-col justify-center">
                    <h1 className="text-5xl md:text-6xl font-serif italic mb-8 text-text-main">About Me</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-6 font-light">
                        {locale === 'vi'
                            ? 'Xin chào! Mình là Felix — một developer đam mê thiết kế giao diện đẹp và xây dựng hệ thống AI thông minh.'
                            : "Hi, I'm Felix — a developer passionate about crafting beautiful interfaces and building intelligent AI systems."
                        }
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed font-light">
                        {locale === 'vi'
                            ? 'Mình tin rằng công nghệ tốt nhất là khi nó trở nên vô hình — hoạt động hoàn hảo mà người dùng không cần suy nghĩ. Đó là triết lý thiết kế mà mình theo đuổi trong mọi dự án.'
                            : 'I believe the best technology becomes invisible — working seamlessly so users never have to think about it. That\'s the design philosophy I bring to every project.'
                        }
                    </p>
                </div>
            </div>

            {/* Tech Stack */}
            <section className="mb-24 pb-24 border-b border-border-light">
                <div className="mb-10">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Tech Stack</h2>
                    <h3 className="text-3xl font-semibold text-text-main">Tools & Technologies</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {techStack.map((tech) => (
                        <div key={tech.name} className="group bg-slate-50 dark:bg-slate-900 border border-border-light rounded-xl p-5 text-center hover:border-primary/50 hover:shadow-sm transition-all duration-300">
                            <div className="text-2xl mb-3">{tech.icon}</div>
                            <span className="text-xs font-bold uppercase tracking-wider text-text-main">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Timeline */}
            <section className="mb-24">
                <div className="mb-10">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Journey</h2>
                    <h3 className="text-3xl font-semibold text-text-main">Experience</h3>
                </div>
                <div className="space-y-0">
                    {timeline.map((item, i) => (
                        <div key={i} className="group relative pl-8 pb-12 last:pb-0 border-l-2 border-border-light hover:border-primary transition-colors">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-border-light group-hover:border-primary group-hover:bg-primary/10 transition-all" />
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-3">
                                <span className="text-xs font-bold text-primary uppercase tracking-widest whitespace-nowrap">{item.year}</span>
                                <h4 className="text-lg font-semibold text-text-main">{item.role}</h4>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl font-light">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Connect CTA */}
            <section className="text-center py-16 bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-border-light">
                <h2 className="text-3xl font-serif italic mb-6 text-text-main">
                    {locale === 'vi' ? "Hãy kết nối!" : "Let's Connect"}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg font-light">
                    {locale === 'vi'
                        ? 'Luôn sẵn sàng cho những dự án thú vị và những cuộc trò chuyện có ý nghĩa.'
                        : "Always open to interesting projects and meaningful conversations."
                    }
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-medium transition-all hover:opacity-90 shadow-sm">
                        {locale === 'vi' ? 'Liên hệ' : 'Get in Touch'}
                    </Link>
                    <Link href="/projects" className="bg-background border border-border-light text-text-muted px-8 py-3.5 rounded-lg font-medium transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                        {locale === 'vi' ? 'Xem dự án' : 'View Projects'}
                    </Link>
                </div>
            </section>
        </div>
    );
}
