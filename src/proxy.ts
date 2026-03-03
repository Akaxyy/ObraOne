import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
    // const { pathname } = request.nextUrl;

    // const session = await auth.api.getSession({
    //     headers: await headers()
    // });

    // const isDashboardRoute = pathname.startsWith("/dashboard");
    // const isAuthRoute = pathname === "/sign-in"

    // const isDev = process.env.NODE_ENV === "development";

    // if (isDev) {
    //     return NextResponse.next();
    // }

    // if (isDashboardRoute && !session) {
    //     return NextResponse.redirect(new URL("/sign-in", request.url));
    // }

    // if (isAuthRoute && session) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/sign-in"],
};
