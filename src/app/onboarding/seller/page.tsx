"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft, Factory, MapPin, Hash, Phone, ChevronRight, Loader2, Globe } from 'lucide-react';
import Link from 'next/link';

export default function SellerRegistrationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        gstin: "",
        website: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/onboarding/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    orgType: "seller"
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to register");

            // Successful registration
            router.push(data.redirect);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-slate-800">
            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-full h-1 bg-amber-500 z-50 shadow-sm shadow-amber-200" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-50 rounded-full -mr-80 -mt-80 blur-3xl opacity-30" />
            
            <div className="w-full max-w-2xl relative z-10">
                {/* Back Button */}
                <Link href="/onboarding" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Personas
                </Link>

                {/* Header */}
                <div className="mb-10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-500 flex items-center justify-center shadow-xl shadow-slate-200">
                        <Factory size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seller Digital Storefront</h1>
                        <p className="text-slate-500 font-medium">Register your factory or showroom on AuzaarBazaar.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-bold flex items-center gap-3">
                                <ShieldCheck size={18} />
                                {error}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Company Name */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Factory size={12} />
                                    Company / Factory Name
                                </label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Apex Machine Tools Mfg."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Phone size={12} />
                                    Sales Contact Phone
                                </label>
                                <input
                                    required
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300"
                                />
                            </div>

                            {/* GSTIN */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Hash size={12} />
                                    GSTIN (Required for Selling)
                                </label>
                                <input
                                    required
                                    name="gstin"
                                    value={formData.gstin}
                                    onChange={handleChange}
                                    placeholder="22AAAAA0000A1Z5"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300 uppercase"
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Globe size={12} />
                                    Company Website (Optional)
                                </label>
                                <input
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder="https://www.apexmachinery.com"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300"
                                />
                            </div>

                            {/* Address Area */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={12} />
                                    Factory / Showroom Address
                                </label>
                                <input
                                    required
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Sy. No. 12/4, Near Toll Plaza, NH-4"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300"
                                />
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <input
                                    required
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300"
                                />
                            </div>

                            {/* State */}
                            <div className="space-y-2">
                                <input
                                    required
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-amber-600 py-5 rounded-2xl font-black text-white text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:bg-slate-200 disabled:text-slate-400 group shadow-lg shadow-slate-100 hover:shadow-amber-100"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Provisioning Storefront...
                                </>
                            ) : (
                                <>
                                    Activate Seller Profile
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-amber-500" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs font-bold text-slate-400 leading-relaxed max-w-md mx-auto">
                    By activating your storefront, you gain access to AuzaarBazaar's lead engine. Verifications are conducted within 48 business hours.
                </p>
            </div>
        </main>
    );
}
