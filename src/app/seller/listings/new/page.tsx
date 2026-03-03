"use client";

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
    CheckCircle2,
    UploadCloud,
    Info,
    Settings,
    Tag,
    Image as ImageIcon,
    FileCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const steps = [
    { id: 1, name: 'Basic Info', icon: Info },
    { id: 2, name: 'Specs', icon: Settings },
    { id: 3, name: 'Pricing', icon: Tag },
    { id: 4, name: 'Media', icon: ImageIcon },
    { id: 5, name: 'Verification', icon: FileCheck },
];

export default function AddEquipmentPage() {
    const [currentStep, setCurrentStep] = useState(1);

    // Form State placeholder for preview panel
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        condition: 'new',
        price: '',
        isPriceNegotiable: false
    });

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="flex w-full flex-col min-h-screen bg-light-graphite">
            <DashboardHeader title="Add New Equipment" />

            <div className="p-6 md:p-8 w-full max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left Col (Form & Stepper) */}
                <div className="xl:col-span-2 flex flex-col h-full bg-white rounded-2xl border border-industrial-grey-light/20 shadow-sm overflow-hidden">

                    {/* Stepper Header */}
                    <div className="border-b border-industrial-grey-light/20 px-6 py-5 bg-light-graphite/50 shrink-0">
                        <nav aria-label="Progress">
                            <ol role="list" className="flex items-center justify-between w-full">
                                {steps.map((step, stepIdx) => (
                                    <li key={step.name} className={cn(
                                        "relative flex-1 text-center",
                                        stepIdx !== steps.length - 1 ? "pb-4 md:pb-0 pr-4 sm:pr-8" : ""
                                    )}>
                                        <div className="flex flex-col items-center group">
                                            <div className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
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
                                                "absolute -bottom-6 mt-3 text-xs font-bold uppercase tracking-widest sm:relative sm:bottom-0 sm:mt-2",
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

                    {/* Form Content Area */}
                    <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-steel-blue mb-2">Basic Information</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Start by defining what you are selling. Accurate titles generate 60% more inquiries.</p>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-steel-blue mb-2">Machine Listing Title *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. SINO SDS-2MS Digital Readout System"
                                            className="block w-full rounded-industrial border border-industrial-grey-light/30 px-4 py-3 text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors bg-white shadow-sm"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-steel-blue mb-2">Category *</label>
                                            <select
                                                className="block w-full rounded-industrial border border-industrial-grey-light/30 px-4 py-3 text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors bg-white shadow-sm"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                <option value="CNC">CNC Machines</option>
                                                <option value="Fabrication">Fabrication Equipment</option>
                                                <option value="Hydraulic">Hydraulic Presses</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-steel-blue mb-2">Condition *</label>
                                            <select
                                                className="block w-full rounded-industrial border border-industrial-grey-light/30 px-4 py-3 text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors bg-white shadow-sm"
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
                                        <label className="block text-sm font-bold text-steel-blue mb-2">Brief Description</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Provide a quick overview of the machine's capabilities..."
                                            className="block w-full rounded-industrial border border-industrial-grey-light/30 px-4 py-3 text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors bg-white shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-steel-blue mb-2">Technical Specifications</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Detailed specs help buyers make faster purchasing decisions.</p>
                                </div>
                                <div className="space-y-4">
                                    {/* Placeholder Spec rows based on category */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-industrial-grey mb-1">Brand/Make</label>
                                            <input type="text" className="w-full rounded-md border border-industrial-grey-light/30 p-2.5 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-industrial-grey mb-1">Model Number</label>
                                            <input type="text" className="w-full rounded-md border border-industrial-grey-light/30 p-2.5 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-industrial-grey mb-1">Year of Mfg (If Used)</label>
                                            <input type="number" className="w-full rounded-md border border-industrial-grey-light/30 p-2.5 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-industrial-grey mb-1">Power Output (kW)</label>
                                            <input type="number" className="w-full rounded-md border border-industrial-grey-light/30 p-2.5 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-industrial-grey mb-1">Dimensions</label>
                                            <input type="text" placeholder="L x W x H" className="w-full rounded-md border border-industrial-grey-light/30 p-2.5 text-sm" />
                                        </div>
                                    </div>
                                    <button className="mt-4 text-sm font-bold text-electric-blue hover:text-electric-blue-hover">+ Add Custom Specification</button>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-steel-blue mb-2">Pricing & Fulfillment</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Set pricing expectations and delivery timelines.</p>
                                </div>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-b border-light-graphite pb-6">
                                        <div>
                                            <label className="block text-sm font-bold text-steel-blue mb-2">Price (INR) *</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-[10px] text-industrial-grey-light font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    className="block w-full rounded-industrial border border-industrial-grey-light/30 py-3 pl-8 pr-4 text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors bg-white shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-6">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" className="h-5 w-5 rounded border-industrial-grey-light/50 text-electric-blue focus:ring-electric-blue" />
                                                <span className="text-sm font-bold text-industrial-grey select-none">Mark as "Price on Request"</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                        <div>
                                            <label className="block text-sm font-semibold text-steel-blue mb-2">Estimated Lead Time (Days)</label>
                                            <input type="number" placeholder="e.g. 15" className="block w-full rounded-industrial border border-industrial-grey-light/30 px-4 py-3 text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue bg-white shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-steel-blue mb-2">Warranty Provided (Months)</label>
                                            <input type="number" placeholder="e.g. 12" className="block w-full rounded-industrial border border-industrial-grey-light/30 px-4 py-3 text-sm focus:border-electric-blue focus:ring-1 focus:ring-electric-blue bg-white shadow-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-steel-blue mb-2">Upload Media</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Listings with high-quality photos get 3x more views.</p>
                                </div>
                                <div className="border-2 border-dashed border-industrial-grey-light/40 rounded-2xl p-12 text-center bg-light-graphite/50 hover:bg-light-graphite transition-colors cursor-pointer group">
                                    <UploadCloud size={48} className="mx-auto text-industrial-grey-light mb-4 group-hover:text-electric-blue transition-colors" />
                                    <h3 className="text-base font-bold text-steel-blue mb-2">Click to Upload or Drag & Drop</h3>
                                    <p className="text-sm text-industrial-grey-light max-w-sm mx-auto">Upload up to 10 images (JPEG, PNG). The first image will be your cover photo.</p>
                                    <button className="mt-6 rounded-industrial bg-white border border-industrial-grey-light/30 px-6 py-2.5 text-sm font-bold text-industrial-grey shadow-sm group-hover:border-electric-blue transition-colors">Select Files</button>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-steel-blue mb-2">Verify & Submit</h2>
                                    <p className="text-sm text-industrial-grey-light mb-8">Upload any documents to verify authenticity (Optional but recommended).</p>
                                </div>
                                <div className="rounded-xl border border-industrial-grey-light/20 bg-white shadow-sm p-6 mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-safety-orange/10 p-3 text-safety-orange shrink-0">
                                            <FileCheck size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-steel-blue">Upload Specification PDF</h3>
                                            <p className="text-sm text-industrial-grey-light mt-1 mb-4">You can attach official OEM technical spec sheets here. Buyers can download this after confirming intent.</p>
                                            <input type="file" accept=".pdf" className="text-sm text-industrial-grey" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-industrial-grey-light/20 px-6 py-5 bg-white flex justify-between items-center shrink-0">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                            className={cn(
                                "px-6 py-3 rounded-industrial text-sm font-bold tracking-widest uppercase transition-all",
                                currentStep === 1 ? "opacity-30 cursor-not-allowed text-industrial-grey border border-transparent" : "text-steel-blue border border-industrial-grey-light/30 hover:bg-light-graphite shadow-sm"
                            )}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            className={cn(
                                "px-8 py-3 rounded-industrial text-sm font-bold tracking-widest uppercase text-white shadow-md transition-all transform hover:-translate-y-0.5",
                                currentStep === 5 ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20" : "bg-electric-blue hover:bg-electric-blue-hover shadow-electric-blue/20"
                            )}
                        >
                            {currentStep === 5 ? 'Publish Listing' : 'Continue'}
                        </button>
                    </div>

                </div>

                {/* Right Col (Live Preview Panel) */}
                <div className="xl:col-span-1 hidden xl:block">
                    <div className="sticky top-[104px]">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-grey-light mb-4">Live Layout Preview</h3>
                        <div className="group relative flex flex-col rounded-2xl border border-industrial-grey-light/20 bg-white transition-all shadow-xl shadow-steel-blue-dark/5 overflow-hidden">
                            {/* Image Placeholder */}
                            <div className="relative aspect-square w-full overflow-hidden bg-light-graphite flex items-center justify-center">
                                <ImageIcon size={48} className="text-industrial-grey-light/30" />
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <span className="rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold text-steel-blue shadow-sm backdrop-blur-md uppercase tracking-widest">
                                        {formData.condition || 'Condition'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Preview */}
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-safety-orange">
                                    {formData.category || 'Category'}
                                </div>
                                <h3 className="text-lg font-extrabold text-steel-blue leading-tight mb-4 min-h-[50px]">
                                    {formData.title || 'Your Machine Title Will Appear Here'}
                                </h3>

                                <div className="mt-auto pt-6 border-t border-industrial-grey-light/10">
                                    <div className="text-sm font-semibold text-industrial-grey-light mb-1">Estimated Price</div>
                                    <div className="text-2xl font-extrabold text-electric-blue">
                                        {formData.price ? `₹${Number(formData.price).toLocaleString('en-IN')}` : '₹0.00'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
