import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, CheckCircle2, Lock, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

const MEMBER = {
  name: 'John Doe',
  id: 'SKS-447036',
  mobile: '+91 9876543210',
  email: 'demo@shukrana.org',
  address: '123, Green Colony, Mumbai, Maharashtra - 400001',
  joined: '01 June 2026',
  status: 'Active',
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
      className="max-w-5xl mx-auto pb-10"
    >
      <PageHeader
        title="Profile Settings"
        description="Manage your personal information and account details."
        breadcrumbs={[{ label: 'My Account' }, { label: 'Profile Settings' }]}
      />

      {/* Success banner */}
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center gap-2.5 mb-6">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Profile changes saved successfully.</span>
        </div>
      )}

      {/* ProfileGrid - 2 Columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        
        {/* [Left] IdentityCardContainer */}
        <Card className="flex flex-col items-center text-center">
          <div className="relative w-28 h-28 mb-5 mt-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-[#ED8C32]"
            />
            <button 
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#ED8C32] border-2 border-white flex items-center justify-center cursor-pointer hover:bg-[#D97A24] transition-colors shadow-sm"
              title="Change Photo"
            >
              <Camera size={14} className="text-white" />
            </button>
          </div>

          <p className="text-lg font-bold text-[#232F46] mb-2">{form.name || 'JOHN DOE'}</p>
          <StatusBadge status={MEMBER.status as any} />
        </Card>

        {/* [Right] FormsContainer */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* ProfileInfoCard */}
          <Card noPadding>
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-[#232F46]">Profile Information</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  rightIcon={<Lock size={14} />}
                />
              </div>

              <div>
                <Input
                  label="Join Date"
                  type="text"
                  value={MEMBER.joined}
                  readOnly
                  disabled
                  rightIcon={<Lock size={14} />}
                />
              </div>
            </div>
          </Card>

          {/* ContactInfoCard */}
          <Card noPadding>
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-[#232F46]">Contact Information</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Input
                  label="Mobile Number"
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  leftIcon={<Phone size={14} className="text-gray-400" />}
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
                  leftIcon={<Mail size={14} className="text-gray-400" />}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#232F46] mb-1.5">
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
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>

      </div>
    </motion.div>
  );
}

