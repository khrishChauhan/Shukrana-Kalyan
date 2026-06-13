/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Lock, ShieldAlert, CheckCircle2, XCircle, Eye, EyeOff, ChevronRight } from 'lucide-react';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const PasswordInput = ({ label, value, onChange, placeholder }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-brand-gray/80 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none bg-white font-sans text-brand-charcoal pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray0 hover:text-brand-charcoal transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default function TransactionPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const reqs = useMemo(() => ({
    length: newPassword.length >= 8 && newPassword.length <= 16,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword)
  }), [newPassword]);

  const score = Object.values(reqs).filter(Boolean).length;

  const strength = useMemo(() => {
    if (newPassword.length === 0) return { label: '', color: 'bg-brand-gray', text: 'text-brand-gray0' };
    if (score < 3) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-600' };
    if (score < 5) return { label: 'Medium', color: 'bg-brand-primary', text: 'text-amber-600' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  }, [score, newPassword]);

  const requirements = [
    { label: '8–16 characters', met: reqs.length },
    { label: 'At least 1 uppercase letter', met: reqs.upper },
    { label: 'At least 1 lowercase letter', met: reqs.lower },
    { label: 'At least 1 number', met: reqs.number },
    { label: 'At least 1 special character', met: reqs.special }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono font-bold text-brand-charcoal/60 select-none">
        <Link to="/dashboard" className="hover:text-brand-light0 transition-colors uppercase tracking-wider">Dashboard</Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-brand-charcoal/60 uppercase tracking-wider">Account</span>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-brand-light0 uppercase tracking-wider">Transaction Password</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight font-display">Transaction Password</h1>
        <p className="text-xs text-brand-gray0 mt-1">Manage your secure transaction PIN and authentication credentials.</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Password Form Card */}
        <div className="bg-white rounded-2xl border border-slate-150 shadow-brand overflow-hidden">
          <div className="px-6 py-4 border-b border-brand-gray bg-brand-gray/50 flex items-center gap-2">
            <Lock size={14} className="text-brand-charcoal/60" />
            <h3 className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-widest font-mono">Change Transaction Password</h3>
          </div>
          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <PasswordInput label="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter current password" />
              <PasswordInput label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
              <PasswordInput label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" />

              {/* Strength Meter */}
              {newPassword.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono font-bold text-brand-charcoal/50 uppercase tracking-wider">Password Strength</span>
                    <span className={`text-[10px] font-mono font-black uppercase tracking-wider ${strength.text}`}>{strength.label}</span>
                  </div>
                  <div className="flex gap-1 h-1.5 w-full">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div key={level} className={`flex-1 rounded-full transition-colors duration-300 ${level <= score ? strength.color : 'bg-brand-gray'}`}></div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <button type="button" className="text-brand-primary text-xs font-black hover:underline font-mono">Forgot Password?</button>
                <div className="flex gap-3">
                  <button type="button" className="px-4 py-2.5 border border-brand-gray/80 text-brand-charcoal rounded-xl text-sm font-bold hover:bg-brand-gray transition-colors">Cancel</button>
                  <button
                    type="submit"
                    disabled={score < 5 || newPassword !== confirmPassword}
                    className="px-4 py-2.5 bg-brand-primary text-brand-charcoal rounded-xl text-sm font-black hover:bg-brand-light0 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-brand"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Requirements Card */}
        <div className="bg-brand-gray rounded-2xl border border-brand-gray/80 p-5">
          <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-widest font-mono mb-4">Password Requirements</h4>
          <div className="space-y-2.5">
            {requirements.map(({ label, met }) => (
              <div key={label} className={`flex items-center gap-2 text-xs font-medium ${met ? 'text-emerald-600' : 'text-brand-gray0'}`}>
                {met ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-amber-700">
            <ShieldAlert size={16} />
            <h4 className="text-xs font-black uppercase tracking-widest font-mono">Security Tips</h4>
          </div>
          <ul className="space-y-2 text-xs text-brand-charcoal/80 font-medium">
            <li className="flex items-start gap-2"><span>🔒</span> Never share your transaction password with anyone.</li>
            <li className="flex items-start gap-2"><span>🔒</span> Use a unique password not used on other platforms.</li>
            <li className="flex items-start gap-2"><span>🔒</span> Change your password regularly for better security.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
