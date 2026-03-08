"use client";

import React, { useState, useEffect } from 'react';
import { 
    Users, 
    ShieldAlert, 
    Trash2, 
    UserPlus, 
    Database, 
    RefreshCcw, 
    X, 
    CheckCircle2, 
    AlertTriangle,
    Mail,
    Phone as PhoneIcon,
    Search,
    ChevronRight,
    Loader2
} from 'lucide-react';

export default function AdminControls() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({ email: '', fullName: '', phone: '' });
    const [notif, setNotif] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (Array.isArray(data)) setUsers(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (type: 'ALL' | 'TRANSACTIONS') => {
        const confirmMsg = type === 'ALL' 
            ? "WARNING: This will delete ALL users, orgs, and data except you. Are you absolutely sure?" 
            : "This will clear all messages, RFQs, and inquiries. Continue?";
        
        if (!confirm(confirmMsg)) return;

        setActionLoading(`reset-${type}`);
        try {
            const res = await fetch('/api/admin/reset-db', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type })
            });
            const data = await res.json();
            if (res.ok) {
                setNotif({ type: 'success', msg: data.message });
                fetchUsers();
            } else {
                throw new Error(data.error);
            }
        } catch (e: any) {
            setNotif({ type: 'error', msg: e.message });
        } finally {
            setActionLoading(null);
        }
    };

    const deleteUser = async (id: string) => {
        if (!confirm("Delete this user permanently?")) return;
        setActionLoading(`delete-${id}`);
        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setNotif({ type: 'success', msg: "User deleted successfully" });
                setUsers(users.filter(u => u.id !== id));
            } else {
                const data = await res.json();
                throw new Error(data.error);
            }
        } catch (e: any) {
            setNotif({ type: 'error', msg: e.message });
        } finally {
            setActionLoading(null);
        }
    };

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading('create');
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (res.ok) {
                setNotif({ type: 'success', msg: "User created" });
                setShowUserModal(false);
                setNewUser({ email: '', fullName: '', phone: '' });
                fetchUsers();
            }
        } catch (e: any) {
            setNotif({ type: 'error', msg: e.message });
        } finally {
            setActionLoading(null);
        }
    };

    const filteredUsers = users.filter(u => 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Notification Toast */}
            {notif && (
                <div className={`fixed top-24 right-8 z-[100] p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-8 ${notif.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {notif.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                    <span className="font-bold text-sm">{notif.msg}</span>
                    <button onClick={() => setNotif(null)} className="ml-4 opacity-50 hover:opacity-100"><X size={16} /></button>
                </div>
            )}

            {/* System Operations Section */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center shadow-lg">
                            <Database size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">System Maintenance</h2>
                            <p className="text-slate-500 font-medium">Critical database and state operations.</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button 
                            onClick={() => handleReset('ALL')}
                            disabled={actionLoading !== null}
                            className="flex items-center justify-between p-6 rounded-3xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-600 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:bg-white group-hover:text-rose-600 transition-colors">
                                    <ShieldAlert size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-white">Full System Reset</h3>
                                    <p className="text-xs text-rose-400/60 font-medium">Clear all users, orgs, and data.</p>
                                </div>
                            </div>
                            {actionLoading === 'reset-ALL' ? <Loader2 className="animate-spin text-white" /> : <RefreshCcw className="text-rose-500 group-hover:text-white transition-colors" size={20} />}
                        </button>

                        <button 
                            onClick={() => handleReset('TRANSACTIONS')}
                            disabled={actionLoading !== null}
                            className="flex items-center justify-between p-6 rounded-3xl border border-slate-800 bg-slate-800/20 hover:bg-slate-800 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-700/50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <RefreshCcw size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-white">Clear Transactions</h3>
                                    <p className="text-xs text-slate-500 font-medium">Messages, RFQs & Inquiries only.</p>
                                </div>
                            </div>
                            {actionLoading === 'reset-TRANSACTIONS' ? <Loader2 className="animate-spin text-white" /> : <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={20} />}
                        </button>
                    </div>
                </div>
            </section>

            {/* User Management Section */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 overflow-hidden relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center shadow-lg">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">User Intelligence</h2>
                            <p className="text-slate-500 font-medium">{users.length} Registered Identities</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search by name/email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-slate-950/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64"
                            />
                        </div>
                        <button 
                            onClick={() => setShowUserModal(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1"
                        >
                            <UserPlus size={20} />
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-slate-950/50 rounded-3xl border border-slate-800/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800/50 bg-slate-900/20">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Identity</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Metadata</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Persona</th>
                                    <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center">
                                            <Loader2 className="animate-spin text-indigo-500 mx-auto mb-4" size={32} />
                                            <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">Fetching Identity Records...</p>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-bold italic">No matching records found.</td>
                                    </tr>
                                ) : filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                    {(user.fullName || user.email || '?')[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white leading-none mb-1">{user.fullName || 'Anonymous User'}</p>
                                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                        <Mail size={12} />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                                    <PhoneIcon size={12} className="text-slate-600" />
                                                    {user.phone || 'No phone'}
                                                </div>
                                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                                    Join: {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-2">
                                                {user.memberships?.length > 0 ? user.memberships.map((m: any) => (
                                                    <span key={m.id} className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${m.org.orgType === 'seller' ? 'bg-amber-500/10 text-amber-500' : m.org.orgType === 'buyer' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                        {m.org.orgType}
                                                    </span>
                                                )) : (
                                                    <span className="text-[9px] font-black text-slate-600 uppercase italic">Onboarding...</span>
                                                )}
                                                {user.email === 'metachasm@gmail.com' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase tracking-tighter">
                                                        Super Admin
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            {user.email !== 'metachasm@gmail.com' ? (
                                                <button 
                                                    onClick={() => deleteUser(user.id)}
                                                    disabled={actionLoading !== null}
                                                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900 text-slate-500 hover:text-rose-500 hover:border-rose-500 transition-all flex items-center justify-center group/btn"
                                                >
                                                    {actionLoading === `delete-${user.id}` ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />}
                                                </button>
                                            ) : (
                                                <ShieldAlert className="ml-auto text-slate-800" size={16} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Modal: Add User */}
            {showUserModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-sm bg-slate-950/20 animate-in fade-in">
                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-16 -mt-16" />
                        
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                                    <UserPlus className="text-white" size={20} />
                                </div>
                                <h3 className="text-xl font-black text-white tracking-widest">Manual Provision</h3>
                            </div>
                            <button onClick={() => setShowUserModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
                        </div>

                        <form onSubmit={createUser} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                                <input 
                                    required 
                                    type="text" 
                                    value={newUser.fullName}
                                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                                    placeholder="Enter user's full name"
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                                <input 
                                    required 
                                    type="email" 
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    placeholder="user@example.com"
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
                                <input 
                                    type="text" 
                                    value={newUser.phone}
                                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                                    placeholder="+91..."
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                />
                            </div>

                            <button 
                                disabled={actionLoading === 'create'}
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-white hover:text-indigo-600 py-5 rounded-2xl font-black text-white text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                            >
                                {actionLoading === 'create' ? <Loader2 className="animate-spin" /> : "Authorize User"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
