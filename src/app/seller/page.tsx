import React from 'react';
import { CheckCircle2, ArrowRight, Star, BarChart3, Globe, ShieldCheck, BadgeIndianRupee, Users, Zap } from 'lucide-react';

const tiers = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for first-time sellers testing the platform",
        features: ["Up to 10 listings", "Basic profile page", "Manual inquiry management", "Email support"],
        cta: "Start Free",
        highlight: false,
        badge: null
    },
    {
        name: "Growth",
        price: "₹4,999",
        period: "/ month",
        description: "For established sellers ready to scale their digital presence",
        features: ["Up to 100 listings", "Verified Seller badge", "Priority in search results", "RFQ access", "Analytics dashboard", "WhatsApp lead alerts", "GST Invoice support"],
        cta: "Start 14-Day Trial",
        highlight: true,
        badge: "Most Popular"
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large manufacturers and distributors with custom needs",
        features: ["Unlimited listings", "Dedicated account manager", "Custom storefront page", "API integration", "Bulk lead management", "Industrial Hub spotlight", "Priority placement in RFQs"],
        cta: "Talk to Sales",
        highlight: false,
        badge: null
    }
];

const whyList = [
    { icon: Globe, title: "Pan-India Reach", desc: "List once. Reach buyers from Rajkot to Coimbatore. Your products are visible to procurement teams across India." },
    { icon: ShieldCheck, title: "Trust by Verification", desc: "GST, factory, and phone verification badges signal credibility to serious buyers. Convert enquiries 3x faster." },
    { icon: Zap, title: "RFQ Matching", desc: "Buyers post RFQs daily. Get matched to relevant purchase enquiries automatically — no chasing needed." },
    { icon: BarChart3, title: "Analytics Dashboard", desc: "Know exactly which listings get views, which generate inquiries, and where buyers are coming from." },
    { icon: BadgeIndianRupee, title: "Zero Commission", desc: "We charge subscription, not commission. Every rupee a buyer pays goes directly to you." },
    { icon: Users, title: "Industrial Hubs", desc: "Get featured in your city's Industrial Hub page for local buyer discovery and regional brand building." },
];

const steps = [
    { n: "01", title: "Create Your Seller Account", desc: "Sign in with Google. Complete your business profile with GST and company details in under 10 minutes." },
    { n: "02", title: "List Your Equipment", desc: "Use our guided form to add listings with specs, photos, pricing and availability. AI helps auto-fill specs." },
    { n: "03", title: "Get Verified", desc: "Upload GST certificate. Our team verifies within 24 hours. Verified sellers get 3x more inquiries." },
    { n: "04", title: "Receive & Respond to Leads", desc: "Buyers inquire directly or via RFQ. Respond from your dashboard or WhatsApp. Close deals faster." },
];

export default function ForSellersPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[var(--color-steel-blue)] to-[#0c2340] py-24 text-white">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                        <Star size={14} /> For Sellers — Join Auzaarbazaar
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight leading-tight">Sell Your Industrial Equipment<br /><span className="text-[var(--color-safety-orange)]">to Serious B2B Buyers</span></h1>
                    <p className="mt-5 text-xl text-blue-100 max-w-2xl mx-auto">India's fastest-growing marketplace for machine tools, fabrication equipment and industrial spares. List today. Get leads tomorrow.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a href="/login?next=/seller/dashboard" className="flex items-center gap-2 rounded-xl bg-[var(--color-safety-orange)] px-8 py-4 text-base font-bold text-white hover:opacity-90 transition-all shadow-xl shadow-orange-900/30">
                            List Your Equipment Free <ArrowRight size={18} />
                        </a>
                        <a href="/pricing" className="flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all">
                            View Pricing <ArrowRight size={18} />
                        </a>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-10 text-center">
                        {[["500+", "Active Sellers"], ["3,500+", "Active Listings"], ["₹12 Cr+", "GMV Facilitated"], ["4.8★", "Seller Rating"]].map(([v, l]) => (
                            <div key={l}>
                                <div className="text-3xl font-extrabold">{v}</div>
                                <div className="text-xs uppercase tracking-widest text-blue-200">{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Section */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-4">Why Top Sellers Choose Auzaarbazaar</h2>
                    <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">Built specifically for industrial machinery — not a generic marketplace. Every feature is designed for B2B machine tool sales.</p>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {whyList.map(item => (
                            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-all">
                                <item.icon size={28} className="mb-4 text-[var(--color-electric-blue)]" />
                                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="bg-white py-20 border-y border-slate-100">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {steps.map(s => (
                            <div key={s.n} className="flex gap-5">
                                <div className="text-4xl font-black text-slate-100 leading-none select-none">{s.n}</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">{s.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section className="py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-center text-slate-500 mb-12">No hidden fees. No commissions. Cancel anytime.</p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {tiers.map(tier => (
                            <div key={tier.name} className={`relative flex flex-col rounded-2xl border-2 p-8 ${tier.highlight ? 'border-[var(--color-electric-blue)] shadow-2xl shadow-blue-100 scale-105' : 'border-slate-200 bg-white'}`}>
                                {tier.badge && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-electric-blue)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                                        {tier.badge}
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-base font-bold uppercase tracking-widest text-slate-500">{tier.name}</h3>
                                    <div className="mt-2 flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-slate-800">{tier.price}</span>
                                        <span className="text-slate-400 text-sm">{tier.period}</span>
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500">{tier.description}</p>
                                </div>
                                <ul className="flex-1 space-y-3 mb-8">
                                    {tier.features.map(f => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="/login?next=/seller/dashboard"
                                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${tier.highlight ? 'bg-[var(--color-electric-blue)] text-white hover:opacity-90' : 'border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'}`}>
                                    {tier.cta} <ArrowRight size={16} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-[var(--color-steel-blue)] py-20 text-center text-white">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-4xl font-extrabold">Ready to Start Selling?</h2>
                    <p className="mt-4 text-blue-100 text-lg">Join 500+ verified industrial sellers already growing with Auzaarbazaar.</p>
                    <a href="/login?next=/seller/listings/new" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-safety-orange)] px-10 py-4 text-base font-bold text-white hover:opacity-90 shadow-xl shadow-orange-900/30 transition-all">
                        List My First Machine <ArrowRight size={18} />
                    </a>
                </div>
            </section>
        </main>
    );
}
