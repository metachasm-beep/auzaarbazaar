import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
    Package,
    Plus,
    Eye,
    Inbox,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Static placeholder listings for V1
const listings = [
    { id: '1', name: 'HERCULES Vertical Turret Milling Machine', category: 'Milling Machines', price: 450000, status: 'active', views: 342, inquiries: 12, updatedAt: '2 days ago' },
    { id: '2', name: 'SINO SDS-2MS Digital Readout System', category: 'Precision Tools', price: 28000, status: 'active', views: 215, inquiries: 8, updatedAt: '5 days ago' },
    { id: '3', name: 'All Geared Heavy Duty Lathe Machine', category: 'Lathe Machines', price: 320000, status: 'pending', views: 89, inquiries: 2, updatedAt: '1 week ago' },
    { id: '4', name: 'CNC Tool Grinder — Precision Series', category: 'CNC Machines', price: 1250000, status: 'active', views: 189, inquiries: 4, updatedAt: '3 days ago' },
];

const statusConfig = {
    active: { label: 'Active', icon: CheckCircle2, class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    pending: { label: 'Pending Review', icon: Clock, class: 'bg-amber-50 text-amber-700 border-amber-100' },
    paused: { label: 'Paused', icon: AlertCircle, class: 'bg-slate-100 text-slate-600 border-slate-200' },
};

import { authOptions } from "@/lib/auth";

export default async function SellerListingsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/login');

    const orgs = (session.user as any)?.orgs || [];
    const isSeller = orgs.some((o: any) => o.type === 'seller');
    const isSuperAdmin = (session.user as any)?.isSuperAdmin;

    if (!isSeller && !isSuperAdmin) {
        redirect('/onboarding');
    }

    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite">
            <DashboardHeader title="My Listings" />

            <div className="p-6 md:p-8 space-y-6 w-full max-w-[1600px] mx-auto">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-steel-blue">Equipment Listings</h2>
                        <p className="text-sm text-industrial-grey-light mt-1">Manage your inventory and track performance.</p>
                    </div>
                    <Link
                        href="/seller/listings/new"
                        className="flex items-center gap-2 rounded-xl bg-electric-blue px-5 py-3 text-sm font-bold text-white shadow-md shadow-electric-blue/20 hover:bg-electric-blue-hover transition-all"
                    >
                        <Plus size={18} /> Add New Listing
                    </Link>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Listings', value: listings.length.toString(), icon: Package, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
                        { label: 'Active', value: listings.filter(l => l.status === 'active').length.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Total Views', value: listings.reduce((a, l) => a + l.views, 0).toLocaleString(), icon: Eye, color: 'text-steel-blue', bg: 'bg-slate-100' },
                        { label: 'Total Inquiries', value: listings.reduce((a, l) => a + l.inquiries, 0).toString(), icon: Inbox, color: 'text-safety-orange', bg: 'bg-safety-orange/10' },
                    ].map(kpi => (
                        <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
                            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0", kpi.bg)}>
                                <kpi.icon size={20} className={kpi.color} />
                            </div>
                            <div>
                                <div className="text-xl font-extrabold text-steel-blue">{kpi.value}</div>
                                <div className="text-xs font-medium text-industrial-grey-light">{kpi.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Listings Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                        <span className="text-sm font-bold text-steel-blue">All Listings ({listings.length})</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {listings.map(listing => {
                            const status = statusConfig[listing.status as keyof typeof statusConfig];
                            return (
                                <div key={listing.id} className="flex items-center gap-6 px-6 py-5 hover:bg-light-graphite/50 transition-colors group">
                                    {/* Image placeholder */}
                                    <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <Package size={24} className="text-slate-300" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3">
                                            <div>
                                                <p className="text-sm font-bold text-steel-blue line-clamp-1">{listing.name}</p>
                                                <p className="text-xs text-industrial-grey-light mt-0.5">{listing.category} • Updated {listing.updatedAt}</p>
                                            </div>
                                            <span className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border flex-shrink-0", status.class)}>
                                                <status.icon size={12} />
                                                {status.label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="hidden lg:grid grid-cols-3 gap-6 text-center flex-shrink-0">
                                        <div>
                                            <div className="text-lg font-extrabold text-steel-blue">₹{(listing.price / 100000).toFixed(1)}L</div>
                                            <div className="text-xs text-industrial-grey-light">Price</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-extrabold text-steel-blue flex items-center justify-center gap-1">{listing.views} <TrendingUp size={14} className="text-emerald-500" /></div>
                                            <div className="text-xs text-industrial-grey-light">Views</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-extrabold text-steel-blue">{listing.inquiries}</div>
                                            <div className="text-xs text-industrial-grey-light">Inquiries</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/seller/listings/${listing.id}/edit`} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-industrial-grey hover:bg-slate-100 transition-all">
                                            Edit
                                        </Link>
                                        <button className="rounded-lg border border-slate-200 p-2 text-industrial-grey hover:bg-slate-100 transition-all">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
