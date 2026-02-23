import React from 'react';
import { Mail, Phone, Building2, Layers } from 'lucide-react';

export default function LeadGenSection() {
    return (
        <section id="erp" className="py-24 bg-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl bg-slate-900 px-8 py-16 shadow-2xl lg:px-16 overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-industrial-blue/10 transform skew-x-12"></div>

                    <div className="relative grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                                Request a Custom <span className="text-industrial-blue">ERP Solution</span>
                            </h2>
                            <p className="text-lg text-slate-300 mb-10">
                                Ready to digitize your workshop? Fill out the form below and our implementation experts will contact you for a technical assessment.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { icon: Layers, text: "Centralized Inventory & Procurement" },
                                    { icon: Building2, text: "Shop Floor Management Modules" },
                                    { icon: Mail, text: "Automated GST & Compliance Reports" }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-white/80">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                                            <item.icon size={20} className="text-industrial-blue" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-industrial p-8 shadow-xl">
                            <form className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">FullName</label>
                                        <input type="text" className="w-full rounded-industrial border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-industrial-blue focus:ring-1 focus:ring-industrial-blue outline-none transition-all" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone</label>
                                        <input type="tel" className="w-full rounded-industrial border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-industrial-blue focus:ring-1 focus:ring-industrial-blue outline-none transition-all" placeholder="+91..." />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Company Name</label>
                                    <input type="text" className="w-full rounded-industrial border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-industrial-blue focus:ring-1 focus:ring-industrial-blue outline-none transition-all" placeholder="Enter your business name" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Machine Count (Approx)</label>
                                    <select className="w-full rounded-industrial border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-industrial-blue focus:ring-1 focus:ring-industrial-blue outline-none transition-all">
                                        <option>1-5 Machines</option>
                                        <option>5-20 Machines</option>
                                        <option>20-100 Machines</option>
                                        <option>100+ Machines</option>
                                    </select>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="w-full rounded-industrial bg-industrial-blue py-3.5 text-sm font-bold uppercase tracking-widest text-white hover:bg-industrial-blue-dark transition-all shadow-lg shadow-industrial-blue/20">
                                        Schedule Free Consultation
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
