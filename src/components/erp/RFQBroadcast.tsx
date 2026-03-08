"use client";

import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Clock, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_RFQS = [
    { id: 1, title: "Hydraulic Press 20 Ton", city: "Ahmedabad", time: "2 min ago", type: "Urgent" },
    { id: 2, title: "Precision CNC Lathe V-200", city: "Pune", time: "15 min ago", type: "Market" },
    { id: 3, title: "Vertical Milling Machine", city: "Coimbatore", time: "45 min ago", type: "New" },
    { id: 4, title: "SINO Digital Readout System", city: "Delhi", time: "1 hour ago", type: "Standard" },
    { id: 5, title: "Sheet Metal Feeding Line", city: "Bangalore", time: "3 hours ago", type: "Market" },
    { id: 6, title: "Automatic Surface Grinder", city: "Rajkot", time: "5 hours ago", type: "Urgent" },
];

export default function RFQBroadcast() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % MOCK_RFQS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const visibleRfqs = [
        MOCK_RFQS[currentIndex],
        MOCK_RFQS[(currentIndex + 1) % MOCK_RFQS.length],
        MOCK_RFQS[(currentIndex + 2) % MOCK_RFQS.length],
    ];

    return (
        <div className="relative rounded-3xl bg-slate-900 p-8 shadow-2xl overflow-hidden aspect-[4/5] flex flex-col border border-white/10">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-electric-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-safety-orange/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

            {/* Header */}
            <div className="relative z-20 flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Broadcast</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">Rapid RFQ Stream</h3>
                </div>
                <Zap size={24} className="text-safety-orange fill-safety-orange animate-bounce" />
            </div>

            {/* Stats Summary */}
            <div className="relative z-20 grid grid-cols-2 gap-3 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Active RFQs</p>
                    <p className="text-2xl font-black text-white leading-none">142</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Daily Quotes</p>
                    <p className="text-2xl font-black text-white leading-none">850+</p>
                </div>
            </div>

            {/* RFQ Stream Section */}
            <div className="relative z-20 flex-1 flex flex-col gap-4 overflow-hidden">
                <AnimatePresence mode="popLayout text-slate-200">
                    {visibleRfqs.map((rfq, idx) => (
                        <motion.div
                            key={`${rfq.id}-${currentIndex}-${idx}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: idx === 0 ? 1 : 0.6 - (idx * 0.2), y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className={`p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between group transition-all ${idx === 0 ? 'ring-1 ring-white/20' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-bold text-white text-sm line-clamp-1">{rfq.title}</h4>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                            <MapPin size={10} className="text-electric-blue" />
                                            {rfq.city}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                            <Clock size={10} />
                                            {rfq.time}
                                        </div>
                                    </div>
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                                    rfq.type === 'Urgent' ? 'bg-rose-500/20 text-rose-400' :
                                    rfq.type === 'Market' ? 'bg-indigo-500/20 text-indigo-400' :
                                    'bg-emerald-500/20 text-emerald-400'
                                }`}>
                                    {rfq.type}
                                </span>
                            </div>
                            
                            {idx === 0 && (
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                                            <ShieldCheck size={10} className="text-emerald-400" />
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-400">Verified Buyer</span>
                                    </div>
                                    <button className="text-[10px] font-black text-safety-orange uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform">
                                        Quote Now <ChevronRight size={12} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                <span>Infrastructure: Verified India-wide</span>
                <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                    Sync Active
                </span>
            </div>
        </div>
    );
}
