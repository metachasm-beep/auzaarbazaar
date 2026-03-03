"use client";
import React, { useState } from 'react';
import { FileText, Send, ChevronDown, ChevronUp, CheckCircle2, ArrowRight, BadgeIndianRupee, Clock, Users, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
    "Lathe Machine", "Milling Machine", "Drilling & Tapping Machine",
    "Grinding Machines", "Rock Breaker & Chisel", "DRO & Linear Scale",
    "Metal Forming Machine", "Sheet Metal Machinery", "Material Handling",
    "Machine Accessories", "ZNC & Wirecut EDM", "Radial Drilling Machine",
    "Pipe Machinery", "Wood Machinery", "Industrial Equipment"
];

const steps = [
    { id: 1, label: "Basic Requirements", icon: FileText },
    { id: 2, label: "Technical Specs", icon: ShieldCheck },
    { id: 3, label: "Budget & Timeline", icon: BadgeIndianRupee },
    { id: 4, label: "Contact & Submit", icon: Send },
];

const faqs = [
    { q: "How quickly will I receive quotes?", a: "Verified sellers typically respond within 4–24 business hours. For urgent requirements, use the 'Urgent' flag in your RFQ." },
    { q: "Is the RFQ process free?", a: "Yes. Posting an RFQ is completely free for buyers. You only pay when you decide to purchase from a seller." },
    { q: "Can I post an RFQ without an account?", a: "You can fill the form, but you'll need to sign in with Google to submit. This ensures sellers can reach you reliably." },
    { q: "How many quotes will I get?", a: "Typically 3–8 verified sellers respond to each RFQ depending on the category and specifications." },
    { q: "What if my requirement is highly custom?", a: "Use the 'Additional Notes' field to describe custom requirements. Our team also manually matches niche RFQs with specialists." },
];

