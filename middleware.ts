import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    // Update session (token refresh)
    const { response: finalResponse, user } = await updateSession(request, response);

    // Protect admin routes: redirect to login if unauthenticated
    const pathname = request.nextUrl.pathname;
    if (pathname.match(/^\/(en|vi)\/admin/)) {
        if (!user) {
            const loginUrl = new URL('/en/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return finalResponse;
}

export const config = {
    // Match only internationalized pathnames, exclude static/api/feed routes
    matcher: ['/', '/(vi|en)/:path*']
};
