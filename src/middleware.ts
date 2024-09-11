import {
  GRAPHIQL_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  RESTFUL_ROUTE,
  ROOT_ROUTE,
} from 'constants/routes';
import { SESSION_COOKIE_NAME } from 'constants/sessionCookie';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [RESTFUL_ROUTE, GRAPHIQL_ROUTE];
const authRoutes = [LOGIN_ROUTE, REGISTRATION_ROUTE];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (session && authRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';

  const handleI18nRouting = createMiddleware({
    locales: ['en', 'ru'],
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-your-custom-locale', defaultLocale);
  return response;
}

export const config = {
  matcher: ['/', '/(ru|en)/:path*'],
};
