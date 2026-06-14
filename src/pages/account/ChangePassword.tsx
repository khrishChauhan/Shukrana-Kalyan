/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Eye, EyeOff, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Req = ({ met, label }: { met: boolean; label: string }) => (
  <div className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${met ? 'text-emerald-600' : 'text-gray-400'}`}>
    <span className="text-base leading-none select-none">{met ? '☑' : '☐'}</span>
    <span>{label}</span>
  </div>
);

export default function ChangePassword() {
  const [current, setCurrent] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirm, setConfirm] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [done, setDone] = useState(false);

  const reqs = useMemo(() => ({
    length: newPw.length >= 8,
    upper: /[A-Z]/.test(newPw),
    lower: /[a-z]/.test(newPw),
    number: /[0-9]/.test(newPw),
    special: /[^A-Za-z0-9]/.test(newPw),
  }), [newPw]);

  const score = Object.values(reqs).filter(Boolean).length;

  const { strengthLabel, strengthBar, strengthColorClass } = useMemo(() => {
    if (newPw.length === 0) {
      return { strengthLabel: 'None', strengthBar: '[--------]', strengthColorClass: 'text-gray-400' };
    }
    switch (score) {
      case 1:
        return { strengthLabel: 'Weak', strengthBar: '[==------]', strengthColorClass: 'text-red-500' };
      case 2:
        return { strengthLabel: 'Weak', strengthBar: '[====----]', strengthColorClass: 'text-red-500' };
      case 3:
        return { strengthLabel: 'Fair', strengthBar: '[====----]', strengthColorClass: 'text-brand-primary' };
      case 4:
        return { strengthLabel: 'Good', strengthBar: '[======--]', strengthColorClass: 'text-brand-primary' };
      case 5:
        return { strengthLabel: 'Strong', strengthBar: '[========]', strengthColorClass: 'text-emerald-600' };
      default:
        return { strengthLabel: 'Weak', strengthBar: '[--------]', strengthColorClass: 'text-red-500' };
    }
  }, [newPw, score]);

  const isMatching = newPw === confirm;
  const showMatchError = confirm.length > 0 && !isMatching;
  const canSubmit = score === 5 && isMatching && current.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    setDone(true);
    setTimeout(() => setDone(false), 3500);
    
    // Reset fields
    setCurrent('');
    setNewPw('');
    setConfirm('');
  };

  const handleCancel = () => {
    setCurrent('');
    setNewPw('');
    setConfirm('');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '12px 42px 12px 14px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#232F46',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    color: '#232F46',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-[1200px] mx-auto px-4 py-2"
    >
      {/* Page Header / Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-5 uppercase tracking-wider">
        <Link to="/dashboard" className="hover:text-brand-primary transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <span>My Account</span>
        <ChevronRight size={12} />
        <span className="text-brand-primary">Change Password</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-accent tracking-tight m-0">SECURITY SETTINGS</h1>
        <p className="text-sm text-gray-500 mt-1.5">Update your password to keep your account secure.</p>
      </div>

      {/* Success banner */}
      {done && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center gap-2.5 mb-6 max-w-[600px] mx-auto">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Password updated successfully.</span>
        </div>
      )}

      {/* Centered Wrapper - Max-width 600px */}
      <div className="max-w-[600px] mx-auto">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-2 border-b border-gray-100 pb-2.5">
            CHANGE PASSWORD
          </h2>

          {/* Current Password */}
          <div>
            <label style={labelStyle}>Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                style={inputStyle}
                className="focus:border-brand-primary font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-accent cursor-pointer p-1"
                title={showCurrent ? 'Hide password' : 'Show password'}
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label style={labelStyle}>New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                style={inputStyle}
                className="focus:border-brand-primary font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-accent cursor-pointer p-1"
                title={showNew ? 'Hide password' : 'Show password'}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* ValidationTracker - Strength Meter & Checklist */}
          {newPw.length > 0 && (
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex flex-col gap-3.5">
              
              {/* Strength Meter */}
              <div className="flex items-center gap-2 text-xs font-bold text-brand-accent">
                <span>Password Strength:</span>
                <span className="font-mono tracking-wider">{strengthBar}</span>
                <span className={`uppercase tracking-wide text-[11px] ${strengthColorClass}`}>{strengthLabel}</span>
              </div>

              {/* Requirements Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5 pt-2 border-t border-gray-200/60">
                <Req met={reqs.length} label="At least 8 characters" />
                <Req met={reqs.number} label="One number" />
                <Req met={reqs.upper} label="One uppercase letter" />
                <Req met={reqs.special} label="One special character" />
                <Req met={reqs.lower} label="One lowercase letter" />
              </div>
            </div>
          )}

          {/* Confirm New Password */}
          <div>
            <label style={labelStyle}>Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={inputStyle}
                className="focus:border-brand-primary font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-accent cursor-pointer p-1"
                title={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {/* Match Alert */}
            {showMatchError && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 mt-2">
                <AlertTriangle size={13} />
                <span>Passwords do not match</span>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center gap-3 mt-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-brand-accent bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`px-6 py-2.5 rounded-lg text-sm font-extrabold border-none cursor-pointer transition-colors transition-all ${
                canSubmit
                  ? 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
