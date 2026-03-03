"use client";
import React, { Suspense } from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

function LoginContent() {
    const params = useSearchParams();
    const next = params.get('next') ?? '/';

    const handleGoogleSignIn = () => {
        signIn('google', { callbackUrl: next });
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-[var(--color-steel-blue)] to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center gap-2">
                        <span className="text-2xl font-black tracking-tighter text-white">Auzaar<span className="text-[var(--color-safety-orange)]">Bazaar</span></span>
                    </a>
                    <p className="mt-2 text-sm text-blue-200">India's Industrial Marketplace</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white shadow-2xl shadow-black/30 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[var(--color-steel-blue)] to-[var(--color-electric-blue)] px-8 py-6 text-white text-center">
                        <ShieldCheck size={36} className="mx-auto mb-2 opacity-90" />
                        <h1 className="text-xl font-extrabold">Sign in to Continue</h1>
                        <p className="text-sm text-blue-100 mt-1">Secure, verified access for industrial buyers & sellers</p>
                    </div>

                    {/* Body */}
                    <div className="px-8 py-8">
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                        >
                            {/* Google Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="my-6 flex items-center gap-3">
                            <div className="flex-1 border-t border-slate-100" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Why sign in?</span>
                            <div className="flex-1 border-t border-slate-100" />
                        </div>

                        <div className="space-y-3">
                            {[
                                ["Post RFQs & receive competitive quotes", "📋"],
                                ["Manage listings and track inquiries", "📦"],
                                ["Message sellers directly", "💬"],
                                ["Access verified seller dashboards", "✅"],
                            ].map(([text, icon]) => (
                                <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="text-lg">{icon}</span>
                                    {text}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-xl bg-slate-50 p-4 flex items-center gap-3">
                            <ShieldCheck size={20} className="flex-shrink-0 text-green-500" />
                            <p className="text-xs text-slate-500">We never post on your behalf. Your Google account is only used for secure authentication.</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-100 px-8 py-4 text-center">
                        <p className="text-xs text-slate-400">
                            By signing in you agree to our{' '}
                            <a href="/terms" className="text-[var(--color-electric-blue)] hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-[var(--color-electric-blue)] hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-blue-200">
                    <div className="flex items-center gap-1"><Users size={12} /> 1,200+ Accounts</div>
                    <div className="flex items-center gap-1"><Star size={12} /> 4.9 Rating</div>
                    <div className="flex items-center gap-1"><ShieldCheck size={12} /> GST Verified</div>
                </div>
            </div>
        </main>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}
