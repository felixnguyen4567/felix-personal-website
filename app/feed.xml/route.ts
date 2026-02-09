import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://felixng.com';

    const rssItems = posts.map((post) => {
        const link = `${siteUrl}/en/${post.type === 'AI_NEWS' ? 'ai-news' : post.type === 'JOURNAL' ? 'journal' : post.type === 'NOTE' ? 'notes' : 'logs'}/${post.slug}`;
        return `
    <item>
      <title><![CDATA[${post.title_en}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.createdAt.toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt_en || post.content_en.substring(0, 200)}]]></description>
      <category>${post.type.replace('_', ' ')}</category>
    </item>`;
    }).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Felix Ng</title>
    <link>${siteUrl}</link>
    <description>Personal blog and portfolio by Felix Ng — AI, engineering, and design.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rss, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
