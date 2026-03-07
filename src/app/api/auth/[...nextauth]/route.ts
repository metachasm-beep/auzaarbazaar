import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!user.email) return false;

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
                return true;
            } catch (error) {
                console.error("Error during sign in:", error);
                return true; // Still allow sign in even if DB sync fails
            }
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.id = user.id;
            }
            if (token.email) {
                token.isSuperAdmin = token.email === "metachasm@gmail.com";
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
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).orgs = token.orgs || [];
                (session.user as any).isSuperAdmin = token.isSuperAdmin;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // After successful sign in, go to onboarding to check status
            if (url === baseUrl || url.includes("/login")) {
                return `${baseUrl}/onboarding`;
            }
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            return url;
        },
    },
});

export { handler as GET, handler as POST };
