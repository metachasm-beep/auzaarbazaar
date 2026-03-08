import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
    Users, 
    ShoppingBag, 
    ArrowLeftRight, 
    ShieldCheck, 
    BarChart3, 
    Settings,
    AlertCircle,
    Database,
    Globe,
    FileText,
    LayoutDashboard,
    Activity,
    Plus,
    Search
} from 'lucide-react';
import Link from 'next/link';
import { prisma } from "@/lib/prisma";
import inventoryData from "@/data/inventory.json";
import AdminControls from '@/components/admin/AdminControls';

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);
    
    // Strict super-admin check
    const isSuperAdmin = session?.user?.email === "metachasm@gmail.com";
    if (!isSuperAdmin) redirect("/onboarding");

    // FETCH REAL DATA
    let userCount = 0;
    let orgCount = 0;
    let buyerCount = 0;
    let sellerCount = 0;
    
    try {
        userCount = await (prisma.user as any).count();
        const orgs = await (prisma.org as any).findMany({
            select: { orgType: true }
        });
        orgCount = orgs.length;
        buyerCount = orgs.filter((o: any) => o.orgType === 'buyer' || o.orgType === 'both').length;
        sellerCount = orgs.filter((o: any) => o.orgType === 'seller' || o.orgType === 'both').length;
    } catch (e) {
        console.error("Admin Dashboard: Failed to fetch DB stats", e);
    }

    const totalListings = inventoryData.inventory.length;
    const categories = Array.from(new Set(inventoryData.inventory.map(i => i.category))).length;

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30">
            {/* Glassmorphic Side Navigation */}
            <div className="flex flex-1">
                <aside className="w-72 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col hidden lg:flex">
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <ShieldCheck className="text-white" size={24} />
                            </div>
                            <span className="font-black text-xl tracking-tight text-white">
                                Auzaar<span className="text-indigo-500">Admin</span>
                            </span>
                        </div>

                        <nav className="space-y-1">
                            {[
                                { name: 'Overview', icon: LayoutDashboard, active: true },
                                { name: 'User Management', icon: Users },
                                { name: 'Product Catalog', icon: ShoppingBag },
                                { name: 'RFQ Analytics', icon: BarChart3 },
                                { name: 'System Logs', icon: Activity },
                                { name: 'Global Settings', icon: Settings },
                            ].map((item) => (
                                <button key={item.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${item.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                                    <item.icon size={18} />
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto p-8 border-t border-slate-800/50">
                        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Server Status</p>
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Operational
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                    {/* Top Header */}
                    <header className="h-20 border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
                        <div className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-xl w-96">
                            <Search size={18} className="text-slate-500" />
                            <input type="text" placeholder="Search users, RFQs, listings..." className="bg-transparent border-none text-sm font-medium focus:ring-0 text-slate-200 placeholder:text-slate-500 w-full" />
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                                <Plus size={18} />
                                New Announcement
                            </button>
                            <div className="h-10 w-px bg-slate-800" />
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-300">Super Admin</span>
                                <div className="w-10 h-10 rounded-full border-2 border-indigo-500/50 p-0.5">
                                    <div className="w-full h-full rounded-full bg-indigo-600 flex items-center justify-center font-black text-white text-xs">M</div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="p-8 lg:p-12 space-y-10">
                        <div className="flex items-end justify-between">
                            <div>
                                <h1 className="text-4xl font-black text-white mb-2">Real-time Pulse</h1>
                                <p className="text-slate-400 font-medium">Aggregated data across the AuzaarBazaar ecosystem.</p>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                                <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold shadow-sm">24H</button>
                                <button className="px-4 py-2 text-slate-500 hover:text-slate-300 text-xs font-bold">7D</button>
                                <button className="px-4 py-2 text-slate-500 hover:text-slate-300 text-xs font-bold">30D</button>
                            </div>
                        </div>

                        {/* Core Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Registered Users', value: userCount, icon: Users, color: 'blue' },
                                { label: 'Total Inventory', value: totalListings, icon: Database, color: 'indigo' },
                                { label: 'Buyer Profiles', value: buyerCount, icon: ShoppingBag, color: 'emerald' },
                                { label: 'Active Sellers', value: sellerCount, icon: Globe, color: 'amber' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group hover:border-indigo-500/50 transition-all text-slate-200">
                                    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${stat.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform`} />
                                    <stat.icon size={28} className={`mb-4 ${
                                        stat.color === 'blue' ? 'text-blue-500' :
                                        stat.color === 'indigo' ? 'text-indigo-500' :
                                        stat.color === 'emerald' ? 'text-emerald-500' :
                                        'text-amber-500'
                                    }`} />
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                    <p className="text-4xl font-black text-white">{stat.value.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        {/* ADMIN CONTROLS SECTION (NEW) */}
                        <AdminControls />

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-slate-200">
                            {/* Persona Access Panel */}
                            <div className="xl:col-span-2 space-y-8">
                                <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h2 className="text-2xl font-black text-white mb-6">Persona Access Controls</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Link href="/buyer/dashboard" className="group p-6 rounded-3xl border border-slate-800 bg-[#0F172A] hover:bg-indigo-600 transition-all shadow-xl text-slate-200">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                                                    <ShoppingBag size={24} />
                                                </div>
                                                <h3 className="text-xl font-black text-white mb-2">Buyer Simulation</h3>
                                                <p className="text-sm text-slate-400 group-hover:text-indigo-100 mb-4">View catalog, manage RFQs, and track saved equipment.</p>
                                                <div className="font-bold text-sm text-indigo-400 group-hover:text-white flex items-center gap-2">
                                                    Open Dashboard <span>→</span>
                                                </div>
                                            </Link>

                                            <Link href="/seller/dashboard" className="group p-6 rounded-3xl border border-slate-800 bg-[#0F172A] hover:bg-orange-600 transition-all shadow-xl text-slate-200">
                                                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-orange-600 transition-colors">
                                                    <Globe size={24} />
                                                </div>
                                                <h3 className="text-xl font-black text-white mb-2">Seller Operation</h3>
                                                <p className="text-sm text-slate-400 group-hover:text-orange-100 mb-4">Control inventory, response systems, and factory listings.</p>
                                                <div className="font-bold text-sm text-orange-400 group-hover:text-white flex items-center gap-2">
                                                    Open Dashboard <span>→</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Catalog Audit Card */}
                                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10">
                                    <div className="flex-1">
                                        <div className="bg-white/10 w-max px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-4">Inventory Integrity</div>
                                        <h3 className="text-3xl font-black text-white mb-4">Catalog Audit Required</h3>
                                        <p className="text-indigo-100 font-medium leading-relaxed">
                                            The recent import added {totalListings.toLocaleString()} items across {categories} industrial categories. Review price points and model data accuracy.
                                        </p>
                                    </div>
                                    <Link href="/inventory" className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-2xl shadow-indigo-900/40 whitespace-nowrap">
                                        Full Catalog Audit
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar: System Info */}
                            <div className="xl:col-span-1 space-y-6">
                                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                                    <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                                        <Activity size={20} className="text-emerald-500" />
                                        Platform Health
                                    </h3>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Database Sync', value: 100, color: 'emerald' },
                                            { label: 'Auth Subsystem', value: 100, color: 'emerald' },
                                            { label: 'Inventory Engine', value: 94, color: 'indigo' },
                                            { label: 'RFQ Broadcaster', value: 88, color: 'amber' },
                                        ].map((sys) => (
                                            <div key={sys.label}>
                                                <div className="flex justify-between text-xs font-bold mb-2">
                                                    <span className="text-slate-400 uppercase tracking-widest">{sys.label}</span>
                                                    <span className={`text-${sys.color}-400`}>{sys.value}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-${sys.color}-500 rounded-full`} style={{ width: `${sys.value}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-3xl">
                                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                                        <FileText size={20} />
                                        <h4 className="font-black text-sm uppercase tracking-widest">Document Registry</h4>
                                    </div>
                                    <p className="text-xs font-medium text-slate-400 leading-relaxed mb-6">
                                        All KYC, ISO, and GST certificates are stored securely in Supabase Storage with AES-256 encryption.
                                    </p>
                                    <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all">
                                        Manage Documents
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
