import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const tokenCookie = request.cookies.get('auth_token');
    const token = tokenCookie?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secretString = process.env.JWT_SECRET;
        const secretKey = new TextEncoder().encode(secretString);
        await jwtVerify(token, secretKey);
        return NextResponse.next();
    } catch (error) {
        console.error("Auth Middleware tracking intercept:", error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth_token');
        return response;
    }
}
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile-setup/:path*',
        '/api/food/:path*',       // Protects your backend food tracking endpoints
    ],
};