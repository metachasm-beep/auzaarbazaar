import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                <header className="mb-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-electric-blue mb-3">Legal</p>
                    <h1 className="text-4xl font-extrabold text-steel-blue mb-4">Privacy Policy</h1>
                    <p className="text-sm text-industrial-grey-light">Effective Date: March 7, 2026</p>
                </header>

                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-steel-blue prose-p:text-industrial-grey prose-li:text-industrial-grey prose-strong:text-steel-blue prose-a:text-electric-blue">
                    <h2>1. Introduction</h2>
                    <p>Auzaarbazaar Technologies Pvt. Ltd. ("We", "Us", "Auzaarbazaar") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform at <strong>auzaarbazaar.com</strong>.</p>

                    <h2>2. Information We Collect</h2>
                    <p>We collect information in the following ways:</p>
                    <ul>
                        <li><strong>Account Information:</strong> Name, email address, phone number, company name, and GST number provided at registration.</li>
                        <li><strong>Authentication Data:</strong> When you sign in with Google OAuth, we receive your name, email, and profile picture from Google.</li>
                        <li><strong>Listing Data:</strong> Machine details, images, pricing, and specifications you submit as a seller.</li>
                        <li><strong>Transaction Data:</strong> RFQs, quotes, orders, and messages exchanged on the platform.</li>
                        <li><strong>Usage Data:</strong> Pages visited, search queries, click behaviour, and device/browser information.</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>We use collected information to:</p>
                    <ul>
                        <li>Operate and improve the marketplace platform</li>
                        <li>Match buyers with relevant sellers and listings</li>
                        <li>Facilitate RFQs, quotes, and order processing</li>
                        <li>Send transactional emails and notifications</li>
                        <li>Analyse usage patterns to improve features</li>
                        <li>Prevent fraud, abuse, and policy violations</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h2>4. Sharing of Information</h2>
                    <p>We do not sell your personal information. We may share data with:</p>
                    <ul>
                        <li><strong>Counterparties:</strong> When you send an RFQ, relevant seller contact information may be shared with you and vice versa.</li>
                        <li><strong>Service Providers:</strong> Cloud hosting (Supabase/Render), payment processors, and analytics services that operate under confidentiality agreements.</li>
                        <li><strong>Legal Requirements:</strong> Where required by Indian law or court order.</li>
                    </ul>

                    <h2>5. Data Storage & Security</h2>
                    <p>Your data is stored on secure, encrypted servers hosted via Supabase (PostgreSQL) and deployed on Render.com cloud infrastructure. We implement industry-standard security measures including HTTPS encryption, row-level security policies, and access controls.</p>

                    <h2>6. Data Retention</h2>
                    <p>We retain your account data for as long as your account is active. Transaction records are retained for 7 years as required by Indian financial regulations. You may request account deletion by emailing <a href="mailto:privacy@auzaarbazaar.com">privacy@auzaarbazaar.com</a>.</p>

                    <h2>7. Cookies</h2>
                    <p>We use essential session cookies for authentication (NextAuth.js) and analytics cookies to understand platform usage. You can control cookies through your browser settings, though disabling them may affect platform functionality.</p>

                    <h2>8. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate information</li>
                        <li>Request deletion of your account and data</li>
                        <li>Withdraw consent for marketing communications</li>
                        <li>Data portability upon request</li>
                    </ul>

                    <h2>9. Children's Privacy</h2>
                    <p>Our platform is intended for business users and is not directed at individuals under 18 years of age. We do not knowingly collect data from minors.</p>

                    <h2>10. Changes to this Policy</h2>
                    <p>We may update this Privacy Policy periodically. We will notify registered users by email of material changes. Continued use of the platform after notification constitutes acceptance of the updated policy.</p>

                    <h2>11. Contact</h2>
                    <p>For privacy-related questions or requests, contact our Data Protection Officer at <a href="mailto:privacy@auzaarbazaar.com">privacy@auzaarbazaar.com</a>.</p>
                </div>
            </article>
        </main>
    );
}
