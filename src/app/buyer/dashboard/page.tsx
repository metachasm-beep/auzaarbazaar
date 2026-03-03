import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
    Send,
    Zap,
    MessageSquare,
    Bookmark,
    FileText,
    Search,
    ArrowLeftRight,
    TrendingUp,
    CheckCircle2,
    Clock,
    Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const kpis = [
    { name: 'Total Inquiries Sent', value: '24', icon: Send },
    { name: 'Active RFQs', value: '3', icon: Zap },
    { name: 'Supplier Responses', value: '11', icon: MessageSquare },
    { name: 'Saved Machines', value: '8', icon: Bookmark },
];

const timelineEvents = [
    { id: 1, type: 'rfq', title: 'RFQ Sent: 20 Ton Hydraulic Press', time: '2 hours ago', status: 'Pending', icon: Zap, color: 'text-safety-orange', bg: 'bg-safety-orange/10' },
    { id: 2, type: 'response', title: 'Supplier responded to your inquiry on CNC Lathe V-200', time: 'Yesterday, 4:30 PM', status: 'Unread', icon: MessageSquare, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
    { id: 3, type: 'price_update', title: 'Price drop alert: Vertical Milling Machine', time: 'Oct 12, 10:15 AM', status: 'Viewed', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 4, type: 'message', title: 'You received a new message from Accurate Toolings', time: 'Oct 10, 2:00 PM', status: 'Read', icon: MessageSquare, color: 'text-electric-blue', bg: 'bg-electric-blue/10' },
];

const suggestedMachines = [
    { id: 1, name: 'Precision CNC Turning Center', brand: 'Yama', price: '₹14,50,000', condition: 'New' },
    { id: 2, name: 'Heavy Duty Universal Milling', brand: 'Bharat', price: '₹8,20,000', condition: 'Refurbished' },
    { id: 3, name: 'Industrial Hydraulic Press 50T', brand: 'PressMaster', price: '₹4,10,000', condition: 'New' },
    { id: 4, name: 'Automated Packaging Line', brand: 'PackSmart', price: 'On Request', condition: 'New' },
];

export default function BuyerDashboardPage() {
    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite">
            <DashboardHeader title="Procurement Overview" />

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
                            <div className="mt-2">
                                <span className="text-3xl font-extrabold text-steel-blue">{kpi.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Middle Section (Timeline + Quick Actions) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col (Activity Timeline) */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-industrial-grey-light/20 bg-white shadow-sm overflow-hidden h-full">
                            <div className="p-6 border-b border-industrial-grey-light/10">
                                <h3 className="text-base font-bold text-steel-blue">Recent Activity Timeline</h3>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-6">
                                    {timelineEvents.map((event, idx) => (
                                        <li key={event.id} className="relative flex gap-4">
                                            {/* Line marker */}
                                            {idx !== timelineEvents.length - 1 && (
                                                <div className="absolute left-[19px] top-10 h-full w-px bg-industrial-grey-light/20" />
                                            )}

                                            {/* Icon */}
                                            <div className={cn("relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white", event.bg, event.color)}>
                                                <event.icon size={16} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col flex-1 pt-1 pb-4">
                                                <div className="flex items-start justify-between">
                                                    <p className="text-sm font-semibold text-steel-blue leading-tight">{event.title}</p>
                                                    <span className="text-xs font-medium text-industrial-grey-light whitespace-nowrap ml-4">{event.time}</span>
                                                </div>
                                                <div className="mt-2 text-xs">
                                                    <span className={cn(
                                                        "inline-flex items-center rounded-full px-2 py-0.5 font-bold",
                                                        event.status === 'Unread' || event.status === 'Pending' ? "bg-safety-orange/10 text-safety-orange" : "bg-industrial-grey-light/10 text-industrial-grey"
                                                    )}>
                                                        {event.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Col (Quick Actions) */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl border border-industrial-grey-light/20 bg-white p-6 shadow-sm h-full flex flex-col">
                            <h3 className="text-base font-bold text-steel-blue mb-6">Quick Actions</h3>

                            <div className="space-y-4 flex-1">
                                <button className="w-full flex items-center justify-between p-4 rounded-industrial border border-industrial-grey-light/20 hover:border-electric-blue hover:bg-light-graphite transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-electric-blue/10 p-2 text-electric-blue">
                                            <FileText size={18} />
                                        </div>
                                        <span className="text-sm font-bold text-steel-blue group-hover:text-electric-blue transition-colors">Post New RFQ</span>
                                    </div>
                                    <div className="text-electric-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold">→</div>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 rounded-industrial border border-industrial-grey-light/20 hover:border-electric-blue hover:bg-light-graphite transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-electric-blue/10 p-2 text-electric-blue">
                                            <Search size={18} />
                                        </div>
                                        <span className="text-sm font-bold text-steel-blue group-hover:text-electric-blue transition-colors">Browse Machinery</span>
                                    </div>
                                    <div className="text-electric-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold">→</div>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 rounded-industrial border border-industrial-grey-light/20 hover:border-electric-blue hover:bg-light-graphite transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-md bg-electric-blue/10 p-2 text-electric-blue">
                                            <ArrowLeftRight size={18} />
                                        </div>
                                        <span className="text-sm font-bold text-steel-blue group-hover:text-electric-blue transition-colors">Compare Saved Machines</span>
                                    </div>
                                    <div className="text-electric-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold">→</div>
                                </button>
                            </div>

                            <div className="mt-6 rounded-industrial bg-steel-blue p-5 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-electric-blue rounded-full blur-2xl opacity-50"></div>
                                <h4 className="text-sm font-bold mb-1 relative z-10">Need Sourcing Help?</h4>
                                <p className="text-xs text-white/70 mb-4 max-w-[200px] relative z-10">Connect with an industrial procurement expert today.</p>
                                <button className="text-xs font-bold uppercase tracking-widest text-electric-blue bg-white px-4 py-2 rounded shadow-sm hover:bg-light-graphite transition-colors relative z-10">
                                    Request Callback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section (AI Suggested Machines) */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Zap size={20} className="text-safety-orange" />
                            <h3 className="text-lg font-bold text-steel-blue">Suggested Machines Based on Your Inquiries</h3>
                        </div>
                        <button className="text-sm font-semibold text-electric-blue hover:text-electric-blue-hover transition-colors">View Deep Catalog</button>
                    </div>

                    <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 gap-6 snap-x">
                        {suggestedMachines.map((machine) => (
                            <div key={machine.id} className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-industrial-grey-light/20 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                                {/* Image Box */}
                                <div className="aspect-[4/3] w-full bg-light-graphite relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-industrial-grey-light/30">
                                        <ImageIcon size={48} />
                                    </div>
                                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                                        <span className="rounded bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-steel-blue shadow-sm">
                                            {machine.condition}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-steel-blue-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-sm">
                                        <button className="rounded-industrial bg-safety-orange px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-safety-orange-hover shadow-md">
                                            Request Quote
                                        </button>
                                    </div>
                                </div>
                                {/* Details */}
                                <div className="p-5">
                                    <div className="text-xs font-bold text-electric-blue mb-1 uppercase tracking-widest">{machine.brand}</div>
                                    <h4 className="text-base font-extrabold text-steel-blue mb-3 line-clamp-2">{machine.name}</h4>
                                    <div className="pt-3 border-t border-industrial-grey-light/10 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-industrial-grey-light">Est. Price</span>
                                        <span className="text-lg font-extrabold text-steel-blue">{machine.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
