import React, { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Bell, Search, User } from 'lucide-react';

interface DashboardHeaderProps {
    title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
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
                <button className="relative rounded-full p-2 text-industrial-grey hover:bg-light-graphite transition-colors focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2">
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-safety-orange ring-2 ring-white"></span>
                    <Bell size={20} />
                </button>

                {/* Profile Dropdown (Placeholder) */}
                <div className="relative ml-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-steel-blue text-white hover:bg-steel-blue-dark transition-colors focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2">
                        <User size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}
