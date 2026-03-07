"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { inventory } from '@/data/inventory.json';
import {
    ShieldCheck,
    MapPin,
    Zap,
    ChevronRight,
    Bookmark,
    BookmarkCheck,
    MessageSquare,
    Share2,
    Phone,
    Star,
    CheckCircle2,
    Info,
    FileText,
    Package,
    Clock,
    Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// We use client-side because the data is static. Server ID lookup could move to a server component later.
export default function MachineDetailPage({ params }: { params: { id: string } }) {
    const product = inventory.find(p => p.id === params.id);
    const [isSaved, setIsSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<'specs' | 'supplier' | 'docs'>('specs');

    if (!product) return notFound();

    const related = inventory.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const tabs = [
        { id: 'specs', label: 'Specifications', icon: Info },
        { id: 'supplier', label: 'Supplier Profile', icon: ShieldCheck },
        { id: 'docs', label: 'Documents', icon: FileText },
    ] as const;

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-industrial-grey-light">
                        <Link href="/" className="hover:text-electric-blue">Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/inventory" className="hover:text-electric-blue">Catalog</Link>
                        <ChevronRight size={14} />
                        <Link href={`/inventory?category=${product.category}`} className="hover:text-electric-blue">{product.category}</Link>
                        <ChevronRight size={14} />
                        <span className="text-steel-blue font-medium truncate max-w-xs">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left: Images */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="relative aspect-[16/9] w-full bg-slate-50">
                                <Image
                                    src={product.image || '/assets/products/placeholder.jpg'}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8"
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    priority
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1 text-xs font-bold text-steel-blue shadow-sm uppercase tracking-widest">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => setIsSaved(!isSaved)}
                                        className={`rounded-full p-2.5 shadow-sm transition-all border ${isSaved ? 'bg-electric-blue border-electric-blue text-white' : 'bg-white border-slate-200 text-industrial-grey hover:border-electric-blue hover:text-electric-blue'}`}
                                    >
                                        {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                                    </button>
                                    <button className="rounded-full p-2.5 bg-white border border-slate-200 text-industrial-grey hover:border-electric-blue hover:text-electric-blue shadow-sm transition-all">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex border-b border-slate-200">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id
                                                ? 'border-electric-blue text-electric-blue'
                                                : 'border-transparent text-industrial-grey-light hover:text-steel-blue'
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-8">
                                {activeTab === 'specs' && (
                                    <div>
                                        <h2 className="text-lg font-bold text-steel-blue mb-6">Technical Specifications</h2>
                                        <div className="grid grid-cols-1 gap-0 divide-y divide-slate-100">
                                            {Object.entries(product.specs).map(([key, val]) => (
                                                <div key={key} className="flex items-start justify-between py-3">
                                                    <span className="text-sm text-industrial-grey-light font-medium min-w-[180px]">{key}</span>
                                                    <span className="text-sm font-bold text-steel-blue text-right">{String(val)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'supplier' && (
                                    <div>
                                        <h2 className="text-lg font-bold text-steel-blue mb-6">Supplier Information</h2>
                                        <div className="flex items-start gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                                            <div className="h-16 w-16 rounded-xl bg-electric-blue flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                                                {product.brand[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-steel-blue">{product.brand}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <ShieldCheck size={14} className="text-emerald-500" />
                                                    <span className="text-xs font-bold text-emerald-600">GST Verified</span>
                                                    <span className="text-slate-300 mx-1">•</span>
                                                    <MapPin size={14} className="text-industrial-grey-light" />
                                                    <span className="text-xs text-industrial-grey-light">Faridabad, Haryana</span>
                                                </div>
                                                <div className="flex items-center gap-1 mt-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} className={i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                                                    ))}
                                                    <span className="text-xs text-industrial-grey-light ml-1">(24 reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { label: 'Response Time', value: '< 2 hrs', icon: Clock },
                                                { label: 'RFQ Success', value: '94%', icon: CheckCircle2 },
                                                { label: 'Deliveries', value: '200+', icon: Truck },
                                            ].map(stat => (
                                                <div key={stat.label} className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                                                    <stat.icon size={20} className="mx-auto text-electric-blue mb-2" />
                                                    <div className="text-lg font-bold text-steel-blue">{stat.value}</div>
                                                    <div className="text-xs text-industrial-grey-light">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'docs' && (
                                    <div>
                                        <h2 className="text-lg font-bold text-steel-blue mb-6">Product Documents</h2>
                                        <div className="space-y-3">
                                            {['Technical Spec Sheet', 'Product Brochure', 'Warranty Certificate'].map(doc => (
                                                <div key={doc} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-electric-blue hover:bg-slate-50 transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-lg bg-red-50 p-2">
                                                            <FileText size={18} className="text-red-500" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-steel-blue">{doc}</p>
                                                            <p className="text-xs text-industrial-grey-light">PDF • 1.2 MB</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-xs font-bold text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Download
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-4 text-xs text-industrial-grey-light">
                                            Sign in to download documents. Available after submitting an RFQ.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Related Products */}
                        {related.length > 0 && (
                            <div>
                                <h2 className="text-lg font-bold text-steel-blue mb-4">Similar Machines</h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {related.map(rel => (
                                        <Link href={`/inventory/${rel.id}`} key={rel.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-electric-blue hover:shadow-md transition-all group">
                                            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-50 mb-3">
                                                <Image src={rel.image || '/assets/products/placeholder.jpg'} alt={rel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 25vw" />
                                            </div>
                                            <p className="text-xs text-industrial-grey-light font-medium">{rel.brand}</p>
                                            <p className="text-sm font-bold text-steel-blue line-clamp-2 mt-0.5">{rel.name}</p>
                                            <p className="text-sm font-bold text-electric-blue mt-1">₹{rel.price.toLocaleString('en-IN')}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Sticky CTA Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">

                            {/* Main CTA Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="bg-gradient-to-br from-steel-blue to-electric-blue p-6 text-white">
                                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">{product.brand}</p>
                                    <h1 className="text-xl font-extrabold leading-tight mb-4">{product.name}</h1>
                                    <div className="text-3xl font-black">₹{product.price.toLocaleString('en-IN')}</div>
                                    <div className="text-xs text-blue-200 mt-1">+ {product.gst} GST applicable</div>
                                </div>

                                <div className="p-6 space-y-3">
                                    <Link
                                        href={`/rfq?machine=${encodeURIComponent(product.name)}&machineId=${product.id}`}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-safety-orange px-6 py-4 text-sm font-bold text-white shadow-lg shadow-safety-orange/20 hover:bg-safety-orange-hover transition-all transform hover:-translate-y-0.5"
                                    >
                                        <Zap size={18} />
                                        Send RFQ — Get Quotes Fast
                                    </Link>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-electric-blue px-6 py-3 text-sm font-bold text-electric-blue hover:bg-electric-blue hover:text-white transition-all">
                                        <MessageSquare size={16} />
                                        Chat with Seller
                                    </button>
                                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-industrial-grey hover:bg-slate-50 transition-all">
                                        <Phone size={16} />
                                        Request Callback
                                    </button>
                                </div>
                            </div>

                            {/* Trust Signals */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                                {[
                                    { icon: ShieldCheck, text: 'GST Verified Supplier', color: 'text-emerald-500' },
                                    { icon: Package, text: 'Quality Inspected Stock', color: 'text-electric-blue' },
                                    { icon: Clock, text: 'Avg. Response < 2 hours', color: 'text-safety-orange' },
                                    { icon: Truck, text: 'Pan-India Delivery Available', color: 'text-steel-blue' },
                                ].map(t => (
                                    <div key={t.text} className="flex items-center gap-3">
                                        <t.icon size={16} className={t.color} />
                                        <span className="text-sm text-industrial-grey font-medium">{t.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Supplier Quick Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-widest text-industrial-grey-light mb-3">Sold by</p>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-steel-blue text-white flex items-center justify-center font-bold">
                                        {product.brand[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-steel-blue">{product.brand}</p>
                                        <div className="flex items-center gap-1">
                                            <ShieldCheck size={12} className="text-emerald-500" />
                                            <span className="text-xs text-emerald-600 font-medium">Verified Seller</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
