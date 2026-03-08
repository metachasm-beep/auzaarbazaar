import React from 'react';
import Link from 'next/link';
import { Search, Tag, ShieldCheck, Factory, Briefcase, Zap } from 'lucide-react';
import RFQBroadcast from './RFQBroadcast';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    {/* Left Column Text Content */}
                    <div className="flex flex-col justify-center lg:col-span-7 z-10">
                        <div className="inline-flex items-center gap-2 rounded-full bg-electric-blue/10 px-4 py-1.5 text-sm font-semibold text-electric-blue mb-6 w-fit border border-electric-blue/20">
                            <Briefcase size={16} />
                            <span>B2B Industrial Procurement</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-steel-blue mb-6 leading-[1.1]">
                            India’s Trusted <span className="text-electric-blue">Industrial Equipment Marketplace</span>
                        </h1>
                        <h2 className="text-lg leading-8 text-industrial-grey-light mb-10 max-w-2xl font-normal">
                            Buy, sell, and source verified machinery with confidence. AuzaarBazaar connects manufacturers, suppliers, and buyers across India through a secure and transparent procurement platform.
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <a href="#inventory" className="inline-flex justify-center items-center gap-2 rounded-industrial bg-safety-orange px-8 py-4 text-base font-bold text-white shadow-xl shadow-safety-orange/20 hover:bg-safety-orange-hover transition-all transform hover:-translate-y-0.5">
                                <Search size={20} />
                                Browse Machinery
                            </a>
                            <Link href="/seller" className="inline-flex justify-center items-center gap-2 rounded-industrial border-2 border-industrial-grey-light/20 bg-transparent px-8 py-4 text-base font-bold text-steel-blue hover:bg-light-graphite transition-all">
                                <Tag size={20} />
                                List Your Equipment
                            </Link>
                        </div>

                        {/* Trust Bar Row */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-industrial-grey-light/10 text-sm font-semibold text-industrial-grey">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck size={16} className="text-electric-blue" />
                                GST Verified Suppliers
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Factory size={16} className="text-electric-blue" />
                                Industrial Buyers Across India
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck size={16} className="text-electric-blue" />
                                Secure Inquiry System
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Zap size={16} className="text-electric-blue" />
                                RFQ Enabled
                            </div>
                        </div>
                    </div>

                    {/* Right Column / Live RFQ Stream */}
                    <div className="mt-16 lg:mt-0 lg:col-span-5 relative hidden lg:block">
                        <RFQBroadcast />
                    </div>
                </div>
            </div>
        </section>
    );
}
