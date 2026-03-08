"use client";

import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Clock, MapPin, ChevronRight, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SIMULATED_RFQS = [
    { type: 'RFQ', id: 's1', title: "Hydraulic Press 20 Ton", city: "Ahmedabad", time: "2 min ago", status: "Urgent" },
    { type: 'RFQ', id: 's2', title: "Precision CNC Lathe V-200", city: "Pune", time: "15 min ago", status: "Market" },
    { type: 'RFQ', id: 's3', title: "Vertical Milling Machine", city: "Coimbatore", time: "45 min ago", status: "New" },
];

export default function RFQBroadcast() {
    const [stream, setStream] = useState<any[]>(SIMULATED_RFQS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRealListings = async () => {
            try {
                const res = await fetch('/api/listings?limit=5');
                const listings = await res.json();
                
                if (Array.isArray(listings) && listings.length > 0) {
                    // Combine real listings and simulated RFQs
                    const realListingsFormatted = listings.map(l => ({
                        type: 'LISTING',
                        id: l.id,
                        title: l.title,
                        city: l.org?.city || 'India',
                        time: 'Just Now',
                        status: 'Verified'
                    }));

                    setStream([...realListingsFormatted, ...SIMULATED_RFQS]);
                }
            } catch (e) {
                console.error("Broadcast Fetch Error", e);
            } finally {
                setLoading(false);
            }
        };

        fetchRealListings();
        
        // Polling for new listings every 30 seconds
        const pollInterval = setInterval(fetchRealListings, 30000);
        return () => clearInterval(pollInterval);
    }, []);

    useEffect(() => {
        if (stream.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % stream.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [stream]);

    const visibleItems = stream.length > 0 ? [
        stream[currentIndex],
        stream[(currentIndex + 1) % stream.length],
        stream[(currentIndex + 2) % stream.length],
    ] : [];

    return (
        <div className="relative rounded-[2.5rem] bg-slate-900 p-8 shadow-2xl overflow-hidden aspect-[4/5] flex flex-col border border-white/10">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-electric-blue/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-safety-orange/5 rounded-full blur-3xl -ml-32 -mb-32" />

            {/* Header */}
            <div className="relative z-20 flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Marketplace Pulse</span>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">Active Stream</h3>
                </div>
                <Zap size={24} className="text-safety-orange fill-safety-orange animate-bounce" />
            </div>

            {/* Stream Section */}
            <div className="relative z-20 flex-1 flex flex-col gap-4 overflow-hidden">
                <AnimatePresence mode="popLayout">
                    {visibleItems.map((item, idx) => (
                        item && (
                            <motion.div
                                key={`${item.id}-${currentIndex}-${idx}`}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: idx === 0 ? 1 : 0.6 - (idx * 0.2), y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className={`p-5 rounded-2xl border transition-all ${
                                    idx === 0 
                                        ? 'border-white/20 bg-white/10 ring-1 ring-white/10' 
                                        : 'border-white/5 bg-white/5'
                                } backdrop-blur-xl flex flex-col justify-between`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="max-w-[70%]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[7px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded ${
                                                item.type === 'LISTING' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                                            }`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-white text-sm line-clamp-1 truncate">{item.title}</h4>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                <MapPin size={10} className="text-electric-blue" />
                                                {item.city}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                <Clock size={10} />
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                                        item.status === 'Urgent' ? 'bg-rose-500/20 text-rose-400' :
                                        item.status === 'Market' ? 'bg-indigo-500/20 text-indigo-400' :
                                        'bg-emerald-500/20 text-emerald-400'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                                
                                {idx === 0 && (
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                                                <ShieldCheck size={10} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-400">Industrial Verified</span>
                                        </div>
                                        <button className="text-[10px] font-black text-safety-orange uppercase tracking-widest flex items-center gap-1 hover:translate-x-1 transition-transform">
                                            {item.type === 'LISTING' ? 'View Details' : 'Quote Now'} <ChevronRight size={12} />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                <span>Infrastructure: Verified India-wide</span>
                <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Sync Active
                </span>
            </div>
        </div>
    );
}
