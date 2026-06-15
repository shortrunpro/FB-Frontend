import { NextRequest, NextResponse } from 'next/server';

import { PROTECTED_ROUTES } from './lib/constants';
import { isTokenExpired } from './lib/helpers/token';

const makeAuthRedirect = (req: NextRequest, reason: 'sessionRequired' | 'sessionExpired') => {
  const redirectUrl = new URL(`/login`, req.url);

  redirectUrl.searchParams.set(reason, 'true');

  const response = NextResponse.redirect(redirectUrl);

  if (reason === 'sessionExpired') {
    response.cookies.delete('_medusa_jwt');
  }

  return response;
};

export async function middleware(request: NextRequest) {
  // Short-circuit static assets
  if (request.nextUrl.pathname.includes('.')) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const cacheIdCookie = request.cookies.get('_medusa_cache_id');
  const cacheId = cacheIdCookie?.value || crypto.randomUUID();
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const jwtCookie = request.cookies.get('_medusa_jwt');
    const token = jwtCookie?.value;

    // Not logged in before
    if (!jwtCookie) {
      return makeAuthRedirect(request, 'sessionRequired');
    }

    // Token exists but expired
    if (token && isTokenExpired(token)) {
      return makeAuthRedirect(request, 'sessionExpired');
    }
  }

  // Fast path: URL already has a locale segment and cache cookie exists
  if (cacheIdCookie) {
    return NextResponse.next();
  }

  let response = NextResponse.next();

  // Ensure cache id cookie exists (set without redirect)
  if (!cacheIdCookie) {
    response.cookies.set('_medusa_cache_id', cacheId, {
      maxAge: 60 * 60 * 24
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)'
  ]
};
