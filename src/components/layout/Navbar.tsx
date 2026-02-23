"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Monitor, Cpu, Settings, Package, Hammer, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
    { name: "Metalworking Machinery", icon: Hammer },
    { name: "Fabrication & Forming", icon: Settings },
    { name: "Precision & Measurement", icon: Cpu },
    { name: "Tooling & Accessories", icon: Package },
    { name: "Electricals & Spares", icon: Monitor },
    { name: "Industrial Equipment", icon: Truck },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight text-industrial-blue">
                                auzaar<span className="text-slate-grey">bazaar</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <div className="group relative">
                                <button className="flex items-center gap-1 text-sm font-medium text-slate-grey hover:text-industrial-blue transition-colors">
                                    Inventory <ChevronDown size={14} />
                                </button>
                                <div className="absolute left-0 top-full hidden w-64 group-hover:block pt-4">
                                    <div className="rounded-industrial border border-slate-200 bg-white p-2 shadow-xl">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={`#${cat.name.toLowerCase().replace(/ /g, '-')}`}
                                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-grey hover:bg-slate-50 hover:text-industrial-blue transition-all"
                                            >
                                                <cat.icon size={16} />
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Link href="#erp" className="text-sm font-medium text-slate-grey hover:text-industrial-blue transition-colors">ERP Services</Link>
                            <Link href="#contact" className="text-sm font-medium text-slate-grey hover:text-industrial-blue transition-colors">Contact</Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-grey hover:bg-slate-100 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-2 pb-3 pt-2">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`#${cat.name.toLowerCase().replace(/ /g, '-')}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-slate-grey hover:bg-slate-50"
                        >
                            <cat.icon size={20} />
                            {cat.name}
                        </Link>
                    ))}
                    <div className="mt-4 border-t border-slate-100 pt-4">
                        <Link href="#erp" className="block px-3 py-3 text-base font-medium text-industrial-blue">ERP Services</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
