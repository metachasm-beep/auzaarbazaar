import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                <header className="mb-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-electric-blue mb-3">Legal</p>
                    <h1 className="text-4xl font-extrabold text-steel-blue mb-4">Marketplace Terms of Use</h1>
                    <p className="text-sm text-industrial-grey-light">Effective Date: March 7, 2026 · Governing both Buyers & Sellers</p>
                </header>

                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-steel-blue prose-p:text-industrial-grey prose-li:text-industrial-grey prose-strong:text-steel-blue prose-a:text-electric-blue">
                    <h2>1. Platform Owner</h2>
                    <p>The platform is operated by <strong>Auzaarbazaar Technologies Pvt. Ltd.</strong>, hereinafter referred to as "Auzaarbazaar", "Platform", "We", or "Us".</p>
                    <ul>
                        <li>Registered Office: Faridabad, Haryana, India</li>
                        <li>Email: support@auzaarbazaar.com</li>
                    </ul>

                    <h2>2. Platform Description</h2>
                    <p>Auzaarbazaar operates a B2B marketplace for industrial equipment and machinery that connects buyers with suppliers. The platform allows product discovery, supplier listings, RFQ submission, order placement, logistics coordination, and payment processing. Auzaarbazaar acts <strong>only as an intermediary technology platform</strong> and is not a party to any transaction between buyers and sellers.</p>

                    <h2>3. User Eligibility</h2>
                    <p>Users must be at least 18 years old, legally capable of entering contracts, and provide accurate registration information. Businesses may register using their company name, GST number, business address, and an authorised representative's details. Auzaarbazaar may suspend accounts if verification fails.</p>

                    <h2>4. Account Registration</h2>
                    <p>To access platform features, users must create an account and agree to maintain the confidentiality of login credentials, provide accurate information, and update information when necessary. Users are responsible for all activities under their accounts.</p>

                    <h2>5. User Roles</h2>
                    <p><strong>Buyers</strong> may browse products, submit RFQs, place orders, track shipments, and communicate with sellers. <strong>Sellers</strong> may list products, receive inquiries, accept orders, fulfil shipments, and manage product inventory.</p>

                    <h2>6. Product Listings</h2>
                    <p>Sellers are responsible for the accuracy of product descriptions, pricing accuracy, compliance with applicable laws, and authenticity of products. Auzaarbazaar does not verify every listing and is not responsible for seller misrepresentation.</p>

                    <h2>7. RFQ System</h2>
                    <p>Buyers may request quotations through the RFQ system. Sellers may respond with price quotes, delivery timelines, and product specifications. Auzaarbazaar does not guarantee quote acceptance or transaction completion.</p>

                    <h2>8. Orders and Transactions</h2>
                    <p>When a buyer places an order, an order request is sent to the seller, the seller confirms availability, payment is processed, and shipment is scheduled. Transactions occur between buyers and sellers. Auzaarbazaar facilitates payment and logistics coordination.</p>

                    <h2>9. Payment Processing</h2>
                    <p>Payments may be processed through integrated payment providers. Supported methods may include bank transfer, UPI, credit card, and net banking. Auzaarbazaar may deduct marketplace commissions, payment processing fees, and logistics charges.</p>

                    <h2>10. Prohibited Activities</h2>
                    <p>Users may not:</p>
                    <ul>
                        <li>Post fraudulent or misleading listings</li>
                        <li>Circumvent platform payment systems</li>
                        <li>Engage in price manipulation or bid rigging</li>
                        <li>Violate applicable Indian laws or export regulations</li>
                        <li>Use the platform to send unsolicited communications</li>
                    </ul>

                    <h2>11. Intellectual Property</h2>
                    <p>All platform design, code, branding, and content is the exclusive property of Auzaarbazaar Technologies Pvt. Ltd. Users retain ownership of content they post but grant Auzaarbazaar a licence to use it for platform operations and marketing.</p>

                    <h2>12. Limitation of Liability</h2>
                    <p>Auzaarbazaar shall not be liable for indirect, incidental, or consequential damages arising from the use or inability to use the platform. Auzaarbazaar's maximum liability shall not exceed the fees paid by the user in the 12-month period preceding the claim.</p>

                    <h2>13. Governing Law</h2>
                    <p>These Terms shall be governed by the laws of India. Any disputes shall be resolved by courts in Faridabad, Haryana. By using the platform, you accept these Terms.</p>

                    <h2>14. Contact</h2>
                    <p>For questions about these Terms, email us at <a href="mailto:legal@auzaarbazaar.com">legal@auzaarbazaar.com</a>.</p>
                </div>
            </article>
        </main>
    );
}
