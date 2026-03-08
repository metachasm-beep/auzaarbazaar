import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    debug: true,
    callbacks: {
        async signIn({ user, account, profile }: any) {
            console.log("NextAuth: signIn callback for", user?.email);
            if (!user?.email) return false;

            try {
                // Check if User table exists first by doing a simple count or similar
                // If the table doesn't exist, this will throw
                await (prisma.user as any).upsert({
                    where: { email: user.email },
                    update: { fullName: user.name },
                    create: {
                        email: user.email,
                        fullName: user.name,
                    },
                });
                return true;
            } catch (error: any) {
                console.error("NextAuth: signIn DB sync failure:", error.message);
                // We return true even if DB sync fails so the user can at least be "logged in" 
                // and we can show them a friendly error on the landing page/onboarding instead of a loop.
                return true; 
            }
        },
        async jwt({ token, user, trigger }: any) {
            if (user && user.email) {
                token.email = user.email;
            }

            if (token.email) {
                token.isSuperAdmin = token.email === "metachasm@gmail.com";
                try {
                    // Optimized fetching: only if the table exists
                    const dbUser = await (prisma.user as any).findUnique({
                        where: { email: token.email },
                        include: {
                            memberships: {
                                include: { org: true }
                            }
                        }
                    });

                    if (dbUser) {
                        token.id = dbUser.id;
                        token.orgs = dbUser.memberships.map((m: any) => ({
                            id: m.org.id,
                            name: m.org.name,
                            role: m.role,
                            type: m.org.orgType
                        }));
                    }
                } catch (e: any) {
                    console.error("NextAuth: JWT Session sync missing database tables:", e.message);
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).orgs = token.orgs || [];
                (session.user as any).isSuperAdmin = token.isSuperAdmin;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Force onboarding for all logins to ensure they have a profile/org
            if (url.includes("/login") || url === baseUrl + "/" || url === baseUrl) {
                return `${baseUrl}/onboarding`;
            }

            // Allow internal redirects
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            
            return `${baseUrl}/onboarding`;
        },
    },
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === 'production' ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
};
