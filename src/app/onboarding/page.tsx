import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OnboardingPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        console.log("Onboarding: No session found, redirecting to login...");
        redirect("/login");
    }

    // DIRECT REDIRECT FOR SUPER ADMIN
    if (session.user.email === "metachasm@gmail.com") {
        console.log("Onboarding: Super Admin detected, redirecting to /admin/dashboard");
        redirect("/admin/dashboard");
    }

    // Check if user already has an org
    const userEmail = session.user.email as string;
    let user = null;
    let dbError = null;

    try {
        user = await (prisma.user as any).findUnique({
            where: { email: userEmail },
            include: {
                memberships: {
                    include: {
                        org: true,
                    },
                },
            },
        });
        console.log("Onboarding: DB lookup success for", userEmail);
    } catch (e: any) {
        console.error("Onboarding: DB Error:", e);
        dbError = e.message || "Database connection failure";
    }

    // Redirect registered users to their respective dashboards
    if (user?.memberships && user.memberships.length > 0) {
        const primaryMembership = user.memberships[0];
        const orgType = primaryMembership.org.orgType;
        
        console.log("Onboarding: Redirecting registered user to:", orgType);
        
        if (orgType === "seller" || orgType === "both") {
            redirect("/seller/dashboard");
        } else if (orgType === "buyer") {
            redirect("/buyer/dashboard");
        }
    }

    if (dbError) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center border-t-8 border-rose-500">
                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Service Momentarily Offline</h1>
                    <p className="text-slate-500 mb-6">We're updating our systems. Please wait 10 seconds and refresh.</p>
                    <div className="bg-slate-50 rounded-xl p-4 text-left mb-8 overflow-x-auto text-xs font-mono text-rose-600">
                        Diagnostics: {dbError}
                    </div>
                    <a href="/onboarding" className="inline-block w-full bg-slate-900 py-3 rounded-xl font-bold text-white hover:bg-slate-800 transition-colors">
                        Refresh Connection
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full -mr-64 -mt-64 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full -ml-64 -mb-64 blur-3xl opacity-50" />

            <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-slate-100 relative z-10 flex flex-col md:flex-row">
                
                {/* Left Panel: Branding */}
                <div className="md:w-5/12 bg-slate-900 p-12 text-white flex flex-col justify-between">
                    <div>
                        <div className="mb-12">
                            <span className="text-2xl font-black tracking-tighter">Auzaar<span className="text-indigo-400">Bazaar</span></span>
                        </div>
                        <h1 className="text-4xl font-black mb-6 leading-tight">One Identity. <br/>Unlimited Potential.</h1>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed">
                            Join the digital evolution of India's manufacturing backbone. Register your persona to begin.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">✓</div>
                            <span className="text-sm font-bold text-slate-300">Verified Seller Status</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">✓</div>
                            <span className="text-sm font-bold text-slate-300">Smart RFQ Matching</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Options */}
                <div className="md:w-7/12 p-12 bg-white">
                    <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em] mb-2 text-center md:text-left">Getting Started</h2>
                    <h3 className="text-3xl font-black text-slate-800 mb-8 text-center md:text-left">Choose your profile.</h3>

                    <div className="space-y-4">
                        {/* Option 1: Buyer */}
                        <form action={async () => {
                            "use server";
                            const session = await getServerSession(authOptions);
                            if (!session?.user?.email) return;
                            const userRecord = await (prisma.user as any).findUnique({ where: { email: session.user.email } });
                            if (!userRecord) return;
                            await prisma.org.create({
                                data: {
                                    name: `${session.user.name || 'My'} Procurement`,
                                    orgType: "buyer",
                                    members: { create: { userId: userRecord.id, role: "admin" } }
                                }
                            });
                            redirect("/buyer/dashboard");
                        }}>
                            <button type="submit" className="w-full group">
                                <div className="p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-slate-50 transition-all flex items-center gap-4 text-left">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800">I'm a Buyer</h4>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Procure Machinery</p>
                                    </div>
                                </div>
                            </button>
                        </form>

                        {/* Option 2: Seller */}
                        <form action={async () => {
                            "use server";
                            const session = await getServerSession(authOptions);
                            if (!session?.user?.email) return;
                            const userRecord = await (prisma.user as any).findUnique({ where: { email: session.user.email } });
                            if (!userRecord) return;
                            await prisma.org.create({
                                data: {
                                    name: `${session.user.name || 'My'} Sales`,
                                    orgType: "seller",
                                    members: { create: { userId: userRecord.id, role: "admin" } }
                                }
                            });
                            redirect("/seller/dashboard");
                        }}>
                            <button type="submit" className="w-full group">
                                <div className="p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-slate-50 transition-all flex items-center gap-4 text-left">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800">I'm a Seller</h4>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">List & Sell Equipment</p>
                                    </div>
                                </div>
                            </button>
                        </form>

                        {/* Option 3: Both (NEW) */}
                        <form action={async () => {
                            "use server";
                            const session = await getServerSession(authOptions);
                            if (!session?.user?.email) return;
                            const userRecord = await (prisma.user as any).findUnique({ where: { email: session.user.email } });
                            if (!userRecord) return;
                            await prisma.org.create({
                                data: {
                                    name: `${session.user.name || 'My'} Industrial Hub`,
                                    orgType: "both",
                                    members: { create: { userId: userRecord.id, role: "admin" } }
                                }
                            });
                            redirect("/seller/dashboard");
                        }}>
                            <button type="submit" className="w-full group">
                                <div className="p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-600 transition-all flex items-center gap-4 text-left bg-slate-50 group-hover:bg-indigo-600 group-hover:shadow-lg group-hover:shadow-indigo-200">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-indigo-600 group-hover:bg-indigo-400 group-hover:text-white transition-all shadow-sm">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 group-hover:text-white transition-colors">I'm Both</h4>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-200 transition-colors">Full Ecosystem Access</p>
                                    </div>
                                </div>
                            </button>
                        </form>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100">
                        <p className="text-xs text-slate-400 font-bold leading-relaxed text-center">
                            By continuing, you agree to AuzaarBazaar's core operation policies and industrial data standards.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
