import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const isProtectedPath = protectedPaths.some((path) =>
        req.nextUrl.pathname.startsWith(path)
    );
    if (isProtectedPath && !token) {
        const loginUrl = new URL('/signin', req.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
      '/((?!api|signin|signup|forgot-password|resend-activation|email-verify|new-password|images|_next/static|_next/image|favicon.ico|favicon.svg|sitemap.xml|robots.txt).*)',
    ],
  }
