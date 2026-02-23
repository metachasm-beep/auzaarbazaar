import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/erp/Hero';
import InventoryGrid from '@/components/inventory/InventoryGrid';
import LeadGenSection from '@/components/erp/LeadGenSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD Structured Data for AI SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Industrial Machine Tools & Toolroom Spares Collection",
            "description": "A comprehensive collection of high-precision machine tools, industrial spares, and CNC components including Lathes, Milling Machines, and Digital Readouts.",
            "url": "https://auzaarbazaar.com",
            "numberOfItems": 10,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "HERCULES Vertical Turret Milling Machine"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "All Geared Heavy Duty Lathe Machine"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "SINO SDS-2MS Digital Readout System"
              }
            ]
          })
        }}
      />

      {/* Navigation */}
      <Navbar />

      <article>
        {/* Main Content Sections */}
        <Hero />

        <InventoryGrid />

        <LeadGenSection />
      </article>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <span className="text-2xl font-bold tracking-tight text-industrial-blue">
                auzaar<span className="text-white">bazaar</span>
              </span>
              <p className="mt-4 text-slate-400 max-w-xs">
                Your premier destination for high-precision machine tools and an exclusive online sales enablement partner for top industrial manufacturers.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#inventory" className="hover:text-industrial-blue">Inventory</a></li>
                <li><a href="#partner" className="hover:text-industrial-blue">Partner With Us</a></li>
                <li><a href="#about" className="hover:text-industrial-blue">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-industrial-blue">Terms</a></li>
                <li><a href="#" className="hover:text-industrial-blue">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} auzaarbazaar. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
