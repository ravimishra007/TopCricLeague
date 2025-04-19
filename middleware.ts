import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // If we're already on the age verification page, don't redirect
  // if (path === '/age-verification') {
  //   return NextResponse.next();
  // }

  // Check if age is verified from cookies
  // const isAgeVerified = request.cookies.get('isAgeVerified')?.value === 'true';

  // If age is not verified and we're not on the age verification page,
  // redirect to age verification
//   if (!isAgeVerified && path !== '/age-verification') {
//     return NextResponse.redirect(new URL('/age-verification', request.url));
//   }

//   return NextResponse.next();
}

// Configure middleware to run on all pages except static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 