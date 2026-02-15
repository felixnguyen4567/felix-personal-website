import { NextRequest, NextResponse } from 'next/server';
import { PostType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.AUTOMATION_API_KEY}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const {
            title_en,
            title_vi,
            content_en,
            content_vi,
            slug,
            type = 'JOURNAL',
            published = false,
            coverImageUrl
        } = body;

        if (!title_en || !content_en || !slug) {
            return NextResponse.json({ error: 'Missing required fields: title_en, content_en, slug' }, { status: 400 });
        }

        // Validate type
        const validTypes = ['LOG', 'NOTE', 'JOURNAL', 'AI_NEWS'];
        if (!validTypes.includes(type)) {
            return NextResponse.json({ error: `Invalid type. Must be one of: ${validTypes.join(', ')}` }, { status: 400 });
        }

        // Ensure Admin User Exists for attribution
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: 'automation@system.local',
                    name: 'Automation Bot'
                }
            });
        }

        const post = await prisma.post.create({
            data: {
                slug,
                title_en,
                title_vi: title_vi || null,
                content_en,
                content_vi: content_vi || null,
                type: type as PostType,
                published,
                coverImageUrl: coverImageUrl || null,
                authorId: user.id
            },
        });

        // Revalidate cache for relevant pages
        revalidatePath('/[locale]/journal', 'page');
        revalidatePath('/[locale]/ai-news', 'page');
        revalidatePath('/[locale]', 'layout');

        return NextResponse.json({ success: true, post }, { status: 201 });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
