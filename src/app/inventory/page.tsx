"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/inventory/ProductCard';
import { inventory } from '@/data/inventory.json';
import {
    Search,
    SlidersHorizontal,
    LayoutGrid,
    LayoutList,
    ChevronDown,
    X,
    Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['All', ...Array.from(new Set(inventory.map(p => p.category))).sort()];
const conditions = ['All', 'New', 'Used', 'Refurbished'];
const locations = ['All India', 'Delhi NCR', 'Faridabad', 'Gurugram', 'Noida', 'Pune', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'];

export default function InventoryPage() {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCondition, setSelectedCondition] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All India');
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');

    const filtered = inventory
        .filter(p => {
            const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase());
            const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
            return matchQuery && matchCat;
        })
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });

    const FilterPanel = () => (
        <div className="space-y-6">
            {/* Category */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-grey-light mb-3">Category</h3>
                <div className="space-y-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "w-full text-left text-sm px-3 py-2 rounded-md transition-all font-medium",
                                selectedCategory === cat
                                    ? "bg-electric-blue text-white"
                                    : "text-industrial-grey hover:bg-light-graphite hover:text-steel-blue"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Condition */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-grey-light mb-3">Condition</h3>
                <div className="flex flex-wrap gap-2">
                    {conditions.map(c => (
                        <button
                            key={c}
                            onClick={() => setSelectedCondition(c)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                                selectedCondition === c
                                    ? "border-electric-blue bg-electric-blue text-white"
                                    : "border-slate-200 text-industrial-grey hover:border-electric-blue"
                            )}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Location */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-grey-light mb-3">Location</h3>
                <select
                    value={selectedLocation}
                    onChange={e => setSelectedLocation(e.target.value)}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-industrial-grey bg-white focus:border-electric-blue focus:outline-none"
                >
                    {locations.map(l => <option key={l}>{l}</option>)}
                </select>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-grey-light mb-3">Price Range</h3>
                <div className="flex items-center gap-2 text-sm font-bold text-steel-blue">
                    <span>₹{(priceRange[0] / 100000).toFixed(1)}L</span>
                    <span className="text-industrial-grey-light">—</span>
                    <span>₹{(priceRange[1] / 100000).toFixed(1)}L</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full mt-2 accent-electric-blue"
                />
            </div>

            {/* Reset */}
            <button
                onClick={() => { setSelectedCategory('All'); setSelectedCondition('All'); setSelectedLocation('All India'); setPriceRange([0, 5000000]); setQuery(''); }}
                className="w-full text-xs font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Page Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-extrabold text-steel-blue mb-2">Industrial Equipment Catalog</h1>
                    <p className="text-industrial-grey-light">Browse verified machines from GST-verified suppliers across India.</p>

                    {/* Search + Sort Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-industrial-grey-light pointer-events-none" />
                            <input
                                type="search"
                                placeholder="Search machines, brands, categories..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue shadow-sm"
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-industrial-grey focus:border-electric-blue focus:outline-none shadow-sm"
                            >
                                <option value="newest">Sort: Newest First</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-industrial-grey shadow-sm"
                            >
                                <Filter size={16} /> Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <SlidersHorizontal size={16} className="text-electric-blue" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-steel-blue">Filters</h2>
                            </div>
                            <FilterPanel />
                        </div>
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {isMobileFilterOpen && (
                        <>
                            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
                            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white p-6 shadow-2xl lg:hidden overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-base font-bold text-steel-blue">Filters</h2>
                                    <button onClick={() => setIsMobileFilterOpen(false)}><X size={20} /></button>
                                </div>
                                <FilterPanel />
                            </div>
                        </>
                    )}

                    {/* Main Grid */}
                    <div className="flex-1 min-w-0">
                        {/* Results bar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm font-medium text-industrial-grey-light">
                                Showing <span className="font-bold text-steel-blue">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
                                {selectedCategory !== 'All' && <span> in <span className="text-electric-blue">{selectedCategory}</span></span>}
                            </p>
                            {(selectedCategory !== 'All' || query) && (
                                <button
                                    onClick={() => { setSelectedCategory('All'); setQuery(''); }}
                                    className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-700"
                                >
                                    <X size={12} /> Clear
                                </button>
                            )}
                        </div>

                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filtered.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <Search size={48} className="text-slate-200 mb-4" />
                                <h3 className="text-lg font-bold text-steel-blue mb-2">No results found</h3>
                                <p className="text-sm text-industrial-grey-light">Try adjusting your search or filters</p>
                                <button onClick={() => { setSelectedCategory('All'); setQuery(''); }} className="mt-4 text-sm font-bold text-electric-blue">
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
