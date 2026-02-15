import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getProjects } from '@/app/actions/projects';
import { localized } from '@/lib/utils';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const projects = await getProjects();

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
            <header className="mb-16 pb-12 border-b border-border-light">
                <h1 className="text-5xl md:text-6xl font-serif italic mb-4 text-text-main">Selected Works</h1>
                <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed font-light">
                    A curated gallery focusing on the intersection of minimalist aesthetics and high-performance engineering.
                </p>
            </header>

            {projects.length === 0 ? (
                <p className="text-muted-foreground text-center py-16">No projects published yet. Add them through the admin panel.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {projects.map((project) => {
                        const tags = project.tags ? project.tags.split(',').map(t => t.trim()) : [];
                        return (
                            <Link key={project.id} href={`/projects/${project.slug}`} className="group flex flex-col">
                                <div className="relative aspect-[4/5] overflow-hidden bg-secondary rounded-2xl mb-6 border border-border-light">
                                    {project.coverImageUrl ? (
                                        <Image
                                            src={project.coverImageUrl}
                                            alt={localized(locale, project.title_vi, project.title_en)}
                                            fill
                                            className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-6xl text-primary/30">code</span>
                                        </div>
                                    )}
                                    {project.category && (
                                        <div className="absolute top-5 left-5">
                                            <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-border-light">
                                                {project.category}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-serif text-text-main group-hover:text-primary transition-colors">{localized(locale, project.title_vi, project.title_en)}</h3>
                                        <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1">north_east</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-light line-clamp-2">
                                        {localized(locale, project.desc_vi, project.desc_en)}
                                    </p>
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-3 pt-4 border-t border-border-light">
                                            {tags.map((tag) => (
                                                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
