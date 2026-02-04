import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    // Update session (token refresh)
    const { response: finalResponse } = await updateSession(request, response);

    return finalResponse;
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(vi|en)/:path*']
};
