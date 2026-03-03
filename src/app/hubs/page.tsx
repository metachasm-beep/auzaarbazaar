import React from 'react';
import { MapPin, Users, Factory, TrendingUp, ArrowRight, Star, Wrench } from 'lucide-react';

const hubs = [
    {
        city: "Faridabad",
        state: "Haryana",
        emoji: "🏭",
        specialty: "Lathe Machines, Milling, Metal Forming",
        sellers: 182,
        listings: 940,
        description: "India's oldest and largest machine tools cluster. Faridabad is the heartland of precision engineering, housing hundreds of manufacturers of lathes, milling machines, and metalworking equipment.",
        categories: ["Lathe Machine", "Milling Machine", "Metal Forming", "Grinding"],
        badge: "Top Hub"
    },
    {
        city: "Ludhiana",
        state: "Punjab",
        emoji: "⚙️",
        specialty: "Power Presses, Sheet Metal, Fabrication",
        sellers: 143,
        listings: 710,
        description: "The 'Manchester of the East'. Ludhiana specialises in power presses, sheet metal machinery, and fabrication equipment serving the auto-parts and textile industries.",
        categories: ["Sheet Metal", "Power Press", "Fabrication", "Material Handling"],
        badge: "Featured"
    },
    {
        city: "Rajkot",
        state: "Gujarat",
        emoji: "🔩",
        specialty: "CNC Machines, Drilling, Radial Machines",
        sellers: 127,
        listings: 630,
        description: "Gujarat's manufacturing capital. Rajkot is known for precision CNC machinery, drilling equipment and a strong aftermarket for machine parts and accessories.",
        categories: ["CNC Machines", "Drilling", "Radial Drilling", "Accessories"],
        badge: "Growing"
    },
    {
        city: "Batala",
        state: "Punjab",
        emoji: "🪚",
        specialty: "Lathes, Surface Grinders, Band Saws",
        sellers: 98,
        listings: 480,
        description: "One of India's oldest engineering industrial towns. Batala specialises in heavy-duty lathes and surface grinding machines used across manufacturing.",
        categories: ["Lathe Machine", "Grinding Machines", "Band Saw", "DRO Systems"],
        badge: null
    },
    {
        city: "Mumbai",
        state: "Maharashtra",
        emoji: "🏙️",
        specialty: "EDM Machines, CNC, Precision Equipment",
        sellers: 86,
        listings: 420,
        description: "India's commercial capital hosts a large cluster of precision machinery importers and dealers, specialising in EDM, Wire Cut, and high-end CNC equipment.",
        categories: ["ZNC & Wirecut EDM", "CNC Machines", "Precision Instruments", "DRO"],
        badge: null
    },
    {
        city: "Coimbatore",
        state: "Tamil Nadu",
        emoji: "🌀",
        specialty: "Textile Machinery, Pumps, Motors",
        sellers: 74,
        listings: 360,
        description: "South India's industrial capital. Coimbatore is a hub for textile machinery, motors, pumps and general purpose machine tools serving the Southern manufacturing belt.",
        categories: ["Motors & Electricals", "Textile Machinery", "Machine Accessories", "Pumps"],
        badge: null
    },
];

export default function IndustrialHubsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[var(--color-steel-blue)] to-[#0f2944] py-20 text-white">
                <div className="mx-auto max-w-6xl px-6 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                        <MapPin size={14} /> Industrial Hubs — India
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Explore India's Industrial<br />Manufacturing Clusters</h1>
                    <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">Browse verified sellers by geography. Each hub specialises in specific machinery categories — find the right supplier, closer to home.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
                        {[["6", "Active Hubs"], ["710+", "Verified Sellers"], ["3,500+", "Live Listings"], ["18", "States Covered"]].map(([v, l]) => (
                            <div key={l} className="text-center">
                                <div className="text-3xl font-extrabold text-white">{v}</div>
                                <div className="text-xs uppercase tracking-wider text-blue-200">{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-6 py-16">
                {/* Hub Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {hubs.map((hub) => (
                        <div key={hub.city} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                            {hub.badge && (
                                <div className="absolute -top-3 left-6 rounded-full bg-[var(--color-safety-orange)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                                    {hub.badge}
                                </div>
                            )}
                            <div className="p-6 border-b border-slate-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="text-4xl">{hub.emoji}</span>
                                        <h2 className="mt-2 text-2xl font-extrabold text-slate-800">{hub.city}</h2>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{hub.state}, India</p>
                                    </div>
                                    <div className="text-right text-xs text-slate-500">
                                        <div className="flex items-center gap-1 justify-end mb-1"><Users size={12} />{hub.sellers} Sellers</div>
                                        <div className="flex items-center gap-1 justify-end"><Factory size={12} />{hub.listings} Listings</div>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{hub.description}</p>
                            </div>
                            <div className="p-6 flex-1">
                                <div className="mb-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Specialises In</p>
                                    <div className="flex flex-wrap gap-2">
                                        {hub.categories.map(cat => (
                                            <span key={cat} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 pb-6">
                                <a href={`/inventory?hub=${hub.city.toLowerCase()}`}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-steel-blue)] py-3 text-sm font-bold text-white hover:opacity-90 transition-all group-hover:bg-[var(--color-electric-blue)]">
                                    Browse {hub.city} Sellers <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Banner */}
                <div className="mt-16 rounded-2xl bg-gradient-to-r from-[var(--color-steel-blue)] to-[var(--color-electric-blue)] p-10 text-center text-white">
                    <TrendingUp size={40} className="mx-auto mb-4 opacity-80" />
                    <h2 className="text-3xl font-extrabold">Your City Not Listed?</h2>
                    <p className="mt-2 text-blue-100 text-lg">We're actively onboarding sellers from Pune, Delhi NCR, Hyderabad and more. Apply to register your city's hub.</p>
                    <a href="/seller" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-bold text-[var(--color-steel-blue)] hover:opacity-90 transition-all">
                        Register as a Seller <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </main>
    );
}
