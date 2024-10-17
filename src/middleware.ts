import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/auth/stateless-session";



// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async (req: NextRequest) => {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId)
        return NextResponse.redirect(new URL('/login', req.nextUrl))

    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    )
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));

    return NextResponse.next();
};