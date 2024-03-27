import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")
  const pathname = req.nextUrl.pathname
  
  if (!token && isPageRequiringAuth(pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  if (token && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

function isPageRequiringAuth(pathname: string): boolean {
  const pagesRequiringAuth = ['/'];
  return pagesRequiringAuth.includes(pathname);
}

export const config = {
  matcher: ['/', '/sign-up', '/sign-in'],
};
