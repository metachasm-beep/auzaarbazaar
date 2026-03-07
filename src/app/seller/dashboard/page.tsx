import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import {
    Package,
    Inbox,
    Zap,
    TrendingUp,
    Eye,
    ShieldCheck,
    CheckCircle2,
    Clock,
    Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const kpis = [
    { name: 'Total Listings', value: '42', change: '+3', trend: 'up', icon: Package },
    { name: 'Active Inquiries', value: '18', change: '+5', trend: 'up', icon: Inbox },
    { name: 'RFQ Invites', value: '7', change: '-1', trend: 'down', icon: Zap },
    { name: 'Profile Views', value: '1,204', change: '+12%', trend: 'up', icon: Eye },
];

const topPerformers = [
    { id: 1, name: 'CNC Lathe Machine V-200', views: 342, inquiries: 12, status: 'Active', image: '/assets/products/cnc_lathe.png' },
    { id: 2, name: 'Hydraulic Press 50 Ton', views: 215, inquiries: 8, status: 'Active', image: '/assets/products/hydraulic.jpg' },
    { id: 3, name: 'Vertical Milling Center', views: 189, inquiries: 4, status: 'Active', image: '/assets/products/milling.jpg' },
];

export default async function SellerDashboardPage() {
    const session = await getServerSession();
    if (!session) redirect("/login");

    const orgs = (session.user as any).orgs || [];
    const isSeller = orgs.some((o: any) => o.type === 'seller');
    const isSuperAdmin = (session.user as any).isSuperAdmin;

    if (!isSeller && !isSuperAdmin) {
        if (orgs.length > 0) redirect("/buyer/dashboard");
        redirect("/onboarding");
    }

    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite">
            <DashboardHeader title={`Seller Overview: ${session.user?.name || ''}`} />

            <div className="p-6 md:p-8 space-y-8 w-full max-w-[1600px] mx-auto">
                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi) => (
                        <div key={kpi.name} className="flex flex-col rounded-xl border border-industrial-grey-light/20 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-semibold text-industrial-grey">{kpi.name}</span>
                                <div className="rounded-md bg-electric-blue/10 p-2 text-electric-blue">
                                    <kpi.icon size={18} />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-extrabold text-steel-blue">{kpi.value}</span>
                                <div className={cn(
                                    "flex items-center gap-1 text-sm font-bold",
                                    kpi.trend === 'up' ? "text-emerald-500" : "text-rose-500"
                                )}>
                                    {kpi.trend === 'up' ? '▲' : '▼'} {kpi.change}
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-industrial-grey-light">vs last 30 days</div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area (Chart + Profile Strength) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Left Col (Chart Placeholder + Top Listings) */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Performance Chart Placeholder */}
                        <div className="rounded-xl border border-industrial-grey-light/20 bg-white shadow-sm p-6">
                            <h3 className="text-base font-bold text-steel-blue mb-4">Inquiries Overview (30 Days)</h3>
                            <div className="h-64 w-full rounded-industrial bg-light-graphite border border-dashed border-industrial-grey-light/30 flex items-center justify-center">
                                <div className="text-center">
                                    <TrendingUp size={32} className="mx-auto text-industrial-grey-light mb-2 opacity-50" />
                                    <span className="text-sm font-semibold text-industrial-grey">Sales Performance Chart</span>
                                    <p className="text-xs text-industrial-grey-light mt-1">Integrate Recharts / Chart.js here</p>
                                </div>
                            </div>
                        </div>

                        {/* Top Listings */}
                        <div className="rounded-xl border border-industrial-grey-light/20 bg-white shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-industrial-grey-light/10 flex justify-between items-center">
                                <h3 className="text-base font-bold text-steel-blue">Top Performing Machines</h3>
                                <button className="text-sm font-semibold text-electric-blue hover:text-electric-blue-hover transition-colors">View All</button>
                            </div>
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-light-graphite/50 text-xs uppercase font-bold text-industrial-grey-light">
                                        <tr>
                                            <th className="px-6 py-4 rounded-tl-lg">Machine</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Views</th>
                                            <th className="px-6 py-4">Inquiries</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-industrial-grey-light/10">
                                        {topPerformers.map((item) => (
                                            <tr key={item.id} className="hover:bg-light-graphite/50 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-steel-blue flex items-center gap-3">
                                                    <div className="h-10 w-10 shrink-0 relative bg-slate-200 rounded-md overflow-hidden">
                                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">IMG</div>
                                                    </div>
                                                    <span className="truncate max-w-[200px] sm:max-w-none">{item.name}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-industrial-grey">{item.views}</td>
                                                <td className="px-6 py-4 font-bold text-electric-blue">{item.inquiries}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Col (Profile Strength Meter) */}
                    <div className="xl:col-span-1">
                        <div className="rounded-xl border border-industrial-grey-light/20 bg-white p-6 shadow-sm sticky top-[104px]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="rounded-full bg-safety-orange/10 p-2 text-safety-orange">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-lg font-extrabold text-steel-blue">Profile Trust Score</h3>
                            </div>

                            {/* Score Ring / Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-bold text-industrial-grey">Excellent</span>
                                    <span className="text-2xl font-extrabold text-steel-blue">85%</span>
                                </div>
                                <div className="h-3 w-full rounded-full bg-light-graphite overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-xs text-industrial-grey-light mt-2">Buyers are 4x more likely to inquire with verified profiles.</p>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-4 pt-4 border-t border-industrial-grey-light/10">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-steel-blue">GST Verified</p>
                                        <p className="text-xs text-industrial-grey-light">Completed on Feb 12</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-steel-blue">Business Documents</p>
                                        <p className="text-xs text-industrial-grey-light">ISO & Incorporations synced</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 opacity-60">
                                    <Camera size={18} className="text-industrial-grey shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-steel-blue">Factory Photos / Videos</p>
                                        <div className="mt-2 w-full rounded bg-electric-blue py-1.5 text-center text-xs font-bold tracking-widest text-white hover:bg-electric-blue-hover transition-colors cursor-pointer">
                                            UPLOAD MEDIA
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-steel-blue">Fast Response Time</p>
                                        <p className="text-xs text-industrial-grey-light">Avg. response is &lt; 2 hours</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