export default function RFQPage() {
    const [step, setStep] = useState(1);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [form, setForm] = useState({
        title: '', category: '', quantity: '1', unit: 'Units',
        description: '', budgetMin: '', budgetMax: '', deadline: '',
        urgent: false, name: '', company: '', phone: '', email: '',
        // technical
        model: '', brand: '', specs: '',
    });

    const update = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));
    const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[var(--color-electric-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-blue)]/10 transition-all";
    const labelCls = "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5";

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-[var(--color-steel-blue)] py-16 text-white">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                        <FileText size={14} /> RFQ — Request For Quotation
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Get Competitive Quotes<br />From Verified Industrial Sellers</h1>
                    <p className="mt-4 text-lg text-blue-100">Describe what you need. Our verified network of 500+ sellers will send you the best price — free, fast, no spam.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                        {[["4–24 hrs", "Avg Response Time"], ["500+", "Verified Sellers"], ["Free", "For All Buyers"], ["GST", "Invoice Available"]].map(([v, l]) => (
                            <div key={l} className="text-center">
                                <div className="text-2xl font-extrabold text-white">{v}</div>
                                <div className="text-xs uppercase tracking-wider">{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-4xl px-6 py-12">
                {/* Step Progress */}
                <div className="mb-10 flex items-center gap-0">
                    {steps.map((s, i) => (
                        <React.Fragment key={s.id}>
                            <button onClick={() => s.id < step && setStep(s.id)}
                                className={cn("flex flex-col items-center gap-1 flex-1",
                                    s.id < step && "cursor-pointer")}>
                                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all",
                                    s.id === step ? "border-[var(--color-electric-blue)] bg-[var(--color-electric-blue)] text-white scale-110" :
                                        s.id < step ? "border-green-500 bg-green-500 text-white" :
                                            "border-slate-200 bg-white text-slate-400")}>
                                    {s.id < step ? <CheckCircle2 size={18} /> : <s.icon size={16} />}
                                </div>
                                <span className={cn("text-[10px] font-bold uppercase tracking-wide hidden sm:block",
                                    s.id === step ? "text-[var(--color-electric-blue)]" : "text-slate-400")}>
                                    {s.label}
                                </span>
                            </button>
                            {i < steps.length - 1 && (
                                <div className={cn("h-0.5 flex-1 -mt-5 transition-all", s.id < step ? "bg-green-400" : "bg-slate-200")} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Form Cards */}
                <div className="rounded-2xl bg-white shadow-lg border border-slate-100 p-8">
                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-800">What are you looking for?</h2>
                            <div>
                                <label className={labelCls}>RFQ Title *</label>
                                <input className={inputCls} placeholder="e.g. CNC Lathe Machine 500mm Swing" value={form.title} onChange={e => update('title', e.target.value)} />
                            </div>
                            <div>
                                <label className={labelCls}>Category *</label>
                                <select className={inputCls} value={form.category} onChange={e => update('category', e.target.value)}>
                                    <option value="">Select category...</option>
                                    {categories.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Quantity *</label>
                                    <input type="number" className={inputCls} value={form.quantity} onChange={e => update('quantity', e.target.value)} min="1" />
                                </div>
                                <div>
                                    <label className={labelCls}>Unit</label>
                                    <select className={inputCls} value={form.unit} onChange={e => update('unit', e.target.value)}>
                                        {['Units', 'Sets', 'Pieces', 'Kg', 'Tons', 'Meters'].map(u => <option key={u}>{u}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Description</label>
                                <textarea rows={4} className={inputCls} placeholder="Describe your requirement in detail — application, capacity needs, special conditions..." value={form.description} onChange={e => update('description', e.target.value)} />
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="urgent" checked={form.urgent} onChange={e => update('urgent', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[var(--color-electric-blue)]" />
                                <label htmlFor="urgent" className="text-sm font-medium text-slate-700">Mark as Urgent (Required within 3 days)</label>
                            </div>
                        </div>
                    )}
                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-800">Technical Specifications</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Preferred Brand</label>
                                    <input className={inputCls} placeholder="e.g. Everest, Armstrong, etc." value={form.brand} onChange={e => update('brand', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Preferred Model</label>
                                    <input className={inputCls} placeholder="Specific model if known" value={form.model} onChange={e => update('model', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Key Technical Specs</label>
                                <textarea rows={6} className={inputCls} placeholder={`Enter specifications, one per line:\nSwing: 500mm\nBetween Centers: 1000mm\nSpindle Speed: 40-2000 RPM\nMotor Power: 7.5 HP`} value={form.specs} onChange={e => update('specs', e.target.value)} />
                            </div>
                            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-700">
                                💡 The more specific your specs, the better the quotes you'll receive. Include tolerances, certifications, or delivery location if relevant.
                            </div>
                        </div>
                    )}
                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-800">Budget & Timeline</h2>
                            <div>
                                <label className={labelCls}>Budget Range (₹)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input className={inputCls} placeholder="Min Budget" type="number" value={form.budgetMin} onChange={e => update('budgetMin', e.target.value)} />
                                    <input className={inputCls} placeholder="Max Budget" type="number" value={form.budgetMax} onChange={e => update('budgetMax', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Required By Date</label>
                                <input type="date" className={inputCls} value={form.deadline} onChange={e => update('deadline', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                {[
                                    ["3 Days", "Urgent"], ["1 Week", "Fast"], ["1 Month", "Standard"]
                                ].map(([label, tag]) => (
                                    <button key={label} className="rounded-xl border-2 border-slate-200 p-4 text-center hover:border-[var(--color-electric-blue)] transition-all">
                                        <Clock size={20} className="mx-auto mb-2 text-slate-400" />
                                        <div className="text-sm font-bold text-slate-700">{label}</div>
                                        <div className="text-xs text-slate-400">{tag}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Step 4 */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-slate-800">Your Contact Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Your Name *</label>
                                    <input className={inputCls} placeholder="Full Name" value={form.name} onChange={e => update('name', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Company / Org Name</label>
                                    <input className={inputCls} placeholder="Company Name" value={form.company} onChange={e => update('company', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Phone *</label>
                                    <input className={inputCls} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => update('phone', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Email *</label>
                                    <input className={inputCls} placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} />
                                </div>
                            </div>
                            <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                                <CheckCircle2 className="mx-auto mb-2 text-green-500" size={32} />
                                <p className="font-bold text-slate-800">Ready to submit your RFQ!</p>
                                <p className="text-sm text-slate-500 mt-1">Sign in with Google to submit securely. Sellers will contact you within 24 hours.</p>
                                <a href="/login?next=/rfq" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-steel-blue)] px-8 py-3 text-sm font-bold text-white hover:opacity-90 transition-all">
                                    Sign in with Google & Submit <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Footer Nav */}
                    <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
                        <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
                            className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all">
                            Back
                        </button>
                        {step < 4 && (
                            <button onClick={() => setStep(s => Math.min(4, s + 1))}
                                className="flex items-center gap-2 rounded-lg bg-[var(--color-electric-blue)] px-8 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-all">
                                Next Step <ArrowRight size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50">
                                    {faq.q}
                                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {openFaq === i && <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-600">{faq.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
