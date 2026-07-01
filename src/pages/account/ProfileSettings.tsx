import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, CheckCircle2, Lock, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { supabase } from '../../lib/supabase';

export default function ProfileSettings() {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
  });
  const [initialForm, setInitialForm] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
  });
  const [memberId, setMemberId] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [memberStatus, setMemberStatus] = useState<any>('PENDING');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: memberData } = await supabase
          .from('members')
          .select('member_id, status, created_at, member_profile(*)')
          .eq('id', user.id)
          .single();

        if (memberData) {
          setMemberId(memberData.member_id);
          setMemberStatus(memberData.status);
          setJoinDate(new Date(memberData.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
          
          if (memberData.member_profile) {
             const profileData = Array.isArray(memberData.member_profile) ? memberData.member_profile[0] : memberData.member_profile;
             if (profileData) {
               const formData = {
                 name: profileData.full_name || '',
                 mobile: profileData.phone_number || '',
                 email: profileData.email || '',
                 address: profileData.address || ''
               };
               setForm(formData);
               setInitialForm(formData);
             }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { error } = await supabase
        .from('member_profile')
        .update({
          full_name: form.name,
          email: form.email,
          address: form.address
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setInitialForm(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(`Error updating profile: ${err.message}`);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
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

      {/* Profile Forms */}
      <div className="max-w-3xl mx-auto items-start">

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
                  value={memberId}
                  readOnly
                  disabled
                  rightIcon={<Lock size={14} />}
                />
              </div>

              <div>
                <Input
                  label="Join Date"
                  type="text"
                  value={joinDate}
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
                  readOnly
                  disabled
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

