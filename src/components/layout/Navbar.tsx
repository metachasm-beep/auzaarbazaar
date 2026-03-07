"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Package, Zap, MapPin, Tag, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react';

const categories = [
    { name: "Metalworking Machinery", icon: Package },
    { name: "Fabrication & Forming", icon: Package },
    { name: "Precision & Measurement", icon: Package },
    { name: "Tooling & Accessories", icon: Package },
    { name: "Electricals & Spares", icon: Package },
    { name: "Industrial Equipment", icon: Package },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: session, status } = useSession();

    const userOrgs = (session?.user as any)?.orgs || [];
    const mainOrg = userOrgs[0];
    const dashboardLink = mainOrg?.type === 'seller' ? '/seller/dashboard' : '/buyer/dashboard';

    return (
        <nav className="sticky top-0 z-50 w-full h-20 border-b border-industrial-grey-light/20 bg-white/90 backdrop-blur-md flex items-center shadow-sm">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between w-full">
                    {/* Left -> Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-extrabold tracking-tight text-steel-blue">
                                auzaar<span className="text-electric-blue">bazaar</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center -> Primary Links */}
                    <div className="hidden lg:flex items-center justify-center space-x-8 flex-1">
                        <Link href="/inventory" className="text-sm font-semibold text-industrial-grey hover:text-electric-blue transition-colors flex items-center gap-2">
                            Browse Equipment
                        </Link>

                        <div className="group relative">
                            <button className="flex items-center gap-1 text-sm font-semibold text-industrial-grey hover:text-electric-blue transition-colors">
                                Categories <ChevronDown size={14} />
                            </button>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full hidden w-64 group-hover:block pt-6">
                                <div className="rounded-industrial border border-industrial-grey-light/20 bg-white p-2 shadow-xl">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.name}
                                            href={`#${cat.name.toLowerCase().replace(/ /g, '-')}`}
                                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-industrial-grey hover:bg-light-graphite hover:text-electric-blue transition-all"
                                        >
                                            <cat.icon size={16} />
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link href="/rfq" className="text-sm font-semibold text-industrial-grey hover:text-electric-blue transition-colors flex items-center gap-1.5">
                            <Zap size={14} className="text-safety-orange" />
                            RFQ
                        </Link>
                        <Link href="/hubs" className="text-sm font-semibold text-industrial-grey hover:text-electric-blue transition-colors flex items-center gap-1.5">
                            <MapPin size={14} />
                            Industrial Hubs
                        </Link>
                        <Link href="/pricing" className="text-sm font-semibold text-industrial-grey hover:text-electric-blue transition-colors">
                            Pricing
                        </Link>
                        <Link href="/seller" className="text-sm font-semibold text-industrial-grey hover:text-electric-blue transition-colors">
                            For Sellers
                        </Link>
                    </div>

                    {/* Right Side -> CTA buttons */}
                    <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                        {status === 'loading' ? (
                            <div className="h-8 w-20 animate-pulse rounded-md bg-slate-100" />
                        ) : session ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 rounded-full border border-industrial-grey-light/20 bg-light-graphite/50 p-1 pr-3 hover:bg-light-graphite transition-all"
                                >
                                    <div className="h-8 w-8 rounded-full bg-electric-blue flex items-center justify-center text-white text-xs font-bold">
                                        {session.user?.name?.[0] || 'U'}
                                    </div>
                                    <span className="text-sm font-bold text-steel-blue max-w-[100px] truncate">{session.user?.name?.split(' ')[0]}</span>
                                    <ChevronDown size={14} className={cn("transition-transform", isProfileOpen && "rotate-180")} />
                                </button>

                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-industrial-grey-light/20 bg-white p-2 shadow-xl z-50">
                                            <div className="px-3 py-2 border-b border-light-graphite mb-1">
                                                <p className="text-xs font-bold text-industrial-grey-light uppercase tracking-widest">Logged in as</p>
                                                <p className="text-sm font-bold text-steel-blue truncate">{session.user?.email}</p>
                                            </div>
                                            <Link href={dashboardLink} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-industrial-grey hover:bg-light-graphite hover:text-electric-blue transition-all">
                                                <LayoutDashboard size={16} />
                                                Dashboard
                                            </Link>
                                            {mainOrg?.type === 'buyer' && (
                                                <Link href="/seller" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-industrial-grey hover:bg-light-graphite hover:text-electric-blue transition-all">
                                                    <Tag size={16} />
                                                    Sell on Auzaarbazaar
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => signOut()}
                                                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all text-left"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-bold text-steel-blue hover:text-electric-blue transition-colors">
                                    Login
                                </Link>
                                <Link href="/seller" className="inline-flex justify-center items-center gap-2 rounded-industrial bg-safety-orange px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-safety-orange/20 hover:bg-safety-orange-hover transition-all">
                                    <Tag size={16} />
                                    List Equipment
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-industrial-grey hover:bg-light-graphite focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full border-b border-industrial-grey-light/20 bg-white shadow-lg px-4 pb-6 pt-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <Link href="/inventory" onClick={() => setIsOpen(false)} className="text-base font-bold text-steel-blue">Browse Equipment</Link>
                    <Link href="/rfq" onClick={() => setIsOpen(false)} className="text-base font-bold text-steel-blue">RFQ</Link>
                    <Link href="/hubs" onClick={() => setIsOpen(false)} className="text-base font-bold text-steel-blue">Industrial Hubs</Link>
                    <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-base font-bold text-steel-blue">Pricing</Link>
                    <Link href="/seller" onClick={() => setIsOpen(false)} className="text-base font-bold text-steel-blue">For Sellers</Link>

                    <div className="h-px w-full bg-industrial-grey-light/20 my-2"></div>

                    {session ? (
                        <>
                            <div className="flex items-center gap-3 px-1 py-2">
                                <div className="h-10 w-10 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold">
                                    {session.user?.name?.[0] || 'U'}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-steel-blue">{session.user?.name}</p>
                                    <p className="text-xs text-industrial-grey-light">{session.user?.email}</p>
                                </div>
                            </div>
                            <Link href={dashboardLink} onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-base font-bold text-steel-blue">
                                <LayoutDashboard size={18} />
                                My Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-3 text-base font-bold text-rose-600"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setIsOpen(false)} className="text-base font-bold text-industrial-grey">Login</Link>
                            <Link href="/seller" onClick={() => setIsOpen(false)} className="inline-flex w-full justify-center items-center gap-2 rounded-industrial bg-safety-orange px-5 py-3 text-base font-bold text-white shadow-md shadow-safety-orange/20">
                                <Tag size={18} />
                                List Equipment
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
