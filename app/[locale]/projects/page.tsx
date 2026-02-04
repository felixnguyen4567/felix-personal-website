import { getProjects } from '@/app/actions/projects';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('Nav');
    const projects = await getProjects();

    return (
        <div className="py-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t('projects')}</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <Card key={project.id} className="flex flex-col h-full">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                <Link href={`/projects/${project.slug}`} className="hover:underline">
                                    {locale === 'vi' && project.title_vi ? project.title_vi : project.title_en}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <p className="text-muted-foreground flex-1 mb-4">
                                {locale === 'vi' && project.desc_vi ? project.desc_vi : project.desc_en}
                            </p>
                            <div className="flex gap-2 mt-auto">
                                <Link href={`/projects/${project.slug}`}>
                                    <Button variant="outline" size="sm">Read More</Button>
                                </Link>
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        <Button size="sm">Visit Site</Button>
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {projects.length === 0 && (
                    <p className="text-muted-foreground italic">No projects showcased yet.</p>
                )}
            </div>
        </div>
    );
}
