import { getProjectBySlug } from '@/app/actions/projects';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import { setRequestLocale } from 'next-intl/server';
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
    const { locale, slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {};
    }

    const title = locale === 'vi' && project.title_vi ? project.title_vi : project.title_en;
    const description = locale === 'vi' && project.desc_vi ? project.desc_vi : project.desc_en;

    return {
        title,
        description,
        openGraph: {
            title,
            description: description || undefined,
            type: 'website',
        }
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    setRequestLocale(locale);
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const title = locale === 'vi' && project.title_vi ? project.title_vi : project.title_en
    const content = locale === 'vi' && project.content_vi ? project.content_vi : project.content_en

    return (
        <div className="py-10 max-w-3xl mx-auto">
            <div className="mb-8">
                <Link href="/projects" className="text-sm text-muted-foreground hover:underline mb-4 block">
                    &larr; Back to Projects
                </Link>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button>Visit Live Site</Button>
                    </a>
                )}
            </div>

            <article className="prose dark:prose-invert max-w-none">
                <MDXContent source={content} />
            </article>
        </div>
    );
}
