'use server'

import { PostType } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { logAudit } from '@/lib/audit'
import { prisma } from '@/lib/prisma'

export async function createPost(prevState: unknown, formData: FormData) {
    const title_en = formData.get('title_en') as string
    const content_en = formData.get('content_en') as string
    const slug = formData.get('slug') as string
    const type = formData.get('type') as PostType || 'LOG'
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
        const post = await prisma.post.create({
            data: {
                slug,
                title_en,
                content_en,
                type,
                authorId: user.id
            }
        })
        await logAudit('CREATE', 'POST', `Created post: ${slug} (${post.type})`, user.id)
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return { error: 'Failed to create post: ' + message }
    }

    revalidatePath(`/${locale}/admin/posts`)
    redirect(`/${locale}/admin/posts`)
}

export async function updatePost(id: string, prevState: unknown, formData: FormData) {
    const title_en = formData.get('title_en') as string
    const content_en = formData.get('content_en') as string
    const slug = formData.get('slug') as string
    const type = formData.get('type') as PostType
    const locale = formData.get('locale') as string

    try {
        const post = await prisma.post.update({
            where: { id },
            data: {
                slug,
                title_en,
                content_en,
                type
            }
        })
        await logAudit('UPDATE', 'POST', `Updated post: ${slug}`, post.authorId)
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return { error: 'Failed to update post: ' + message }
    }

    revalidatePath(`/${locale}/admin/posts`)
    redirect(`/${locale}/admin/posts`)
}

export async function getPosts(type?: PostType) {
    return await prisma.post.findMany({
        where: type ? { type } : undefined,
        orderBy: { createdAt: 'desc' }
    })
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({ where: { id } })
}

export async function getPostBySlug(slug: string) {
    return await prisma.post.findUnique({ where: { slug } })
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } })
    await logAudit('DELETE', 'POST', `Deleted post: ${id}`)
    revalidatePath('/admin/posts')
}
