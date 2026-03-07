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
                // Upsert user in database to ensure they exist before JWT callback runs
                await (prisma.user as any).upsert({
                    where: { email: user.email },
                    update: { fullName: user.name },
                    create: {
                        email: user.email,
                        fullName: user.name,
                    },
                });
                return true;
            } catch (error) {
                console.error("NextAuth: signIn DB error:", error);
                return true; 
            }
        },
        async jwt({ token, user, trigger }: any) {
            // First time sign in
            if (user && user.email) {
                token.email = user.email;
            }

            // Always try to refresh data from DB to keep session sync
            if (token.email) {
                token.isSuperAdmin = token.email === "metachasm@gmail.com";
                try {
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
                } catch (e) {
                    console.error("NextAuth: JWT DB Fetch Error:", e);
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.orgs = token.orgs || [];
                session.user.isSuperAdmin = token.isSuperAdmin;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Priority 1: If it's a relative URL, prepend baseUrl
            if (url.startsWith("/")) {
                if (url === "/") return `${baseUrl}/onboarding`;
                return `${baseUrl}${url}`;
            }
            
            // Priority 2: Logic for login redirects
            if (url.includes("/login") || url === baseUrl) {
                return `${baseUrl}/onboarding`;
            }
            
            // Priority 3: Default behavior
            if (url.startsWith(baseUrl)) return url;
            
            return `${baseUrl}/onboarding`;
        },
    },
    // Adding cookies configuration to be more explicit for production
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
