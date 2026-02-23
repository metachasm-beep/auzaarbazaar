import React from 'react';
import { ArrowRight, BarChart3, TrendingUp, Handshake } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    <div className="flex flex-col justify-center lg:col-span-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-industrial-blue/5 px-4 py-1.5 text-sm font-semibold text-industrial-blue mb-6 w-fit">
                            <Handshake size={16} />
                            <span>Online Sales Enablement Partner</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-grey sm:text-6xl mb-6">
                            You Build. We Sell. <br /><span className="text-industrial-blue">Together, We Grow.</span>
                        </h1>
                        <h2 className="text-lg leading-8 text-slate-grey-light mb-10 max-w-xl font-normal">
                            Not a dealer. Not a generic marketplace. We are India's most trusted industrial equipment sales platform, empowering top manufacturers to grow online without distractions.
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            <a href="#partner" className="inline-flex items-center gap-2 rounded-industrial bg-industrial-blue px-6 py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-industrial-blue-dark transition-all transform hover:-translate-y-0.5">
                                Partner With Us
                                <ArrowRight size={18} />
                            </a>
                            <a href="#inventory" className="inline-flex items-center gap-2 rounded-industrial border-2 border-slate-200 bg-transparent px-6 py-3.5 text-sm font-semibold text-slate-grey hover:bg-slate-50 transition-all">
                                View Our Collection
                            </a>
                        </div>

                        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
                            <div>
                                <p className="text-2xl font-bold text-slate-grey">Zero</p>
                                <p className="text-xs text-slate-grey-light uppercase tracking-wider font-semibold">Overhead & Ad Spend</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-grey">&lt;60m</p>
                                <p className="text-xs text-slate-grey-light uppercase tracking-wider font-semibold">Inquiry Response</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-grey">100%</p>
                                <p className="text-xs text-slate-grey-light uppercase tracking-wider font-semibold">Prepaid Orders</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 lg:mt-0 lg:col-span-6 relative">
                        <div className="relative rounded-2xl bg-slate-50 p-8 shadow-2xl border border-slate-200 overflow-hidden group">
                            {/* Decorative industrial background element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-industrial-blue/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-industrial-blue/10 transition-all"></div>

                            <div className="relative grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="h-48 rounded-xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                                        <TrendingUp className="text-industrial-blue" size={32} />
                                        <div>
                                            <div className="h-2 w-16 bg-slate-100 rounded mb-2"></div>
                                            <div className="text-xs font-bold text-slate-grey mb-1">Higher Conversion</div>
                                            <div className="h-2 w-24 bg-industrial-blue/20 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-32 rounded-xl bg-industrial-blue p-4 shadow-sm flex items-end">
                                        <div className="w-full">
                                            <div className="text-white/80 text-[10px] uppercase font-bold tracking-widest mb-1">Insights</div>
                                            <div className="h-4 w-20 bg-white/60 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="h-32 rounded-xl bg-slate-800 p-4 shadow-sm flex flex-col justify-between">
                                        <BarChart3 className="text-white/80" size={24} />
                                        <div>
                                            <div className="text-white/80 text-[10px] uppercase font-bold tracking-widest mb-1">Market Reach</div>
                                            <div className="h-2 w-16 bg-white/20 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-48 rounded-xl bg-white p-4 shadow-sm border border-slate-100 flex items-center justify-center">
                                        <div className="w-full space-y-3">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="h-2 bg-slate-50 rounded flex justify-between px-2 items-center">
                                                    <div className="w-1/2 h-1 bg-slate-200 rounded"></div>
                                                    <div className="w-4 h-1 bg-industrial-blue/30 rounded"></div>
                                                </div>
                                            ))}
                                            <div className="w-full mt-4 text-center text-[10px] text-slate-400 font-medium">Monthly KPI Reports</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
