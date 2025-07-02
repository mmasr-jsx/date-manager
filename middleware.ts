import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Exclude /api/auth routes from general API protection
    const isAuthApiRoute = pathname.startsWith('/api/auth');

    // Protect other API routes: If it's an API route (but not /api/auth) AND there's no token (user is not authenticated),
    // return a 401 Unauthorized response instead of redirecting.
    if (
      pathname.startsWith('/api/') &&
      !isAuthApiRoute &&
      !req.nextauth.token
    ) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Role-based access control for UI routes (example for /clientes)
    if (
      (pathname.startsWith('/clientes') &&
        req.nextauth.token?.role !== 'admin') ||
      (pathname.startsWith('/mascotas') &&
        req.nextauth.token?.role !== 'admin') ||
      (pathname.startsWith('/calendar') && req.nextauth.token?.role !== 'admin')
    ) {
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
    // Add more role-based checks as needed for other UI paths here

    return NextResponse.next(); // Allow the request to proceed if no conditions are met for redirection/rewrite
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

// Specifies which paths the middleware should run on
export const config = {
  matcher: [
    // These are the UI routes that NextAuth will automatically redirect to /login if not authenticated.
    '/calendar/:path*',
    '/clientes/:path*',
    '/mascotas/:path*',
    // API routes are handled within the middleware function itself, so they are not in this matcher.
    // Make sure to also exclude static files and the login page from this matcher if they were included before.
  ],
};
