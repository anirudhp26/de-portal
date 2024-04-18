import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const session = req.nextauth.token;
        // if (session?.email !== null && req.nextUrl.pathname.startsWith("/user")) {
        //     return NextResponse.redirect(new URL("/admin/home", req.url));
        // }
        // if (session?. === "student" && req.nextUrl.pathname.startsWith("/admin")) {
        //     return NextResponse.redirect(new URL("/user/home", req.url));
        // }
        return NextResponse.next();
    }
);

export const config = {
    matcher: ['/user/:path*', '/admin/:path*'],
};