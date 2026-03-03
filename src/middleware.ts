import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // If logged in but on onboarding, allow it
        if (path === "/onboarding") return NextResponse.next();

        // Org checks could go here if session had org info already
        // (session info in middleware is from the token)

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: [
        "/buyer/:path*",
        "/seller/:path*",
        "/onboarding",
        "/api/user/:path*",
    ],
};
