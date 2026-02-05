import { NextRequest, NextResponse } from 'next/server';
import { PostType } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.AUTOMATION_API_KEY}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title_en, content_en, slug, type = 'LOG', published = false } = body;

        if (!title_en || !content_en || !slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Ensure Admin User Exists for attribution
        let user = await prisma.user.findFirst();
        if (!user) {
            // Fallback for automation if no user exists yet
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
                content_en,
                type: type as PostType,
                published,
                authorId: user.id
            },
        });

        return NextResponse.json({ success: true, post }, { status: 201 });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
