import React from 'react';
import Image from 'next/image';
import { ExternalLink, Info } from 'lucide-react';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        category: string;
        brand: string;
        price: number;
        image: string;
        specs: Record<string, any>;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col rounded-industrial border border-slate-200 bg-white transition-all hover:shadow-lg overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                <div className="absolute inset-0 flex items-center justify-center p-8 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <div className="relative w-full h-full">
                        {/* Using a placeholder-like div if images aren't locally available yet */}
                        <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Machine Image</span>
                            <span className="text-[10px] text-slate-300 text-center px-4">{product.name}</span>
                        </div>
                        {/* Note: In a real app with static assets, we'd use <Image src={product.image} ... /> */}
                    </div>
                </div>
                <div className="absolute top-3 left-3">
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
                        <button className="rounded-industrial bg-slate-50 p-2 text-slate-grey hover:bg-industrial-blue hover:text-white transition-all">
                            <ExternalLink size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Specs Hover Effect */}
            <div className="absolute inset-0 z-10 bg-slate-900/90 p-6 text-white opacity-0 transition-opacity group-hover:opacity-100 flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
                    <Info size={16} />
                    <span className="text-sm font-bold uppercase tracking-widest">Technical Specifications</span>
                </div>
                <div className="space-y-3 flex-1">
                    {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                            <span className="text-[10px] uppercase text-white/50">{key}</span>
                            <span className="text-xs font-medium">{value}</span>
                        </div>
                    ))}
                </div>
                <button className="mt-4 w-full rounded-industrial bg-industrial-blue py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-industrial-blue-dark transition-colors">
                    View Detail Sheet
                </button>
            </div>
        </div>
    );
}
