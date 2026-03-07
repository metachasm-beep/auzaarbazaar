import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import {
    Inbox,
    Clock,
    CheckCircle2,
    Zap,
    MessageSquare,
    ChevronRight,
    Package,
    MapPin,
    DollarSign,
    AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const inquiries = [
    {
        id: '1',
        buyer: 'Raj Industries',
        machine: 'HERCULES Vertical Turret Milling Machine',
        message: 'Interested in your milling machine. Can you share the warranty details and lead time?',
        budget: '₹4–5 Lakhs',
        location: 'Faridabad, Haryana',
        receivedAt: '2 hours ago',
        status: 'new',
    },
    {
        id: '2',
        buyer: 'Shiv Precision Works',
        machine: 'CNC Tool Grinder — Precision Series',
        message: 'We need 2 units. Please send quotation for bulk order.',
        budget: '₹20–50 Lakhs',
        location: 'Pune, Maharashtra',
        receivedAt: 'Yesterday, 4:30 PM',
        status: 'responded',
    },
    {
        id: '3',
        buyer: 'Parikh Metalworks',
        machine: 'All Geared Heavy Duty Lathe Machine',
        message: 'We are looking for a refurbished lathe. Do you have any in stock?',
        budget: '₹1–3 Lakhs',
        location: 'Ahmedabad, Gujarat',
        receivedAt: '3 days ago',
        status: 'closed',
    },
];

const statusMap = {
    new: { label: 'New', icon: AlertCircle, class: 'bg-safety-orange/10 text-safety-orange border-safety-orange/20' },
    responded: { label: 'Responded', icon: CheckCircle2, class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    closed: { label: 'Closed', icon: Clock, class: 'bg-slate-100 text-slate-500 border-slate-200' },
};

export default async function SellerInquiriesPage() {
    const session = await getServerSession();
    if (!session) redirect('/login');

    const orgs = (session.user as any)?.orgs || [];
    const isSeller = orgs.some((o: any) => o.type === 'seller');
    if (!isSeller) redirect('/onboarding');

    const newCount = inquiries.filter(i => i.status === 'new').length;
    const respondedCount = inquiries.filter(i => i.status === 'responded').length;

    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite">
            <DashboardHeader title="Buyer Inquiries" />

            <div className="p-6 md:p-8 space-y-6 w-full max-w-[1600px] mx-auto">
                <div>
                    <h2 className="text-xl font-bold text-steel-blue">Inquiry Inbox</h2>
                    <p className="text-sm text-industrial-grey-light mt-1">Respond to buyer inquiries quickly. Faster responses = higher conversion.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Total Inquiries', value: inquiries.length, icon: Inbox, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
                        { label: 'New / Unread', value: newCount, icon: AlertCircle, color: 'text-safety-orange', bg: 'bg-safety-orange/10' },
                        { label: 'Responded', value: respondedCount, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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

                {/* Inquiry List */}
                <div className="space-y-4">
                    {inquiries.map(inquiry => {
                        const statusCfg = statusMap[inquiry.status as keyof typeof statusMap];
                        return (
                            <div key={inquiry.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <div className="h-12 w-12 rounded-full bg-electric-blue/10 flex items-center justify-center flex-shrink-0 text-electric-blue font-bold text-lg">
                                                {inquiry.buyer[0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h3 className="text-base font-bold text-steel-blue">{inquiry.buyer}</h3>
                                                    <span className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border", statusCfg.class)}>
                                                        <statusCfg.icon size={12} />
                                                        {statusCfg.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Package size={12} className="text-industrial-grey-light flex-shrink-0" />
                                                    <span className="text-sm text-industrial-grey-light truncate">{inquiry.machine}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-industrial-grey-light flex-shrink-0">{inquiry.receivedAt}</span>
                                    </div>

                                    <p className="mt-4 text-sm text-industrial-grey leading-relaxed border-l-2 border-electric-blue/20 pl-4 bg-slate-50 py-3 pr-4 rounded-r-lg">
                                        "{inquiry.message}"
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5 text-industrial-grey-light">
                                            <DollarSign size={14} />
                                            <span>Budget: <span className="font-bold text-steel-blue">{inquiry.budget}</span></span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-industrial-grey-light">
                                            <MapPin size={14} />
                                            <span>{inquiry.location}</span>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex gap-3">
                                        <button className="flex items-center gap-2 rounded-xl bg-electric-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-electric-blue-hover transition-all shadow-sm">
                                            <MessageSquare size={16} />
                                            Reply / Send Quote
                                        </button>
                                        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-industrial-grey hover:bg-slate-50 transition-all">
                                            <Zap size={16} />
                                            Quick Quote
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
