import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import {
    CheckCircle2,
    Zap,
    TrendingUp,
    Users,
    ShieldCheck,
    BarChart3,
    ArrowRight,
    MessageSquare,
    Package,
    Star,
    Tag,
    Rocket,
} from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'RFQ Lead Inbox',
        desc: 'Get notified instantly when a buyer sends you a request. Never miss a hot lead.',
        color: 'text-safety-orange',
        bg: 'bg-safety-orange/10',
    },
    {
        icon: BarChart3,
        title: 'Listing Analytics',
        desc: 'See exactly how buyers discover your machines — views, clicks, and inquiry rates per listing.',
        color: 'text-electric-blue',
        bg: 'bg-electric-blue/10',
    },
    {
        icon: ShieldCheck,
        title: 'Verified Seller Badge',
        desc: 'Get your GST and address verified to build buyer trust and rank higher in search.',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
    },
    {
        icon: TrendingUp,
        title: 'Featured Listings',
        desc: 'Boost your machines to the top of category searches and drive 3x more inquiries.',
        color: 'text-violet-600',
        bg: 'bg-violet-50',
    },
    {
        icon: MessageSquare,
        title: 'Direct Buyer Messaging',
        desc: 'Chat with buyers, share quotation PDFs, and close deals faster — all on one platform.',
        color: 'text-steel-blue',
        bg: 'bg-slate-100',
    },
    {
        icon: Users,
        title: 'Multi-Team Access',
        desc: 'Add sales executives and managers to your seller account with role-based access.',
        color: 'text-pink-600',
        bg: 'bg-pink-50',
    },
];

const steps = [
    { n: '01', title: 'Create Account', desc: 'Sign up with Google in 30 seconds.' },
    { n: '02', title: 'Build Your Profile', desc: 'Add your company details and get verified.' },
    { n: '03', title: 'List Your Equipment', desc: 'Add machines with specs, images, and pricing.' },
    { n: '04', title: 'Start Receiving RFQs', desc: 'Buyers discover and send you inquiries directly.' },
];

export default function SellerLandingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-br from-steel-blue via-[#0d1f3c] to-slate-900 text-white py-24 lg:py-32 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-3xl -mr-64 -mt-32 pointer-events-none" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-electric-blue/30 bg-electric-blue/10 px-4 py-2 text-sm font-semibold text-electric-blue mb-8">
                            <Rocket size={16} />
                            Trusted by 300+ Sellers Across India
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                            Turn Your Inventory Into a{' '}
                            <span className="text-electric-blue">Sales Machine</span>
                        </h1>
                        <p className="text-lg text-blue-200 mb-10 max-w-2xl leading-relaxed">
                            Auzaarbazaar gives industrial equipment sellers a digital storefront, RFQ lead inbox,
                            analytics, and direct buyer messaging — without any ad spend.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center gap-3 rounded-xl bg-safety-orange px-8 py-4 text-base font-bold text-white shadow-xl shadow-safety-orange/20 hover:bg-safety-orange-hover transition-all transform hover:-translate-y-0.5"
                            >
                                <Tag size={20} />
                                Start Listing Free
                            </Link>
                            <a
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-base font-bold text-white hover:bg-white/5 transition-all"
                            >
                                See How It Works
                            </a>
                        </div>
                        <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-blue-200/80">
                            {['No listing fees', 'GST verified leads only', 'Get started in 5 minutes'].map(t => (
                                <div key={t} className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-emerald-400" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="bg-electric-blue">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
                        {[
                            { value: '300+', label: 'Verified Sellers' },
                            { value: '1,200+', label: 'Machines Listed' },
                            { value: '2hrs', label: 'Avg. Response Time' },
                            { value: '94%', label: 'RFQ Success Rate' },
                        ].map(s => (
                            <div key={s.label}>
                                <div className="text-3xl font-extrabold">{s.value}</div>
                                <div className="text-sm text-blue-200 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <section className="py-24 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-steel-blue mb-4">Everything You Need to Sell More</h2>
                        <p className="text-industrial-grey-light">A complete B2B sales toolkit built for the Indian industrial market.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map(feat => (
                            <div key={feat.title} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md hover:border-electric-blue/30 transition-all group">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${feat.bg}`}>
                                    <feat.icon size={24} className={feat.color} />
                                </div>
                                <h3 className="text-lg font-bold text-steel-blue mb-2">{feat.title}</h3>
                                <p className="text-sm text-industrial-grey-light leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-white">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-steel-blue mb-4">Start Selling in 4 Simple Steps</h2>
                        <p className="text-industrial-grey-light">From signup to receiving your first RFQ in less than an hour.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <div key={step.n} className="relative text-center">
                                <div className="flex items-center justify-center mb-5">
                                    <div className="h-14 w-14 rounded-2xl bg-electric-blue text-white flex items-center justify-center text-xl font-extrabold shadow-lg shadow-electric-blue/20">
                                        {step.n}
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <ArrowRight size={20} className="hidden md:block absolute left-full -translate-x-1/2 text-slate-200" />
                                    )}
                                </div>
                                <h3 className="text-base font-bold text-steel-blue mb-2">{step.title}</h3>
                                <p className="text-sm text-industrial-grey-light">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-24 bg-gradient-to-r from-steel-blue via-electric-blue to-steel-blue">
                <div className="mx-auto max-w-4xl px-4 text-center text-white">
                    <h2 className="text-4xl font-extrabold mb-4">Ready to Scale Your Equipment Sales?</h2>
                    <p className="text-lg text-blue-200 mb-10 max-w-xl mx-auto">
                        Join 300+ verified sellers and start receiving qualified RFQs from buyers across India today.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-3 rounded-xl bg-safety-orange px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-safety-orange/30 hover:bg-safety-orange-hover transition-all transform hover:-translate-y-1"
                    >
                        <Tag size={22} />
                        Get Started — It's Free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-10 text-center text-slate-400 text-sm">
                <p>© {new Date().getFullYear()} Auzaarbazaar. All rights reserved.</p>
                <div className="flex items-center justify-center gap-6 mt-4">
                    <Link href="/terms" className="hover:text-white">Terms</Link>
                    <Link href="/privacy" className="hover:text-white">Privacy</Link>
                    <Link href="/inventory" className="hover:text-white">Browse Catalog</Link>
                </div>
            </footer>
        </main>
    );
}
