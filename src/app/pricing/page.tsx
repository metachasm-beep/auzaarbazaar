"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { CheckCircle2, Factory, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState<'seller' | 'buyer'>('seller');

    const sellerPlans = [
        {
            name: "Free Seller",
            price: "₹0",
            description: "Best for onboarding local suppliers.",
            features: ["5 active listings", "Basic company profile", "Receive buyer inquiries", "Standard email support"]
        },
        {
            name: "Seller Starter",
            price: "₹2,999",
            period: "/ month",
            description: "For small dealers and focused suppliers.",
            features: ["25 active listings", "Up to 20 images & 3 docs per listing", "Basic RFQ access", "Lead management pipeline", "Basic performance analytics"],
            highlight: false
        },
        {
            name: "Seller Pro",
            price: "₹7,999",
            period: "/ month",
            description: "For serious suppliers and manufacturers.",
            features: ["150 active listings", "Verified Supplier eligibility", "RFQ priority access", "5 Team seats", "Response-time badge", "10 Featured listing credits", "Advanced category analytics"],
            highlight: true
        },
        {
            name: "Seller Enterprise",
            price: "₹24,999",
            period: "/ month",
            description: "For large industrial groups.",
            features: ["Unlimited listings", "20+ Team seats", "Dedicated account manager", "Custom Brand Storefront", "Exclusive RFQ leads", "Priority industrial hub placement"],
            highlight: false
        }
    ];

    const buyerPlans = [
        {
            name: "Buyer Free",
            price: "₹0",
            description: "Basic industrial sourcing capabilities.",
            features: ["Browse machinery & use filters", "Send inquiries to suppliers", "Save up to 3 listings", "Post 1 RFQ per month"]
        },
        {
            name: "Buyer Team",
            price: "₹1,999",
            period: "/ month",
            description: "For small factory procurement teams.",
            features: ["5 Team seats", "10 RFQs per month", "Shortlist pipeline management", "Quote comparison board", "Export quotes to CSV/PDF"],
            highlight: false
        },
        {
            name: "Buyer Pro",
            price: "₹5,999",
            period: "/ month",
            description: "For high-frequency industrial buyers.",
            features: ["15 Team seats", "Unlimited RFQs", "Priority supplier routing", "Reusable RFQ tempaltes", "Preferred vendor scoring"],
            highlight: true
        },
        {
            name: "Buyer Enterprise",
            price: "₹19,999",
            period: "/ month",
            description: "Enterprise level procurement operations.",
            features: ["Custom onboarding process", "Multi-stage approval flows", "ERP-friendly API exports", "SLA support", "Dedicated procurement associate"],
            highlight: false
        }
    ];

    const plans = activeTab === 'seller' ? sellerPlans : buyerPlans;

    return (
        <div className="min-h-screen bg-light-graphite flex flex-col font-sans">
            <Navbar />

            <main className="flex-grow pt-20 pb-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-electric-blue/10 px-4 py-1.5 text-sm font-semibold text-electric-blue mb-6 w-fit border border-electric-blue/20">
                        <Zap size={16} />
                        <span>Transparent Industrial Pricing</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-steel-blue tracking-tight mb-6">
                        Scale your industrial operations.
                    </h1>
                    <p className="text-lg text-industrial-grey-light mb-12 max-w-2xl mx-auto">
                        Your best tier isn't just about features. It's about securing more visibility, industrial trust, workflow automation, and sourcing speed.
                    </p>

                    {/* Tabs */}
                    <div className="inline-flex bg-white rounded-industrial p-1.5 shadow-sm border border-industrial-grey-light/20 mb-16">
                        <button
                            onClick={() => setActiveTab('seller')}
                            className={cn(
                                "px-8 py-3 rounded-md text-sm font-bold uppercase tracking-widest transition-all",
                                activeTab === 'seller'
                                    ? "bg-steel-blue text-white shadow-md"
                                    : "text-industrial-grey hover:bg-light-graphite"
                            )}
                        >
                            For Sellers
                        </button>
                        <button
                            onClick={() => setActiveTab('buyer')}
                            className={cn(
                                "px-8 py-3 rounded-md text-sm font-bold uppercase tracking-widest transition-all",
                                activeTab === 'buyer'
                                    ? "bg-steel-blue text-white shadow-md"
                                    : "text-industrial-grey hover:bg-light-graphite"
                            )}
                        >
                            For Buyers
                        </button>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left max-w-7xl mx-auto">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative flex flex-col rounded-2xl bg-white p-8 shadow-lg border transition-all duration-300",
                                    plan.highlight
                                        ? "border-electric-blue shadow-electric-blue/10 transform lg:-translate-y-4"
                                        : "border-industrial-grey-light/20 hover:border-industrial-grey-light/50"
                                )}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-electric-blue text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-steel-blue mb-2">{plan.name}</h3>
                                <p className="text-sm text-industrial-grey-light mb-6 min-h-[40px]">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold text-steel-blue">{plan.price}</span>
                                    {plan.period && <span className="text-industrial-grey-light text-sm font-semibold">{plan.period}</span>}
                                </div>

                                <button
                                    className={cn(
                                        "w-full py-3 rounded-industrial text-sm font-bold uppercase tracking-widest transition-all mb-8",
                                        plan.highlight
                                            ? "bg-safety-orange hover:bg-safety-orange-hover text-white shadow-md shadow-safety-orange/20"
                                            : "bg-light-graphite text-steel-blue hover:bg-industrial-grey-light/20 border border-industrial-grey-light/20"
                                    )}
                                >
                                    Get Started
                                </button>

                                <div className="flex-grow space-y-4">
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex gap-3">
                                            <CheckCircle2 size={18} className="text-electric-blue flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-industrial-grey font-medium leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add-on Banner */}
                    <div className="mt-24 bg-steel-blue rounded-3xl p-10 md:p-16 text-left shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/20 rounded-full blur-3xl -mr-64 -mt-64 z-0"></div>

                        <div className="relative z-10 md:w-2/3">
                            <h2 className="text-3xl font-extrabold text-white mb-4">Want specialized industrial growth?</h2>
                            <p className="text-industrial-grey-light text-lg mb-8 max-w-xl">
                                You can supercharge any tier with verified trust badges, featured category slots, and dedicated industrial hub sponsorships starting at just ₹499.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-semibold text-white backdrop-blur-md border border-white/20">
                                    <ShieldCheck size={16} className="text-safety-orange" />
                                    GST & Factory Verifications
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-semibold text-white backdrop-blur-md border border-white/20">
                                    <Factory size={16} className="text-electric-blue" />
                                    Industrial Hub Placements
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 md:mt-0">
                            <button className="bg-white text-steel-blue px-8 py-4 rounded-industrial font-bold uppercase tracking-widest shadow-xl hover:bg-light-graphite transition-all transform hover:-translate-y-1">
                                Talk to Sales
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
