import { auth } from "@/src/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;
    const isDev = process.env.NODE_ENV === "development";

    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
    const isLoginPage = ["/sign-in", "/sign-up"].includes(pathname);

    // if (isDev) {
    //     return NextResponse.next();
    // }

    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}