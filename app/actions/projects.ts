'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { logAudit } from '@/lib/audit'
import { prisma } from '@/lib/prisma'

export async function createProject(prevState: unknown, formData: FormData) {
    const title_en = formData.get('title_en') as string
    const desc_en = formData.get('desc_en') as string
    const content_en = formData.get('content_en') as string
    const slug = formData.get('slug') as string
    const link = formData.get('link') as string
    const locale = formData.get('locale') as string

    let user = await prisma.user.findFirst()
    if (!user) {
        user = await prisma.user.create({
            data: {
                email: 'admin@temp.com',
                name: 'Admin'
            }
        })
    }

    try {
        await prisma.project.create({
            data: {
                slug,
                title_en,
                desc_en,
                content_en,
                link,
                authorId: user.id
            }
        })
        await logAudit('CREATE', 'PROJECT', `Created project: ${slug}`, user.id)
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return { error: 'Failed to create project: ' + message }
    }

    revalidatePath(`/${locale}/admin/projects`)
    redirect(`/${locale}/admin/projects`)
}

export async function updateProject(id: string, prevState: unknown, formData: FormData) {
    const title_en = formData.get('title_en') as string
    const desc_en = formData.get('desc_en') as string
    const content_en = formData.get('content_en') as string
    const slug = formData.get('slug') as string
    const link = formData.get('link') as string
    const locale = formData.get('locale') as string

    try {
        await prisma.project.update({
            where: { id },
            data: {
                slug,
                title_en,
                desc_en,
                content_en,
                link
            }
        })
        await logAudit('UPDATE', 'PROJECT', `Updated project: ${slug}`)
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return { error: 'Failed to update project: ' + message }
    }

    revalidatePath(`/${locale}/admin/projects`)
    redirect(`/${locale}/admin/projects`)
}

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function getProject(id: string) {
    return await prisma.project.findUnique({ where: { id } })
}

export async function getProjectBySlug(slug: string) {
    return await prisma.project.findUnique({ where: { slug } })
}

export async function deleteProject(id: string) {
    await prisma.project.delete({ where: { id } })
    await logAudit('DELETE', 'PROJECT', `Deleted project: ${id}`)
    revalidatePath('/admin/projects')
}
