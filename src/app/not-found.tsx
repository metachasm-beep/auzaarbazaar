import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { PackageSearch, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-safety-orange/10 rounded-bl-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-electric-blue/10 rounded-tr-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="h-24 w-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                            <PackageSearch size={48} className="text-industrial-grey-light opacity-50" />
                        </div>

                        <h1 className="text-6xl font-black tracking-tighter text-steel-blue mb-2 drop-shadow-sm">
                            404
                        </h1>
                        <h2 className="text-xl font-extrabold text-industrial-grey mb-4 tracking-tight">
                            Machine Not Found
                        </h2>
                        <p className="text-sm text-industrial-grey-light mb-8 max-w-xs mx-auto leading-relaxed">
                            The equipment, page, or supplier you're looking for doesn't exist or has been moved.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/inventory" className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-electric-blue py-3 px-6 text-sm font-bold text-white shadow-lg shadow-electric-blue/20 hover:bg-electric-blue-hover transition-all group">
                                <Search size={16} />
                                Browse Catalog
                            </Link>
                            <Link href="/" className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 px-6 text-sm font-bold text-industrial-grey bg-white hover:bg-slate-50 transition-all">
                                <ArrowLeft size={16} />
                                Back Home
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <p className="text-xs text-industrial-grey-light">
                                Need help? Start an <Link href="/rfq" className="text-safety-orange hover:underline font-bold">RFQ</Link> or contact <a href="mailto:support@auzaarbazaar.com" className="text-electric-blue hover:underline font-bold">Support</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
