/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Camera, CheckCircle2, Lock, Phone, Mail, MapPin } from 'lucide-react';

const MEMBER = {
  name: 'John Doe',
  id: 'SKS-447036',
  mobile: '+91 9876543210',
  email: 'demo@shukrana.org',
  address: '123, Green Colony, Mumbai, Maharashtra - 400001',
  joined: '01 June 2026',
  status: 'Active Member',
};

export default function ProfileSettings() {
  const [form, setForm] = useState({
    name: MEMBER.name,
    mobile: MEMBER.mobile,
    email: MEMBER.email,
    address: MEMBER.address,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      name: MEMBER.name,
      mobile: MEMBER.mobile,
      email: MEMBER.email,
      address: MEMBER.address,
    });
  };

  // Flat styling helper
  const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '12px 14px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#232F46',
    outline: 'none',
    backgroundColor: '#FFFFFF',
    transition: 'border-color 0.2s',
  };

  const readOnlyInputStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    cursor: 'not-allowed',
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
        <span className="text-brand-primary">Profile Settings</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-accent tracking-tight m-0">PROFILE SETTINGS</h1>
        <p className="text-sm text-gray-500 mt-1.5">Manage your personal information and account details.</p>
      </div>

      {/* Success banner */}
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center gap-2.5 mb-6">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Profile changes saved successfully.</span>
        </div>
      )}

      {/* ProfileGrid - 2 Columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        
        {/* [Left] IdentityCardContainer */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center">
          <h2 className="w-full text-left text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-6 border-b border-gray-100 pb-2.5">
            IDENTITY CARD
          </h2>
          
          <div className="relative w-28 h-28 mb-5">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-brand-primary"
            />
            <button 
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-primary border-2 border-white flex items-center justify-center cursor-pointer hover:bg-brand-primary-hover transition-colors"
              title="Change Photo"
            >
              <Camera size={14} className="text-white" />
            </button>
          </div>

          <p className="text-lg font-bold text-brand-accent mb-1 uppercase tracking-wide">{form.name || 'JOHN DOE'}</p>
          
          <div className="mt-3.5 inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {MEMBER.status}
          </div>
        </div>

        {/* [Right] FormsContainer */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* ProfileInfoCard */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-5 border-b border-gray-100 pb-2.5">
              PROFILE INFORMATION
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus:border-brand-primary"
                  required
                />
              </div>

              <div>
                <label style={labelStyle} className="flex items-center gap-1">
                  Member ID <Lock size={12} className="text-gray-400" />
                </label>
                <input
                  type="text"
                  value={MEMBER.id}
                  style={readOnlyInputStyle}
                  readOnly
                />
              </div>

              <div>
                <label style={labelStyle} className="flex items-center gap-1">
                  Join Date <Lock size={12} className="text-gray-400" />
                </label>
                <input
                  type="text"
                  value={MEMBER.joined}
                  style={readOnlyInputStyle}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* ContactInfoCard */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-5 border-b border-gray-100 pb-2.5">
              CONTACT INFORMATION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Mobile Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft: '38px' }}
                    className="focus:border-brand-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft: '38px' }}
                    className="focus:border-brand-primary"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label style={labelStyle}>Address</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3.5 top-4.5 text-gray-400" />
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    style={{ ...inputStyle, paddingLeft: '38px', resize: 'none' }}
                    className="focus:border-brand-primary"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FormActions */}
          <div className="flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-brand-accent bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-brand-primary text-sm font-extrabold text-white hover:bg-brand-primary-hover border-none cursor-pointer transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </motion.div>
  );
}

