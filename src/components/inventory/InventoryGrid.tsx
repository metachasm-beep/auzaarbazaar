"use client";

import React, { useState } from 'react';
import { inventory } from '@/data/inventory.json';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';
import { LayoutGrid, Filter } from 'lucide-react';

const categories = [
    "All",
    "Metalworking Machinery",
    "Fabrication & Forming",
    "Precision & Measurement",
    "Tooling & Accessories",
    "Industrial Equipment"
];

export default function InventoryGrid() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = activeCategory === "All"
        ? inventory
        : inventory.filter(p => p.category === activeCategory);

    return (
        <section id="inventory" className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-grey">Precision <span className="text-industrial-blue">Toolroom Machine Spares</span> & Inventory</h2>
                        <h3 className="mt-2 text-slate-grey-light font-normal">Explore our high-precision machine tools, CNC components, and specialized industrial spares.</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-grey-light bg-white border border-slate-200 rounded-industrial px-3 py-2">
                        <LayoutGrid size={16} />
                        <span className="font-medium">{filteredProducts.length} Items Found</span>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex items-center gap-3">
                        <div className="mr-2 flex items-center gap-2 text-slate-grey font-bold text-xs uppercase tracking-widest border-r border-slate-200 pr-4">
                            <Filter size={14} />
                            Filter
                        </div>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "whitespace-nowrap rounded-industrial px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all border",
                                    activeCategory === cat
                                        ? "bg-industrial-blue border-industrial-blue text-white shadow-md shadow-industrial-blue/20"
                                        : "bg-white border-slate-200 text-slate-grey hover:border-industrial-blue hover:text-industrial-blue"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-grey-light">
                        <LayoutGrid size={48} className="mb-4 opacity-10" />
                        <p className="text-lg">No items matching this category</p>
                    </div>
                )}
            </div>
        </section>
    );
}
