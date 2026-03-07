import React from 'react';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { 
    Users, 
    ShoppingBag, 
    ArrowLeftRight, 
    ShieldCheck, 
    BarChart3, 
    Settings,
    LayoutDashboard,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
    const session = await getServerSession();
    
    // Strict super-admin check
    const isSuperAdmin = session?.user?.email === "metachasm@gmail.com";
    
    if (!isSuperAdmin) {
        redirect("/onboarding");
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="text-indigo-600" size={24} />
                    <span className="font-black text-xl tracking-tight text-slate-800">
                        Admin<span className="text-indigo-600 underline decoration-indigo-200">Panel</span>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Session</p>
                        <p className="text-sm font-bold text-slate-700">{session?.user?.email}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200">
                        M
                    </div>
                </div>
            </header>

            <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Systems Overview</h1>
                    <p className="text-slate-500 font-medium">Welcome back, Super Admin. Everything is running smoothly.</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Users', value: '1,429', icon: Users, color: 'blue' },
                        { label: 'Active Listings', value: '2,092', icon: ShoppingBag, color: 'indigo' },
                        { label: 'Platform Revenue', value: '₹4.2M', icon: BarChart3, color: 'emerald' },
                        { label: 'System Health', value: '99.9%', icon: Settings, color: 'amber' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-4`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Mode Switching Section */}
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <ArrowLeftRight size={20} className="text-indigo-500" />
                    Environment Emulation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* Buyer Mode */}
                    <Link href="/buyer/dashboard" className="group">
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-transparent hover:border-blue-500 transition-all shadow-sm hover:shadow-xl relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />
                            <div className="relative">
                                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">User Persona</span>
                                <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Buyer View</h3>
                                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                    Browse the full catalog, manage RFQs, and simulate the purchase experience from the buyer's perspective.
                                </p>
                                <div className="flex items-center gap-3 text-blue-600 font-black">
                                    Enter Dashboard <span className="group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Seller Mode */}
                    <Link href="/seller/dashboard" className="group">
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-transparent hover:border-orange-500 transition-all shadow-sm hover:shadow-xl relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform" />
                            <div className="relative">
                                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">Business Persona</span>
                                <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">Seller View</h3>
                                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                    Manage global inventory, review incoming inquiries, and simulate factory registration flows.
                                </p>
                                <div className="flex items-center gap-3 text-orange-600 font-black">
                                    Enter Dashboard <span className="group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* System Alerts */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400">
                            <AlertCircle size={28} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">New Inventory Update</h4>
                            <p className="text-slate-400 text-sm">A batch of 2,092 machines was recently added and verified by the system.</p>
                        </div>
                    </div>
                    <Link href="/inventory" className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-indigo-400 hover:text-white transition-all shadow-lg">
                        Audit Catalog
                    </Link>
                </div>
            </main>
        </div>
    );
}
