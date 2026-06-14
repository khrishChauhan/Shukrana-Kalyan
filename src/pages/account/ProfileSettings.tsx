/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, Camera, CheckCircle2, Shield, Calendar, MapPin, Phone, Mail, Edit3 } from 'lucide-react';

const MEMBER = {
  name: 'Demo User',
  id: 'SKS-447036',
  mobile: '+91 9876543210',
  email: 'demo@shukranakalyan.org',
  address: '123, Green Colony, Mumbai, Maharashtra - 400001',
  joined: '01 June 2026',
  status: 'Active',
  completion: 75,
};

export default function ProfileSettings() {
  const [form, setForm] = useState({ name: MEMBER.name, mobile: MEMBER.mobile, email: MEMBER.email, address: MEMBER.address });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    padding: '11px 14px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#232F46',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#9ca3af', marginBottom: '24px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <Link to="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none' }}>Dashboard</Link>
        <ChevronRight size={12} />
        <span style={{ color: '#9ca3af' }}>My Account</span>
        <ChevronRight size={12} />
        <span style={{ color: '#ED8C32' }}>Profile Settings</span>
      </nav>

      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#232F46', margin: 0, letterSpacing: '-0.02em', fontFamily: 'Poppins, sans-serif' }}>Profile Settings</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>Manage your personal information and membership details.</p>
      </div>

      {/* Success banner */}
      {saved && (
        <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#059669' }}>Profile updated successfully.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: '24px', maxWidth: '1200px' }} className="md:grid-cols-[300px_1fr]">

        {/* LEFT: Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Photo card */}
          <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '28px 24px', boxShadow: '0 2px 12px rgba(35,47,70,0.06)', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 20px' }}>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ED8C32' }}
              />
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px', borderRadius: '50%', background: '#ED8C32', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Camera size={13} color="#fff" />
              </button>
            </div>
            <p style={{ fontSize: '17px', fontWeight: 700, color: '#232F46', margin: '0 0 4px', fontFamily: 'Poppins, sans-serif' }}>{MEMBER.name}</p>
            <p style={{ fontSize: '12px', color: '#ED8C32', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.05em', margin: '0 0 16px' }}>{MEMBER.id}</p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '20px', padding: '4px 12px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>Active Member</span>
            </div>

            <div style={{ marginTop: '20px', padding: '16px', background: '#f9fafb', borderRadius: '12px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Calendar size={14} color="#ED8C32" />
                <div>
                  <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Member Since</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#232F46', margin: 0 }}>{MEMBER.joined}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={14} color="#ED8C32" />
                <div>
                  <p style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Account Type</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#232F46', margin: 0 }}>General Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 12px rgba(35,47,70,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#232F46' }}>Profile Completion</span>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#ED8C32' }}>{MEMBER.completion}%</span>
            </div>
            <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${MEMBER.completion}%`, background: 'linear-gradient(90deg, #ED8C32, #f5a855)', borderRadius: '999px', transition: 'width 1s ease' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>Add email & address to reach 100%</p>
          </div>
        </div>

        {/* RIGHT: Edit Form */}
        <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(35,47,70,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(237,140,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Edit3 size={18} color="#ED8C32" />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#232F46', margin: 0, fontFamily: 'Poppins, sans-serif' }}>Personal Information</h2>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Update your details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '20px' }} className="grid-cols-1 md:grid-cols-2">

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input name="name" value={form.name} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '36px' }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input name="mobile" value={form.mobile} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '36px' }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input name="email" value={form.email} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '36px' }} />
                </div>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={15} style={{ position: 'absolute', left: '12px', top: '16px', color: '#9ca3af' }} />
                  <textarea name="address" value={form.address} onChange={handleChange} rows={2} style={{ ...inputStyle, paddingLeft: '36px', resize: 'vertical' }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Date Joined</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input value={MEMBER.joined} readOnly style={{ ...inputStyle, paddingLeft: '36px', backgroundColor: '#f9fafb', cursor: 'not-allowed', color: '#6b7280' }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Member ID</label>
                <input value={MEMBER.id} readOnly style={{ ...inputStyle, backgroundColor: '#f9fafb', cursor: 'not-allowed', fontFamily: 'monospace', fontWeight: 700, color: '#ED8C32' }} />
              </div>

            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
              <button type="button" style={{ padding: '11px 22px', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '11px 24px', borderRadius: '10px', border: 'none', background: '#ED8C32', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(237,140,50,0.3)' }}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
