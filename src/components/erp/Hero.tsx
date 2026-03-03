import React from 'react';
import Link from 'next/link';
import { Search, Tag, ShieldCheck, Factory, Briefcase, Zap } from 'lucide-react';

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

                    {/* Right Column / Decorative Image */}
                    <div className="mt-16 lg:mt-0 lg:col-span-5 relative hidden lg:block">
                        <div className="relative rounded-2xl bg-steel-blue p-8 shadow-2xl overflow-hidden aspect-[4/5] flex flex-col justify-end">
                            {/* Decorative industrial background pattern/gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-steel-blue-dark via-steel-blue to-steel-blue/40 z-10"></div>
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-electric-blue/20 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            {/* Floating Stats Card Overlay */}
                            <div className="absolute top-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
                                <div className="text-white text-3xl font-bold tracking-tight">1,200+</div>
                                <div className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">Machines Listed</div>
                            </div>
                            <div className="absolute top-36 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg text-right">
                                <div className="text-white text-3xl font-bold tracking-tight">300+</div>
                                <div className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">Verified Suppliers</div>
                            </div>

                            <div className="relative z-20 mb-4 mt-auto">
                                <div className="space-y-4">
                                    <div className="h-16 w-full rounded-xl bg-white p-3 shadow-md border border-white/20 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-steel-blue tracking-widest">Live RFQ Feed</span>
                                            <span className="text-sm font-semibold text-industrial-grey mt-0.5">Hydraulic Press 20 Ton Needed</span>
                                        </div>
                                        <span className="bg-electric-blue/10 text-electric-blue text-[10px] font-bold px-2 py-1 flex items-center gap-1 rounded uppercase">New</span>
                                    </div>
                                    <div className="h-16 w-[90%] rounded-xl bg-white p-3 shadow-md border border-white/20 flex items-center justify-between opacity-80">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-bold text-steel-blue tracking-widest">Verified Supplier</span>
                                            <span className="text-sm font-semibold text-industrial-grey mt-0.5">Accurate Machine Tools</span>
                                        </div>
                                        <ShieldCheck size={16} className="text-safety-orange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
