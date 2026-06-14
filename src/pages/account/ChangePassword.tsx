/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Lock, Eye, EyeOff, CheckCircle2, XCircle, Shield, AlertTriangle } from 'lucide-react';

const PasswordInput = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Lock size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '12px 44px 12px 38px', fontSize: '14px', fontFamily: 'inherit', color: '#232F46', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
        />
        <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 0 }}>
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

const Req = ({ met, label }: { met: boolean; label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: met ? '#059669' : '#9ca3af', transition: 'color 0.2s' }}>
    {met ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
    <span style={{ fontWeight: 500 }}>{label}</span>
  </div>
);

export default function ChangePassword() {
  const [current, setCurrent] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  const reqs = useMemo(() => ({
    length: newPw.length >= 8,
    upper: /[A-Z]/.test(newPw),
    lower: /[a-z]/.test(newPw),
    number: /[0-9]/.test(newPw),
    special: /[^A-Za-z0-9]/.test(newPw),
  }), [newPw]);

  const score = Object.values(reqs).filter(Boolean).length;

  const strengthColor = score === 0 ? '#e5e7eb' : score <= 2 ? '#ef4444' : score <= 4 ? '#ED8C32' : '#10b981';
  const strengthLabel = score === 0 ? '' : score <= 2 ? 'Weak' : score <= 4 ? 'Fair' : 'Strong';
  const strengthTextColor = score === 0 ? '#9ca3af' : score <= 2 ? '#ef4444' : score <= 4 ? '#ED8C32' : '#10b981';

  const canSubmit = score === 5 && newPw === confirm && current.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setDone(true);
    setTimeout(() => setDone(false), 3500);
    setCurrent(''); setNewPw(''); setConfirm('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '24px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <Link to="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Dashboard</Link>
        <ChevronRight size={12} />
        <span>My Account</span>
        <ChevronRight size={12} />
        <span style={{ color: '#ED8C32' }}>Change Password</span>
      </nav>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#232F46', margin: 0, letterSpacing: '-0.02em', fontFamily: 'Poppins, sans-serif' }}>Security Settings</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>Update your password to keep your account secure.</p>
      </div>

      {done && (
        <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#059669' }}>Password updated successfully!</span>
        </div>
      )}

      <div style={{ display: 'grid', gap: '24px', maxWidth: '900px' }} className="grid-cols-1 lg:grid-cols-[1fr_320px]">

        {/* Form Card */}
        <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(35,47,70,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(237,140,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={18} color="#ED8C32" />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#232F46', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Change Password</h2>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Choose a strong, unique password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <PasswordInput label="Current Password" value={current} onChange={setCurrent} placeholder="Enter current password" />
            <PasswordInput label="New Password" value={newPw} onChange={setNewPw} placeholder="Enter new password" />

            {/* Strength meter */}
            {newPw.length > 0 && (
              <div style={{ marginBottom: '20px', marginTop: '-10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Strength</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: strengthTextColor }}>{strengthLabel}</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', height: '4px' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{ flex: 1, borderRadius: '999px', background: i <= score ? strengthColor : '#f3f4f6', transition: 'background 0.3s' }} />
                  ))}
                </div>
              </div>
            )}

            <PasswordInput label="Confirm New Password" value={confirm} onChange={setConfirm} placeholder="Re-enter new password" />

            {/* Match check */}
            {confirm.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginTop: '-12px', marginBottom: '16px', color: newPw === confirm ? '#059669' : '#ef4444', fontWeight: 600 }}>
                {newPw === confirm ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                {newPw === confirm ? 'Passwords match' : 'Passwords do not match'}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
              <button type="button" onClick={() => { setCurrent(''); setNewPw(''); setConfirm(''); }} style={{ padding: '11px 22px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" disabled={!canSubmit} style={{ padding: '11px 24px', borderRadius: '10px', border: 'none', background: canSubmit ? '#ED8C32' : '#e5e7eb', color: canSubmit ? '#fff' : '#9ca3af', fontSize: '14px', fontWeight: 700, cursor: canSubmit ? 'pointer' : 'not-allowed', boxShadow: canSubmit ? '0 2px 8px rgba(237,140,50,0.3)' : 'none', transition: 'all 0.2s' }}>Update Password</button>
            </div>
          </form>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Requirements */}
          <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(35,47,70,0.06)' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#232F46', marginBottom: '14px', marginTop: 0 }}>Password Requirements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Req met={reqs.length} label="At least 8 characters" />
              <Req met={reqs.upper} label="One uppercase letter" />
              <Req met={reqs.lower} label="One lowercase letter" />
              <Req met={reqs.number} label="One number" />
              <Req met={reqs.special} label="One special character" />
            </div>
          </div>

          {/* Security tips */}
          <div style={{ background: 'rgba(237,140,50,0.07)', border: '1px solid rgba(237,140,50,0.2)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Shield size={16} color="#ED8C32" />
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#232F46', margin: 0 }}>Security Tips</h3>
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 4px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Never share your password with anyone.', 'Use a unique password not used elsewhere.', 'Change your password every 3 months.', 'Avoid using personal information.'].map(tip => (
                <li key={tip} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
                  <span style={{ color: '#ED8C32', flexShrink: 0, marginTop: '1px' }}>•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
