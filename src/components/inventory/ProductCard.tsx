"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Info, X } from 'lucide-react';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        category: string;
        brand: string;
        price: number;
        gst: string;
        image: string;
        specs: Record<string, any>;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="group relative flex flex-col rounded-industrial border border-slate-200 bg-white transition-all hover:shadow-lg overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                    <div className="absolute inset-0 flex items-center justify-center p-8 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <div className="relative w-full h-full">
                            <Image
                                src={product.image || '/assets/products/placeholder.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                    <div className="absolute top-3 left-3 z-20">
                        <span className="rounded-full bg-slate-800/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-industrial-blue">
                        {product.brand}
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-slate-grey line-clamp-2 min-h-[3rem]">
                        {product.name}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-slate-grey">
                                ₹{product.price.toLocaleString('en-IN')}
                            </p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                                className="rounded-industrial bg-slate-50 p-2 text-slate-grey hover:bg-industrial-blue hover:text-white transition-all z-20"
                            >
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Specs Hover Effect */}
                <div className="absolute inset-0 z-10 bg-slate-900/90 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
                        <Info size={16} />
                        <span className="text-sm font-bold uppercase tracking-widest">Technical Preview</span>
                    </div>
                    <div className="space-y-3 flex-1">
                        {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <span className="text-[10px] uppercase text-white/50">{key}</span>
                                <span className="text-xs font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                        className="mt-4 w-full rounded-industrial bg-industrial-blue py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-industrial-blue-dark transition-colors pointer-events-auto z-20"
                    >
                        View Full Detail Sheet
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* Image pane */}
                        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-slate-50">
                            <Image
                                src={product.image || '/assets/products/placeholder.jpg'}
                                alt={product.name}
                                fill
                                className="object-contain p-8"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Details pane */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-industrial-blue">
                                {product.brand} | {product.category}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-grey mb-6">
                                {product.name}
                            </h2>

                            <div className="bg-slate-50 p-6 rounded-industrial mb-8">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                    <Info size={16} /> Complete Specifications
                                </h4>
                                <div className="grid grid-cols-1 gap-y-4">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-200/60 last:border-0">
                                            <span className="text-sm text-slate-500">{key}</span>
                                            <span className="text-sm font-semibold text-slate-800 sm:text-right">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Trade Price</div>
                                    <div className="text-3xl font-bold text-slate-grey">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">+ {product.gst} GST applied</div>
                                </div>

                                <a href="#partner" onClick={() => setIsModalOpen(false)} className="rounded-industrial bg-industrial-blue px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-xl hover:bg-industrial-blue-dark transition-all">
                                    Inquire Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
