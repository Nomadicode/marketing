import { NextRequest, NextResponse } from 'next/server';

const supportedLocales = ['en', 'es'];
const publicPages = new Set(['', 'services', 'contact']);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];

  // `/en` is the internal target of the clean default-locale rewrite.
  if (first === 'en') return NextResponse.next();

  if (
    first &&
    /^[a-z]{2}(?:-[a-z]{2})?$/i.test(first) &&
    !supportedLocales.includes(first)
  ) {
    return NextResponse.redirect(new URL('/', request.url), 307);
  }

  if (first === 'es') return NextResponse.next();

  const page = parts.join('/');
  if (publicPages.has(page)) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|nomadicode-logo).*)',
  ],
};
