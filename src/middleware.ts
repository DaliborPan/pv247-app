import { betterFetch } from '@better-fetch/fetch';
import { type NextRequest, NextResponse } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

const PUBLIC_ROUTES = ['/login', '/lectures', '/homeworks', '/test'];

const getIsProtectedPath = (path: string) =>
  !PUBLIC_ROUTES.some(route => path.startsWith(route));

const middleware = (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request);

  const isLoggedIn = !!sessionCookie;
  const isProtected = getIsProtectedPath(request.nextUrl.pathname);

  if (!isLoggedIn && isProtected) {
    const redirectUrl = new URL('/login', request.nextUrl.origin);
    redirectUrl.searchParams.append('callbackUrl', request.nextUrl.href);

    return NextResponse.redirect(redirectUrl);
  }

  // const isLector = sessionUser?.role === 'lector';

  // if (
  //   !isLector &&
  //   LECTOR_PATHS_PREFIX.some(prefix =>
  //     request.nextUrl.pathname.startsWith(prefix)
  //   )
  // ) {
  //   const redirectUrl = new URL('/lectures', request.nextUrl.origin);

  //   return NextResponse.redirect(redirectUrl);
  // }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

export default middleware;
