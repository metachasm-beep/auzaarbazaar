import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Bookmark, Search, ExternalLink, SlidersHorizontal, Trash2 } from 'lucide-react';
import ProductCard from '@/components/inventory/ProductCard';

// Using static data simulation for saved items
import { inventory } from '@/data/inventory.json';
const savedItems = inventory.slice(0, 4);

export default async function BuyerSavedPage() {
    const session = await getServerSession();
    if (!session) redirect('/login');

    const orgs = (session.user as any)?.orgs || [];
    const isBuyer = orgs.some((o: any) => o.type === 'buyer');
    if (!isBuyer) redirect('/onboarding');

    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite">
            <DashboardHeader title="Saved Machines" />

            <div className="p-6 md:p-8 space-y-6 w-full max-w-[1600px] mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-steel-blue">Saved Machines</h2>
                        <p className="text-sm text-industrial-grey-light mt-1">Keep track of equipment you're interested in.</p>
                    </div>
                </div>

                {savedItems.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-steel-blue">{savedItems.length} Saved Items</span>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-industrial-grey shadow-sm hover:bg-slate-50">
                                    <SlidersHorizontal size={16} /> Filter
                                </button>
                                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-rose-500 shadow-sm hover:bg-rose-50 hover:border-rose-200">
                                    <Trash2 size={16} /> Clear All
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedItems.map(item => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm max-w-2xl mx-auto mt-10">
                        <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                            <Bookmark size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-steel-blue mb-2">No saved machines yet</h3>
                        <p className="text-industrial-grey-light mb-8 max-w-sm mx-auto">
                            When you find a machine you like, click the bookmark icon to save it here for later comparison.
                        </p>
                        <Link href="/inventory" className="inline-flex items-center gap-2 rounded-xl bg-electric-blue px-6 py-3 text-sm font-bold text-white shadow-md shadow-electric-blue/20 hover:bg-electric-blue-hover transition-all">
                            <Search size={18} /> Browse Equipment
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
