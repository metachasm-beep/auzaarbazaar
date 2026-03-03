"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

interface DashboardHeaderProps {
    title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
    const { data: session } = useSession();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 flex h-[72px] w-full items-center justify-between border-b border-industrial-grey-light/20 bg-white px-6 shadow-sm">
            <h1 className="text-xl font-bold text-steel-blue truncate pr-4">{title}</h1>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="hidden md:flex relative w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={16} className="text-industrial-grey-light" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search dashboard..."
                        className="block w-full rounded-md border border-industrial-grey-light/30 bg-light-graphite py-2 pl-9 pr-3 text-sm placeholder:text-industrial-grey-light focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors"
                    />
                </div>

                {/* Notifications */}
                <button className="relative rounded-full p-2 text-industrial-grey hover:bg-light-graphite transition-colors focus:outline-none focus:ring-2 focus:ring-electric-blue">
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-safety-orange ring-2 ring-white"></span>
                    <Bell size={20} />
                </button>

                {/* Profile Dropdown */}
                <div className="relative ml-2">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-steel-blue text-white hover:bg-steel-blue-dark transition-colors focus:outline-none"
                    >
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="User" className="h-full w-full rounded-full object-cover" />
                        ) : (
                            <User size={18} />
                        )}
                    </button>

                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-industrial-grey-light/20 bg-white p-2 shadow-xl z-50">
                                <div className="px-3 py-2 border-b border-light-graphite mb-1">
                                    <p className="text-sm font-bold text-steel-blue truncate">{session?.user?.name || 'User Profile'}</p>
                                    <p className="text-xs text-industrial-grey-light truncate">{session?.user?.email}</p>
                                </div>
                                <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-industrial-grey hover:bg-light-graphite transition-all text-left">
                                    <Settings size={16} />
                                    Account Settings
                                </button>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all text-left"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
