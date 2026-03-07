import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
    Zap,
    Clock,
    CheckCircle2,
    MessageSquare,
    ChevronRight,
    Package,
    MapPin,
    DollarSign,
    TrendingUp,
    AlertCircle,
    Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const rfqs = [
    {
        id: 'RFQ001',
        machine: 'CNC Lathe Machine 200mm',
        category: 'CNC Machines',
        budget: '₹5–20 Lakhs',
        location: 'Delhi NCR',
        submittedAt: '2 hours ago',
        status: 'pending',
        quotesReceived: 0,
    },
    {
        id: 'RFQ002',
        machine: 'Hydraulic Press 20 Ton',
        category: 'Hydraulic Equipment',
        budget: '₹1–5 Lakhs',
        location: 'Faridabad, Haryana',
        submittedAt: 'Yesterday, 11:00 AM',
        status: 'quotes_received',
        quotesReceived: 3,
    },
    {
        id: 'RFQ003',
        machine: 'Universal Milling Machine',
        category: 'Milling Machines',
        budget: '₹20–50 Lakhs',
        location: 'Pune, Maharashtra',
        submittedAt: '5 days ago',
        status: 'closed',
        quotesReceived: 5,
    },
];

const statusMap = {
    pending: { label: 'Awaiting Quotes', icon: Clock, class: 'bg-amber-50 text-amber-700 border-amber-100' },
    quotes_received: { label: 'Quotes Received', icon: TrendingUp, class: 'bg-electric-blue/10 text-electric-blue border-electric-blue/20' },
    closed: { label: 'Closed', icon: CheckCircle2, class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
};

export default async function BuyerRFQsPage() {
    const session = await getServerSession();
    if (!session) redirect('/login');

    const orgs = (session.user as any)?.orgs || [];
    const isBuyer = orgs.some((o: any) => o.type === 'buyer');
    if (!isBuyer) redirect('/onboarding');

    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite">
            <DashboardHeader title="My RFQs" />

            <div className="p-6 md:p-8 space-y-6 w-full max-w-[1600px] mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-steel-blue">Request for Quotations</h2>
                        <p className="text-sm text-industrial-grey-light mt-1">Track all your active and past RFQs.</p>
                    </div>
                    <Link
                        href="/rfq"
                        className="flex items-center gap-2 rounded-xl bg-safety-orange px-5 py-3 text-sm font-bold text-white shadow-md shadow-safety-orange/20 hover:bg-safety-orange-hover transition-all"
                    >
                        <Plus size={18} /> New RFQ
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total RFQs', value: rfqs.length, icon: Zap, color: 'text-safety-orange', bg: 'bg-safety-orange/10' },
                        { label: 'Awaiting Quotes', value: rfqs.filter(r => r.status === 'pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Quotes Received', value: rfqs.reduce((a, r) => a + r.quotesReceived, 0), icon: MessageSquare, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
                    ].map(s => (
                        <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
                            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0", s.bg)}>
                                <s.icon size={20} className={s.color} />
                            </div>
                            <div>
                                <div className="text-xl font-extrabold text-steel-blue">{s.value}</div>
                                <div className="text-xs text-industrial-grey-light">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RFQ List */}
                <div className="space-y-4">
                    {rfqs.map(rfq => {
                        const statusCfg = statusMap[rfq.status as keyof typeof statusMap];
                        return (
                            <div key={rfq.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between flex-wrap gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-safety-orange/10 flex items-center justify-center flex-shrink-0">
                                            <Zap size={22} className="text-safety-orange" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-base font-bold text-steel-blue">{rfq.machine}</h3>
                                                <span className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border", statusCfg.class)}>
                                                    <statusCfg.icon size={12} />
                                                    {statusCfg.label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-industrial-grey-light mt-0.5">{rfq.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-industrial-grey-light">{rfq.id}</p>
                                        <p className="text-xs text-industrial-grey-light mt-0.5">{rfq.submittedAt}</p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                                    <div className="flex items-center gap-1.5 text-industrial-grey-light">
                                        <DollarSign size={14} />
                                        <span>Budget: <span className="font-bold text-steel-blue">{rfq.budget}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-industrial-grey-light">
                                        <MapPin size={14} />
                                        <span>{rfq.location}</span>
                                    </div>
                                    {rfq.quotesReceived > 0 && (
                                        <div className="flex items-center gap-1.5 text-electric-blue">
                                            <MessageSquare size={14} />
                                            <span className="font-bold">{rfq.quotesReceived} quotes received</span>
                                        </div>
                                    )}
                                </div>

                                {rfq.quotesReceived > 0 && (
                                    <div className="mt-5 flex gap-3">
                                        <button className="flex items-center gap-2 rounded-xl bg-electric-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-electric-blue-hover transition-all shadow-sm">
                                            <MessageSquare size={16} />
                                            View {rfq.quotesReceived} Quote{rfq.quotesReceived > 1 ? 's' : ''}
                                        </button>
                                        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-industrial-grey hover:bg-slate-50 transition-all">
                                            Compare Quotes
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Empty CTA */}
                <div className="text-center py-4">
                    <p className="text-sm text-industrial-grey-light">
                        Need something specific?{' '}
                        <Link href="/rfq" className="text-electric-blue font-bold hover:underline">
                            Post a new RFQ →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
