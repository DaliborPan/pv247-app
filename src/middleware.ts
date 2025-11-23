import { betterFetch } from '@better-fetch/fetch';
import { type NextRequest, NextResponse } from 'next/server';

import { type auth } from './auth';

const PUBLIC_ROUTES = ['/login', '/lectures', '/homeworks', '/test'];
const LECTOR_PATHS_PREFIX = ['/lector'];

const getIsProtectedPath = (path: string) =>
  !PUBLIC_ROUTES.some(route => path.startsWith(route));

const middleware = async (request: NextRequest) => {
  const { data: session } = await betterFetch<typeof auth.$Infer.Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') ?? '' // Forward the cookies from the request
      }
    }
  );

  const isLoggedIn = !!session?.user;
  const isProtected = getIsProtectedPath(request.nextUrl.pathname);

  if (!isLoggedIn && isProtected) {
    const redirectUrl = new URL('/login', request.nextUrl.origin);
    redirectUrl.searchParams.append('callbackUrl', request.nextUrl.href);

    return NextResponse.redirect(redirectUrl);
  }

  const isLector = session?.user?.role === 'lector';

  if (
    !isLector &&
    LECTOR_PATHS_PREFIX.some(prefix =>
      request.nextUrl.pathname.startsWith(prefix)
    )
  ) {
    const redirectUrl = new URL('/lectures', request.nextUrl.origin);

    return NextResponse.redirect(redirectUrl);
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

export default middleware;
