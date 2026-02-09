import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    const slug = request.nextUrl.searchParams.get('slug');

    if (!slug) {
        return new ImageResponse(
            (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', color: 'white', fontFamily: 'sans-serif' }}>
                    <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.02em' }}>FELIX NG</div>
                    <div style={{ fontSize: 24, opacity: 0.7, marginTop: 16 }}>Developer · Designer · AI Explorer</div>
                </div>
            ),
            { width: 1200, height: 630 }
        );
    }

    const post = await prisma.post.findUnique({ where: { slug } });

    if (!post) {
        return new ImageResponse(
            (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', fontFamily: 'sans-serif' }}>
                    <div style={{ fontSize: 48, fontWeight: 700 }}>FELIX NG</div>
                    <div style={{ fontSize: 24, opacity: 0.6, marginTop: 12 }}>Post not found</div>
                </div>
            ),
            { width: 1200, height: 630 }
        );
    }

    const typeLabel = post.type.replace('_', ' ');
    const date = post.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return new ImageResponse(
        (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', color: 'white', fontFamily: 'sans-serif', padding: 80 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                    <div style={{ display: 'flex', fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', padding: '6px 16px', borderRadius: 6 }}>
                        {typeLabel}
                    </div>
                    <div style={{ display: 'flex', fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>{date}</div>
                </div>

                <div style={{ display: 'flex', fontSize: 56, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: 900, marginBottom: 'auto' }}>
                    {post.title_en.length > 80 ? post.title_en.substring(0, 80) + '...' : post.title_en}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32, marginTop: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>FELIX NG</div>
                        <div style={{ display: 'flex', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>felixng.com</div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
