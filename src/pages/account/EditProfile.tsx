/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { User, Upload, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    prefix: 'Mr.',
    fullName: 'Demo User',
    gender: 'Male',
    dob: '1990-01-01',
    country: 'India',
    state: 'Maharashtra',
    district: 'Mumbai',
    pincode: '400001',
    email: 'demo@shukranakalyan.org',
    mobile: '+91 9876543210',
    nomineeName: 'Jane Doe',
    nomineeRelation: 'Spouse'
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "w-full border border-brand-gray/80 rounded-xl px-4 py-2.5 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none bg-white font-sans text-brand-charcoal";
  const selectClass = inputClass;
  const labelClass = "block text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-1.5";

  const SectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white rounded-2xl border border-slate-150 shadow-brand overflow-hidden">
      <div className="px-6 py-4 border-b border-brand-gray bg-brand-gray/50">
        <h3 className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-widest font-mono">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );

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
        <span className="text-brand-light0 uppercase tracking-wider">Edit Profile</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight font-display">Edit Profile</h1>
          <p className="text-xs text-brand-gray0 mt-1">Manage your personal information and account details.</p>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
          <CheckCircle2 size={18} />
          <p className="text-sm font-semibold">Profile updated successfully.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Profile Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-150 shadow-brand p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full ring-4 ring-brand-gray overflow-hidden mb-4 relative group">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="text-white w-5 h-5" />
              </div>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              <button type="button" className="px-3 py-1.5 bg-brand-gray hover:bg-brand-gray/80 border border-brand-gray/80 text-brand-charcoal text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
                <Upload size={13} /> Upload
              </button>
              <button type="button" className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5">
                <Trash2 size={13} /> Remove
              </button>
            </div>

            <div className="space-y-3 text-left border-t border-brand-gray pt-5">
              <div>
                <p className="text-[10px] text-brand-charcoal/50 font-mono font-bold uppercase tracking-widest mb-1">Member ID</p>
                <span className="inline-block bg-brand-primary/10 text-brand-primary border border-brand-primary/30 px-2.5 py-1 rounded-lg text-sm font-black font-mono">SKS-447036</span>
              </div>
              <div>
                <p className="text-[10px] text-brand-charcoal/50 font-mono font-bold uppercase tracking-widest mb-1">Account Status</p>
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>Active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form Sections */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <SectionCard title="Personal Information">
              <div>
                <label className={labelClass}>Prefix</label>
                <select name="prefix" value={formData.prefix} onChange={handleChange} className={selectClass}>
                  <option>Mr.</option><option>Mrs.</option><option>Ms.</option><option>Dr.</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} required />
              </div>
            </SectionCard>

            <SectionCard title="Address Information">
              <div>
                <label className={labelClass}>Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>District</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={inputClass} required />
              </div>
            </SectionCard>

            <SectionCard title="Contact Information">
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Mobile Number</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className={inputClass} required />
              </div>
            </SectionCard>

            <SectionCard title="Nominee Information">
              <div>
                <label className={labelClass}>Nominee Name</label>
                <input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Nominee Relation</label>
                <input type="text" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} className={inputClass} required />
              </div>
            </SectionCard>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={() => setFormData({ ...formData })} className="px-5 py-2.5 border border-brand-gray/80 text-brand-charcoal rounded-xl text-sm font-bold hover:bg-brand-gray transition-colors">
                Reset
              </button>
              <button type="submit" className="px-5 py-2.5 bg-brand-primary text-brand-charcoal rounded-xl text-sm font-black hover:bg-brand-light0 transition-colors shadow-brand">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
