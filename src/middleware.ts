import { NextResponse } from 'next/server';

// const PUBLIC_ROUTES = ['/login', '/lectures', '/homeworks', '/test'];
// const LECTOR_PATHS_PREFIX = ['/lector'];

// const getIsProtectedPath = (path: string) =>
//   !PUBLIC_ROUTES.some(route => path.startsWith(route));

const middleware = () =>
  // const session = await auth.api.getSession({
  //   headers: request.headers
  // });

  // const isLoggedIn = !!session?.user;
  // const isProtected = getIsProtectedPath(request.nextUrl.pathname);

  // if (!isLoggedIn && isProtected) {
  //   const redirectUrl = new URL('/login', request.nextUrl.origin);
  //   redirectUrl.searchParams.append('callbackUrl', request.nextUrl.href);

  //   return NextResponse.redirect(redirectUrl);
  // }

  // const isLector = session?.user?.role === 'lector';

  // if (
  //   !isLector &&
  //   LECTOR_PATHS_PREFIX.some(prefix =>
  //     request.nextUrl.pathname.startsWith(prefix)
  //   )
  // ) {
  //   const redirectUrl = new URL('/lectures', request.nextUrl.origin);

  //   return NextResponse.redirect(redirectUrl);
  // }

  NextResponse.next();

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

export default middleware;
