/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Camera, CheckCircle2, Lock, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-[1200px] mx-auto px-4 py-2"
    >
      {/* Page Header / Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-5 uppercase tracking-wider">
        <Link to="/dashboard" className="hover:text-[#ED8C32] transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <span>My Account</span>
        <ChevronRight size={12} />
        <span className="text-[#ED8C32]">Profile Settings</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#232F46] tracking-tight m-0">PROFILE SETTINGS</h1>
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
        <Card className="flex flex-col items-center text-center p-6">
          <h2 className="w-full text-left text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-6 border-b border-gray-100 pb-2.5">
            IDENTITY CARD
          </h2>
          
          <div className="relative w-28 h-28 mb-5">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-[#ED8C32]"
            />
            <button 
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#ED8C32] border-2 border-white flex items-center justify-center cursor-pointer hover:bg-[#D97A24] transition-colors"
              title="Change Photo"
            >
              <Camera size={14} className="text-white" />
            </button>
          </div>

          <p className="text-lg font-bold text-[#232F46] mb-1 uppercase tracking-wide">{form.name || 'JOHN DOE'}</p>
          
          <div className="mt-3.5 inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {MEMBER.status}
          </div>
        </Card>

        {/* [Right] FormsContainer */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* ProfileInfoCard */}
          <Card className="p-6">
            <h2 className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-5 border-b border-gray-100 pb-2.5">
              PROFILE INFORMATION
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Input
                  label="Member ID"
                  type="text"
                  value={MEMBER.id}
                  readOnly
                  disabled
                  rightIcon={<Lock size={12} />}
                />
              </div>

              <div>
                <Input
                  label="Join Date"
                  type="text"
                  value={MEMBER.joined}
                  readOnly
                  disabled
                  rightIcon={<Lock size={12} />}
                />
              </div>
            </div>
          </Card>

          {/* ContactInfoCard */}
          <Card className="p-6">
            <h2 className="text-xs font-extrabold text-gray-400 tracking-widest uppercase mb-5 border-b border-gray-100 pb-2.5">
              CONTACT INFORMATION
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Input
                  label="Mobile Number"
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  leftIcon={<Phone size={14} />}
                  required
                />
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  leftIcon={<Mail size={14} />}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide mb-1.5">
                  Address
                </label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#232F46] focus:bg-white focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32] outline-none transition-colors resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* FormActions */}
          <div className="flex justify-end items-center gap-3">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>

      </div>
    </motion.div>
  );
}

