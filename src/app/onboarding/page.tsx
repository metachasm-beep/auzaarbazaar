import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export default async function OnboardingPage() {
    const session = await getServerSession();

    if (!session?.user?.email) {
        redirect("/login");
    }

    // Check if user already has an org
    // Using cast to any to bypass Prisma type generation delays if email isn't correctly indexed in the client types yet
    const userEmail = session.user.email as string;
    const user = await (prisma.user as any).findUnique({
        where: { email: userEmail },
        include: {
            memberships: {
                include: {
                    org: true,
                },
            },
        },
    });

    if (user?.memberships && user.memberships.length > 0) {
        const orgType = user.memberships[0].org.orgType;
        if (orgType === "seller") {
            redirect("/seller/dashboard");
        } else {
            redirect("/buyer/dashboard");
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-[var(--color-steel-blue)] p-10 text-white text-center">
                    <h1 className="text-3xl font-extrabold mb-2">Welcome to Auzaarbazaar!</h1>
                    <p className="text-blue-100">To get started, tell us how you'll be using the platform.</p>
                </div>

                <div className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form action={async () => {
                            "use server";
                            const session = await getServerSession();
                            if (!session?.user?.email) return;

                            const userRecord = await (prisma.user as any).findUnique({ where: { email: session.user.email } });
                            if (!userRecord) return;

                            await prisma.org.create({
                                data: {
                                    name: `${session.user.name || 'My'} Company`,
                                    orgType: "buyer",
                                    members: {
                                        create: {
                                            userId: userRecord.id,
                                            role: "admin",
                                        }
                                    }
                                }
                            });
                            redirect("/buyer/dashboard");
                        }}>
                            <button type="submit" className="w-full text-left group">
                                <div className="h-full border-2 border-slate-100 rounded-2xl p-6 transition-all group-hover:border-[var(--color-electric-blue)] group-hover:bg-blue-50/50">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-[var(--color-electric-blue)] mb-4 group-hover:scale-110 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">I'm a Buyer</h3>
                                    <p className="text-sm text-slate-500">I want to find, compare and buy industrial machinery and equipment.</p>
                                    <div className="mt-4 flex items-center gap-2 text-[var(--color-electric-blue)] font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                        Get Started <span>→</span>
                                    </div>
                                </div>
                            </button>
                        </form>

                        <form action={async () => {
                            "use server";
                            const session = await getServerSession();
                            if (!session?.user?.email) return;

                            const userRecord = await (prisma.user as any).findUnique({ where: { email: session.user.email } });
                            if (!userRecord) return;

                            await prisma.org.create({
                                data: {
                                    name: `${session.user.name || 'My'} Sales`,
                                    orgType: "seller",
                                    members: {
                                        create: {
                                            userId: userRecord.id,
                                            role: "admin",
                                        }
                                    }
                                }
                            });
                            redirect("/seller/dashboard");
                        }}>
                            <button type="submit" className="w-full text-left group">
                                <div className="h-full border-2 border-slate-100 rounded-2xl p-6 transition-all group-hover:border-[var(--color-safety-orange)] group-hover:bg-orange-50/50">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[var(--color-safety-orange)] mb-4 group-hover:scale-110 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">I'm a Seller</h3>
                                    <p className="text-sm text-slate-500">I want to list my equipment, receive quotes and grow my B2B business.</p>
                                    <div className="mt-4 flex items-center gap-2 text-[var(--color-safety-orange)] font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                        Register Facility <span>→</span>
                                    </div>
                                </div>
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            You'll be able to create additional organization profiles or switch roles later from your settings.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
