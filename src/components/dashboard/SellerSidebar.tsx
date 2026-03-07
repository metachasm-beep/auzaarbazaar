"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Menu,
    X,
    ArrowLeftRight,
    PackageSearch, // My Listings
    PlusSquare, // Add Equipment
    Inbox, // Buyer Inquiries
    Zap, // RFQ Responses
    BarChart3, // Analytics
    TrendingUp, // Featured Upgrades
    MessageSquare, // Messages
    ShieldCheck, // Verification Status
    Settings // Settings
} from 'lucide-react';

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

const sellerNavigation: SidebarItem[] = [
    { name: 'Overview', href: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'My Listings', href: '/seller/listings', icon: PackageSearch },
    { name: 'Add Equipment', href: '/seller/listings/new', icon: PlusSquare },
    { name: 'Buyer Inquiries', href: '/seller/inquiries', icon: Inbox },
    { name: 'RFQ Responses', href: '/seller/rfqs', icon: Zap },
    { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
    { name: 'Featured Upgrades', href: '/seller/upgrades', icon: TrendingUp },
    { name: 'Messages', href: '/seller/messages', icon: MessageSquare },
    { name: 'Verification Status', href: '/seller/verification', icon: ShieldCheck },
    { name: 'Settings', href: '/seller/settings', icon: Settings },
];

export function SellerSidebar({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const isSuperAdmin = (session?.user as any)?.isSuperAdmin;

    return (
        <div className="flex min-h-screen bg-light-graphite font-sans">
            {/* Mobile Sidebar Back-drop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-steel-blue-dark/80 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Framework (Fixed - 260px) */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-steel-blue-dark transition-transform duration-300 ease-in-out lg:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Area */}
                <div className="flex h-20 shrink-0 items-center justify-between px-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-extrabold tracking-tight text-white">
                            auzaar<span className="text-electric-blue">bazaar</span>
                            <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-electric-blue/20 text-electric-blue font-bold uppercase tracking-widest">
                                Seller
                            </span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden text-white/50 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <ul className="space-y-1">
                        {sellerNavigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center gap-3 rounded-industrial px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-electric-blue text-white shadow-md shadow-electric-blue/20"
                                                : "text-industrial-grey-light hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon
                                            size={18}
                                            className={cn(
                                                "shrink-0",
                                                isActive ? "text-white" : "text-industrial-grey-light group-hover:text-white"
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {isSuperAdmin && (
                        <div className="mt-6 px-3">
                            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-industrial-grey-light">Admin Controls</p>
                            <Link href="/buyer/dashboard" className="flex items-center gap-3 rounded-industrial bg-safety-orange/10 px-3 py-2.5 text-sm font-bold text-safety-orange hover:bg-safety-orange/20 transition-all border border-safety-orange/20">
                                <ArrowLeftRight size={18} />
                                Switch to Buyer View
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Bottom User Area */}
                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-industrial bg-white/5 p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-blue text-white font-bold text-sm">
                            VS
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-sm font-bold text-white truncate">Vendor Supplies</span>
                            <span className="text-xs text-industrial-grey-light truncate">verified seller</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area Wrapper */}
            <div className="flex flex-1 flex-col lg:pl-[260px] min-h-screen relative w-full overflow-hidden shrink-0 min-w-0">
                {/* Mobile Menu Toggle Header (only on mobile) */}
                <div className="sticky top-0 z-30 flex h-16 items-center border-b border-industrial-grey-light/20 bg-white px-4 shadow-sm lg:hidden shrink-0">
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="text-industrial-grey hover:bg-light-graphite rounded-md p-2"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 text-lg font-bold text-steel-blue">Dashboard</span>
                </div>

                {/* Render children inside main */}
                <main className="flex-1 w-full min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
