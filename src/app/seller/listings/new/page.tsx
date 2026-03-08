"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
    CheckCircle2,
    UploadCloud,
    Info,
    Settings,
    Tag,
    Image as ImageIcon,
    FileCheck,
    Loader2,
    AlertCircle,
    Trash2,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const steps = [
    { id: 1, name: 'Basic Info', icon: Info },
    { id: 2, name: 'Specs', icon: Settings },
    { id: 3, name: 'Pricing', icon: Tag },
    { id: 4, name: 'Media', icon: ImageIcon },
    { id: 5, name: 'Publish', icon: FileCheck },
];

export default function AddEquipmentPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Full Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        condition: 'new',
        description: '',
        price: '',
        priceType: 'fixed', // 'fixed' | 'negotiable' | 'on_request'
        leadTime: '',
        warranty: '',
        specs: [
            { label: 'Brand', value: '' },
            { label: 'Model', value: '' }
        ],
        media: [] as { url: string; type: string }[]
    });

    const handleNext = async () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final Step (Step 5) - Publish
            await publishListing();
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const publishListing = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/listings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to publish listing");

            // Success redirect to dashboard
            router.push("/seller/dashboard");
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const updateSpec = (index: number, value: string) => {
        const newSpecs = [...formData.specs];
        newSpecs[index].value = value;
        setFormData({ ...formData, specs: newSpecs });
    };

    const addSpec = () => {
        setFormData({ ...formData, specs: [...formData.specs, { label: '', value: '' }] });
    };

    const updateSpecLabel = (index: number, label: string) => {
        const newSpecs = [...formData.specs];
        newSpecs[index].label = label;
        setFormData({ ...formData, specs: newSpecs });
    };

    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite text-slate-800">
            <DashboardHeader title="Add New Equipment" />

            <div className="p-6 md:p-8 w-full max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left Col (Form & Stepper) */}
                <div className="xl:col-span-2 flex flex-col h-full bg-white rounded-2xl border border-industrial-grey-light/20 shadow-sm overflow-hidden min-h-[700px]">

                    {/* Stepper Header */}
                    <div className="border-b border-industrial-grey-light/20 px-6 py-5 bg-light-graphite/50 shrink-0">
                        <nav aria-label="Progress">
                            <ol role="list" className="flex items-center justify-between w-full">
                                {steps.map((step, stepIdx) => (
                                    <li key={step.name} className={cn(
                                        "relative flex-1 text-center",
                                        stepIdx !== steps.length - 1 ? "pr-4 sm:pr-8" : ""
                                    )}>
                                        <div className="flex flex-col items-center group">
                                            <div className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all z-10",
                                                currentStep > step.id ? "border-electric-blue bg-electric-blue text-white" :
                                                    currentStep === step.id ? "border-electric-blue bg-white text-electric-blue shadow-md" :
                                                        "border-industrial-grey-light/30 bg-white text-industrial-grey-light"
                                            )}>
                                                {currentStep > step.id ? (
                                                    <CheckCircle2 size={20} />
                                                ) : (
                                                    <step.icon size={18} />
                                                )}
                                            </div>
                                            <span className={cn(
                                                "absolute -bottom-6 mt-3 text-[10px] font-black uppercase tracking-widest sm:relative sm:bottom-0 sm:mt-2",
                                                currentStep >= step.id ? "text-steel-blue" : "text-industrial-grey-light"
                                            )}>{step.name}</span>
                                        </div>
                                        {stepIdx !== steps.length - 1 ? (
                                            <div className={cn(
                                                "absolute top-5 left-[50%] w-full h-0.5 ml-6 -translate-y-1/2 transition-all duration-500",
                                                currentStep > step.id ? "bg-electric-blue" : "bg-industrial-grey-light/20"
                                            )} aria-hidden="true" />
                                        ) : null}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>

                    {/* Error Feedback */}
                    {error && (
                        <div className="mx-10 mt-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-bold flex items-center gap-3">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {/* Form Content Area */}
                    <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                        
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-black text-steel-blue mb-2">Basic Information</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Start by defining what you are selling. Accurate titles generate 60% more inquiries.</p>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Machine Listing Title *</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. SINO SDS-2MS Digital Readout System"
                                            className="block w-full rounded-xl border border-industrial-grey-light/30 px-5 py-4 text-sm font-bold focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 bg-slate-50 transition-all placeholder:text-slate-300"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category *</label>
                                            <select
                                                required
                                                className="block w-full rounded-xl border border-industrial-grey-light/30 px-5 py-4 text-sm font-bold focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 bg-slate-50 transition-all"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                <option value="CNC">CNC Machines</option>
                                                <option value="Fabrication">Fabrication Equipment</option>
                                                <option value="Hydraulic">Hydraulic Presses</option>
                                                <option value="Material Handling">Material Handling</option>
                                                <option value="Spares">Machine Spares</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Condition *</label>
                                            <select
                                                className="block w-full rounded-xl border border-industrial-grey-light/30 px-5 py-4 text-sm font-bold focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 bg-slate-50 transition-all"
                                                value={formData.condition}
                                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                            >
                                                <option value="new">Brand New</option>
                                                <option value="used">Used / Pre-owned</option>
                                                <option value="refurbished">Refurbished</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Description</label>
                                        <textarea
                                            rows={5}
                                            placeholder="Provide a quick overview of the machine's capabilities, tech details, and why it's a good buy..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="block w-full rounded-xl border border-industrial-grey-light/30 px-5 py-4 text-sm font-bold focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/10 bg-slate-50 transition-all placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Specs */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-black text-steel-blue mb-2">Technical Specifications</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Detailed specs help buyers make faster purchasing decisions.</p>
                                </div>
                                <div className="space-y-4">
                                    {formData.specs.map((spec, idx) => (
                                        <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end animate-in fade-in slide-in-from-left-2 transition-all">
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Parameter Label</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Spindle Speed"
                                                    value={spec.label}
                                                    onChange={(e) => updateSpecLabel(idx, e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-sm text-slate-900 focus:ring-1 focus:ring-indigo-500/20" 
                                                />
                                            </div>
                                            <div className="relative">
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Value</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. 5000 RPM"
                                                    value={spec.value}
                                                    onChange={(e) => updateSpec(idx, e.target.value)}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-sm text-slate-900 focus:ring-1 focus:ring-indigo-500/20 px-10" 
                                                />
                                                <button 
                                                    onClick={() => {
                                                        const n = [...formData.specs];
                                                        n.splice(idx, 1);
                                                        setFormData({...formData, specs: n});
                                                    }}
                                                    className="absolute right-4 top-[34px] text-slate-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button 
                                        onClick={addSpec}
                                        className="mt-6 flex items-center gap-2 text-xs font-black uppercase text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-lg"
                                    >
                                        <Plus size={14} /> Add Specification
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Pricing */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-black text-steel-blue mb-2">Pricing & Fulfillment</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Set pricing expectations and delivery timelines.</p>
                                </div>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Pricing Structure</label>
                                            <div className="grid grid-cols-1 gap-3">
                                                {['fixed', 'negotiable', 'on_request'].map((type) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => setFormData({...formData, priceType: type})}
                                                        className={cn(
                                                            "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
                                                            formData.priceType === type ? "border-electric-blue bg-electric-blue/5 text-steel-blue shadow-sm" : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
                                                        )}
                                                    >
                                                        <span className="font-bold text-sm capitalize">{type.replace('_', ' ')}</span>
                                                        {formData.priceType === type && <CheckCircle2 size={18} className="text-electric-blue" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {formData.priceType !== 'on_request' && (
                                            <div className="animate-in fade-in zoom-in-95 duration-300">
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Estimated Price (INR) *</label>
                                                <div className="relative">
                                                    <span className="absolute left-6 top-[18px] text-lg font-black text-slate-400">₹</span>
                                                    <input
                                                        type="number"
                                                        placeholder="0,00,000"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                        className="block w-full rounded-2xl border border-industrial-grey-light/30 py-5 pl-12 pr-6 text-2xl font-black text-steel-blue focus:border-electric-blue focus:ring-4 focus:ring-electric-blue/5 bg-white shadow-xl shadow-slate-200/50"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Est. Lead Time (Days)</label>
                                            <input 
                                                type="number" 
                                                placeholder="e.g. 15" 
                                                value={formData.leadTime}
                                                onChange={(e) => setFormData({...formData, leadTime: e.target.value})}
                                                className="block w-full rounded-xl border border-industrial-grey-light/20 px-5 py-4 text-sm font-bold bg-slate-50" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Warranty (Months)</label>
                                            <input 
                                                type="number" 
                                                placeholder="e.g. 12" 
                                                value={formData.warranty}
                                                onChange={(e) => setFormData({...formData, warranty: e.target.value})}
                                                className="block w-full rounded-xl border border-industrial-grey-light/20 px-5 py-4 text-sm font-bold bg-slate-50" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Media Placeholder */}
                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-black text-steel-blue mb-2">Upload Visuals</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Listings with authentic factory photos generate 3x more interest.</p>
                                </div>
                                <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-16 text-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group hover:border-indigo-500/30">
                                    <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mx-auto mb-6 text-slate-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                                        <UploadCloud size={40} />
                                    </div>
                                    <h3 className="text-xl font-black text-steel-blue mb-2 tracking-tight">Image Upload System Locked</h3>
                                    <p className="text-sm font-medium text-industrial-grey-light max-w-sm mx-auto leading-relaxed">
                                        The advanced industrial visual processing system will be active after profile verification. 
                                        <br/><span className="text-indigo-600 mt-2 block font-bold">Public listings will currently use the placeholder bank.</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Final Review */}
                        {currentStep === 5 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-sm">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-steel-blue">Final Marketplace Audit</h2>
                                        <p className="text-sm text-industrial-grey-light">Review your data before going live to thousands of industrial buyers.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Listing Summary</h4>
                                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                            <div>
                                                <dt className="text-xs font-bold text-slate-400 mb-1">Title</dt>
                                                <dd className="font-extrabold text-steel-blue">{formData.title || 'Untitled Listing'}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-bold text-slate-400 mb-1">Category & Condition</dt>
                                                <dd className="font-extrabold text-steel-blue capitalize">{formData.category || 'N/A'} • {formData.condition}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-bold text-slate-400 mb-1">Market Price</dt>
                                                <dd className="font-black text-indigo-600 text-xl">
                                                    {formData.priceType === 'on_request' ? 'Price on Request' : `₹${Number(formData.price).toLocaleString('en-IN')}`}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-bold text-slate-400 mb-1">Technical Parameters</dt>
                                                <dd className="font-extrabold text-steel-blue">{formData.specs.filter(s => s.value).length} Attributes Defined</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                        <AlertCircle className="text-amber-500 shrink-0" size={20} />
                                        <p className="text-xs font-bold text-amber-800 leading-relaxed">
                                            AuzaarBazaar quality standards: Real-time fraud detection is active. Listings with inaccurate specs or suspicious pricing will be automatically paused for human audit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-industrial-grey-light/20 px-8 py-6 bg-white flex justify-between items-center shrink-0">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 1 || loading}
                            className={cn(
                                "px-6 py-4 rounded-2xl text-xs font-black tracking-[0.2em] uppercase transition-all shadow-sm",
                                (currentStep === 1 || loading) ? "opacity-30 cursor-not-allowed text-industrial-grey bg-slate-50" : "text-steel-blue border border-slate-200 hover:bg-slate-50"
                            )}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={loading || (currentStep === 1 && !formData.title)}
                            className={cn(
                                "px-10 py-4 rounded-2xl text-xs font-black tracking-[0.2em] uppercase text-white shadow-xl transition-all flex items-center gap-3",
                                loading ? "bg-slate-400" : 
                                currentStep === 5 ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20" : 
                                "bg-indigo-600 hover:bg-slate-900 shadow-indigo-500/20"
                            )}
                        >
                            {loading ? (
                                <><Loader2 className="animate-spin" size={18} /> Processing...</>
                            ) : currentStep === 5 ? (
                                'Go Live to Network'
                            ) : (
                                'Save & Proceed'
                            )}
                        </button>
                    </div>

                </div>

                {/* Right Col (Live Preview Panel) */}
                <div className="xl:col-span-1 hidden xl:block">
                    <div className="sticky top-24">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-grey-light mb-6">Marketplace Visualization</h3>
                        <div className="group relative flex flex-col rounded-[2.5rem] border border-slate-100 bg-white transition-all shadow-2xl shadow-indigo-100/50 overflow-hidden">
                            {/* Image Placeholder */}
                            <div className="relative aspect-square w-full overflow-hidden bg-slate-50 flex items-center justify-center">
                                <ImageIcon size={64} className="text-slate-100 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-6 left-6 z-10">
                                    <span className="rounded-xl bg-white px-3 py-1.5 text-[10px] font-black text-steel-blue shadow-lg uppercase tracking-widest">
                                        {formData.condition || 'Condition'}
                                    </span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                            </div>

                            {/* Content Preview */}
                            <div className="flex flex-1 flex-col p-8 -mt-6 relative z-10">
                                <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                                    {formData.category || 'CATEGORY'}
                                </div>
                                <h3 className="text-xl font-black text-steel-blue leading-tight mb-6 min-h-[60px] line-clamp-2">
                                    {formData.title || 'Machine Listing Title Preview'}
                                </h3>

                                <div className="mt-auto pt-6 border-t border-slate-100 flex items-end justify-between">
                                    <div>
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Marketplace Price</div>
                                        <div className="text-2xl font-black text-indigo-600 leading-none">
                                            {formData.priceType === 'on_request' ? 'On Request' : (formData.price ? `₹${Number(formData.price).toLocaleString('en-IN')}` : '₹0.00')}
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-200">
                                        <Plus size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Audit Note */}
                        <div className="mt-8 p-6 rounded-3xl bg-indigo-600/5 border border-indigo-500/10">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">Internal Indexing</h4>
                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                This listing will be instantly broadcasted to the landing page and indexed for smart RFQ matching. High price accuracy increases engagement by 45%.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
