"use client";

import React, { useState, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSearchParams } from 'next/navigation';
import {
    Zap,
    CheckCircle2,
    ChevronRight,
    Upload,
    MapPin,
    Package,
    DollarSign,
    Calendar,
    MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const machineCats = [
    'CNC Machines', 'Lathe Machines', 'Milling Machines', 'Grinding Machines',
    'Hydraulic Presses', 'Fabrication Equipment', 'Drilling Machines',
    'Metalworking Machinery', 'Packaging Machinery', 'Electrical Equipment', 'Other',
];

const budgetRanges = [
    'Under ₹5 Lakhs', '₹5–20 Lakhs', '₹20–50 Lakhs', '₹50L–1 Crore', 'Above 1 Crore', 'Open / Price on Request',
];

function RFQForm() {
    const params = useSearchParams();
    const prefillMachine = params.get('machine') ?? '';
    const machineId = params.get('machineId') ?? '';

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        machineName: prefillMachine,
        category: '',
        quantity: '1',
        budget: '',
        location: '',
        deliveryTimeline: '',
        message: '',
        attachFile: null as File | null,
        name: '',
        company: '',
        phone: '',
        email: '',
    });

    const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-12 text-center">
                    <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-steel-blue mb-3">RFQ Submitted!</h2>
                    <p className="text-industrial-grey-light mb-8">
                        Your request has been sent to <span className="font-bold text-steel-blue">relevant verified suppliers</span>.
                        You'll receive quotes within <span className="font-bold">2–24 hours</span>.
                    </p>
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-industrial-grey-light">Machine</span>
                            <span className="font-bold text-steel-blue">{form.machineName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-industrial-grey-light">Budget</span>
                            <span className="font-bold text-steel-blue">{form.budget}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-industrial-grey-light">Status</span>
                            <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14} />Active</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/buyer/dashboard" className="flex-1 rounded-xl bg-electric-blue py-3 text-sm font-bold text-white text-center hover:bg-electric-blue-hover transition-all">
                            View My RFQs
                        </Link>
                        <Link href="/inventory" className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-industrial-grey text-center hover:bg-slate-50 transition-all">
                            Browse More
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-safety-orange/10 flex items-center justify-center">
                            <Zap size={20} className="text-safety-orange" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-steel-blue">Post a Request for Quotation</h1>
                    </div>
                    <p className="text-industrial-grey-light ml-[52px]">
                        Tell suppliers exactly what you need. Get competitive quotes from verified sellers within hours.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                            {/* Step Tabs */}
                            <div className="flex border-b border-slate-200">
                                {[
                                    { n: 1, label: 'Machine Details' },
                                    { n: 2, label: 'Your Info' },
                                ].map(s => (
                                    <button
                                        key={s.n}
                                        type="button"
                                        onClick={() => setStep(s.n)}
                                        className={cn(
                                            "flex-1 py-4 text-sm font-bold border-b-2 transition-all",
                                            step === s.n ? "border-electric-blue text-electric-blue" : "border-transparent text-industrial-grey-light hover:text-steel-blue"
                                        )}
                                    >
                                        {s.n}. {s.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8 space-y-6">
                                {step === 1 && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-bold text-steel-blue mb-2">Machine / Equipment Name *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. CNC Lathe Machine 200mm, Hydraulic Press 50 Ton"
                                                value={form.machineName}
                                                onChange={e => update('machineName', e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Category *</label>
                                                <select
                                                    required
                                                    value={form.category}
                                                    onChange={e => update('category', e.target.value)}
                                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:border-electric-blue focus:outline-none"
                                                >
                                                    <option value="" disabled>Select Category</option>
                                                    {machineCats.map(c => <option key={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Quantity Required</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={form.quantity}
                                                    onChange={e => update('quantity', e.target.value)}
                                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Budget Range</label>
                                                <select
                                                    value={form.budget}
                                                    onChange={e => update('budget', e.target.value)}
                                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:border-electric-blue focus:outline-none"
                                                >
                                                    <option value="" disabled>Select Budget</option>
                                                    {budgetRanges.map(b => <option key={b}>{b}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Delivery Timeline</label>
                                                <select
                                                    value={form.deliveryTimeline}
                                                    onChange={e => update('deliveryTimeline', e.target.value)}
                                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:border-electric-blue focus:outline-none"
                                                >
                                                    <option value="" disabled>Select Timeline</option>
                                                    <option>Within 1 week</option>
                                                    <option>Within 1 Month</option>
                                                    <option>1–3 Months</option>
                                                    <option>Flexible</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-steel-blue mb-2">Delivery Location *</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="City, State (e.g. Faridabad, Haryana)"
                                                value={form.location}
                                                onChange={e => update('location', e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-steel-blue mb-2">Detailed Requirements / Message</label>
                                            <textarea
                                                rows={5}
                                                placeholder="Describe your exact requirements: specifications, condition (new/used), brand preference, technical requirements, etc."
                                                value={form.message}
                                                onChange={e => update('message', e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue resize-none"
                                            />
                                            <p className="mt-1 text-xs text-industrial-grey-light">More detail = better quotes. Include power, capacity, model numbers if known.</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-steel-blue mb-2">Attach Drawing / Specs (Optional)</label>
                                            <label className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-electric-blue hover:bg-slate-50 transition-all">
                                                <Upload size={20} className="text-industrial-grey-light" />
                                                <span className="text-sm text-industrial-grey-light">
                                                    {form.attachFile ? form.attachFile.name : 'Click to upload PDF, DWG, PNG'}
                                                </span>
                                                <input type="file" className="hidden" onChange={e => setForm(p => ({ ...p, attachFile: e.target.files?.[0] ?? null }))} />
                                            </label>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-electric-blue py-4 text-sm font-bold text-white shadow-lg shadow-electric-blue/20 hover:bg-electric-blue-hover transition-all"
                                        >
                                            Continue to Your Info <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        <h2 className="text-lg font-bold text-steel-blue">Your Contact Details</h2>
                                        <p className="text-sm text-industrial-grey-light -mt-3">Suppliers will reach out to these details.</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Full Name *</label>
                                                <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Sharma" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Company Name *</label>
                                                <input type="text" required value={form.company} onChange={e => update('company', e.target.value)} placeholder="ABC Industries Pvt. Ltd." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Phone / WhatsApp *</label>
                                                <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-steel-blue mb-2">Email Address *</label>
                                                <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@company.com" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-electric-blue focus:outline-none" />
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                            <h3 className="text-sm font-bold text-steel-blue mb-3">📋 Review Your RFQ</h3>
                                            <div className="space-y-2">
                                                {[
                                                    { label: 'Machine', value: form.machineName },
                                                    { label: 'Budget', value: form.budget || 'Not specified' },
                                                    { label: 'Location', value: form.location },
                                                    { label: 'Qty', value: form.quantity },
                                                ].map(r => (
                                                    <div key={r.label} className="flex justify-between text-sm">
                                                        <span className="text-industrial-grey-light">{r.label}</span>
                                                        <span className="font-bold text-steel-blue">{r.value || '—'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button type="button" onClick={() => setStep(1)} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-industrial-grey hover:bg-slate-50 transition-all">
                                                ← Back
                                            </button>
                                            <button type="submit" className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-safety-orange py-3 text-sm font-bold text-white shadow-lg shadow-safety-orange/20 hover:bg-safety-orange-hover transition-all">
                                                <Zap size={16} /> Submit RFQ
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Side Info */}
                    <div className="space-y-5">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-industrial-grey-light mb-4">How it works</h3>
                            <ol className="space-y-4">
                                {[
                                    { step: '01', title: 'Post Your RFQ', desc: 'Describe what you need in detail.' },
                                    { step: '02', title: 'Get Quotes', desc: 'Verified sellers respond within 2–24 hrs.' },
                                    { step: '03', title: 'Compare & Chat', desc: 'Compare quotes, negotiate directly.' },
                                    { step: '04', title: 'Close the Deal', desc: 'Place order with confidence.' },
                                ].map(s => (
                                    <li key={s.step} className="flex gap-4">
                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-electric-blue/10 text-electric-blue font-bold text-xs flex items-center justify-center">
                                            {s.step}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-steel-blue">{s.title}</p>
                                            <p className="text-xs text-industrial-grey-light">{s.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-industrial-grey-light">Why use our RFQ?</h3>
                            {[
                                { icon: CheckCircle2, text: 'Free to post, no hidden charges', color: 'text-emerald-500' },
                                { icon: Zap, text: 'Response guaranteed in 24h', color: 'text-safety-orange' },
                                { icon: Package, text: '300+ verified suppliers', color: 'text-electric-blue' },
                                { icon: MessageSquare, text: 'Direct messaging included', color: 'text-steel-blue' },
                            ].map(f => (
                                <div key={f.text} className="flex items-center gap-3">
                                    <f.icon size={16} className={f.color} />
                                    <span className="text-sm text-industrial-grey font-medium">{f.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function RFQPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin h-8 w-8 border-4 border-electric-blue border-t-transparent rounded-full" /></div>}>
            <RFQForm />
        </Suspense>
    );
}
