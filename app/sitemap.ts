import { MetadataRoute } from 'next'
import { getPosts } from '@/app/actions/posts'
import { getProjects } from '@/app/actions/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://felixng.com'

    // Static routes for each locale
    const locales = ['en', 'vi']
    const routes = ['', '/logs', '/notes', '/projects', '/about']

    const staticEntries = locales.flatMap(locale =>
        routes.map(route => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    )

    // Dynamic entries
    const posts = await getPosts()
    const postEntries = locales.flatMap(locale =>
        posts.map(post => ({
            url: `${baseUrl}/${locale}/${post.type === 'LOG' ? 'logs' : 'notes'}/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    )

    const projects = await getProjects()
    const projectEntries = locales.flatMap(locale =>
        projects.map(project => ({
            url: `${baseUrl}/${locale}/projects/${project.slug}`,
            lastModified: project.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }))
    )

    return [...staticEntries, ...postEntries, ...projectEntries]
}
