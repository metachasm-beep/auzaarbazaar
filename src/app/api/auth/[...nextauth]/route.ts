import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    debug: true,
    trustHost: true,
    callbacks: {
        async signIn({ user, account, profile }: any) {
            console.log("NextAuth: Attempting signIn for", user?.email);
            if (!user?.email) {
                console.error("NextAuth: No email provided by Google");
                return false;
            }

            try {
                // Upsert user in database
                await (prisma.user as any).upsert({
                    where: { email: user.email },
                    update: {
                        fullName: user.name,
                    },
                    create: {
                        email: user.email,
                        fullName: user.name,
                    },
                });
                console.log("NextAuth: DB Migration/Sync success for", user.email);
                return true;
            } catch (error) {
                console.error("NextAuth: Database sync error during sign-in:", error);
                // Allow sign in even if DB sync fails, so user isn't blocked 
                // but we should investigate why the DB fails
                return true; 
            }
        },
        async jwt({ token, user, account }: any) {
            if (user) {
                token.id = user.id;
            }
            if (token.email) {
                token.isSuperAdmin = token.email === "metachasm@gmail.com";
                try {
                    const dbUser = await (prisma.user as any).findUnique({
                        where: { email: token.email },
                        include: {
                            memberships: {
                                include: {
                                    org: true
                                }
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
                    console.error("NextAuth: JWT Lookup Error:", e);
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
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            console.log("NextAuth: Redirect step. Target:", url, "Base:", baseUrl);
            
            // SPECIAL CASE: Check for super admin redirect before anything else
            // Note: We can't check session here easily without extra calls,
            // but the /onboarding page will handle the server-side redirect for us reliably.
            
            // If the URL is already absolute and starts with baseUrl, use it
            if (url.startsWith(baseUrl)) {
                // Avoid infinite redirect if target is login
                if (url.includes("/login")) return `${baseUrl}/onboarding`;
                return url;
            }
            
            // Default to onboarding
            if (url === baseUrl || url.includes("/login") || url === "/") {
                return `${baseUrl}/onboarding`;
            }
            
            // Relative paths
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
