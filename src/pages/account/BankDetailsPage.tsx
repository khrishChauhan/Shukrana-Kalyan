import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { supabase } from '../../lib/supabase';
import { Landmark, Download, ShieldCheck, Edit3, Save, X } from 'lucide-react';

export default function BankDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bankData, setBankData] = useState({
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    branch: '',
    upi: '',
    verificationStatus: 'Pending' as string
  });

  useEffect(() => {
    async function fetchBankDetails() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('member_profile')
          .select('bank_details, full_name')
          .eq('id', user.id)
          .single();

        if (data?.bank_details) {
          const bd = data.bank_details;
          setBankData({
            accountHolder: bd.account_holder || data.full_name || '',
            bankName: bd.bank_name || '',
            accountNumber: bd.account_number || '',
            ifsc: bd.ifsc || '',
            branch: bd.branch || '',
            upi: bd.upi || '',
            verificationStatus: bd.verification_status || 'Pending',
          });
        }
      } catch (e) {
        console.error('Error fetching bank details:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchBankDetails();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('member_profile')
        .update({
          bank_details: {
            account_holder: bankData.accountHolder,
            bank_name: bankData.bankName,
            account_number: bankData.accountNumber,
            ifsc: bankData.ifsc,
            branch: bankData.branch,
            upi: bankData.upi,
            verification_status: 'Pending Review',
          }
        })
        .eq('id', user.id);

      if (error) throw error;
      setBankData(prev => ({ ...prev, verificationStatus: 'Pending Review' }));
      setIsEditing(false);
      alert('Bank details saved successfully! They will be reviewed shortly.');
    } catch (e: any) {
      alert(`Error saving: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { label: 'Account Holder Name', key: 'accountHolder' },
    { label: 'Bank Name', key: 'bankName' },
    { label: 'Account Number', key: 'accountNumber' },
    { label: 'IFSC Code', key: 'ifsc', uppercase: true },
    { label: 'Branch Name', key: 'branch' },
    { label: 'UPI ID (Optional)', key: 'upi' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Bank Details"
        description="Manage your primary bank account for receiving payouts."
        breadcrumbs={[{ label: 'Account' }, { label: 'Bank Details' }]}
      />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="w-full h-20 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="font-bold text-[#232F46] flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#ED8C32]" /> Account Information
              </h3>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit3 className="w-4 h-4" /> Edit Details
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="gap-2 text-gray-500">
                  <X className="w-4 h-4" /> Cancel
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(({ label, key, uppercase }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={bankData[key]}
                    onChange={(e) => setBankData({ ...bankData, [key]: e.target.value })}
                    className={`w-full p-2.5 border rounded-lg text-sm font-bold text-[#232F46] ${uppercase ? 'uppercase' : ''} ${isEditing ? 'border-[#ED8C32] focus:outline-none bg-white' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
                  />
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <Button onClick={handleSave} disabled={saving} leftIcon={<Save className="w-4 h-4" />}>
                  {saving ? 'Saving...' : 'Save Bank Details'}
                </Button>
              </div>
            )}
          </Card>

          <div className="space-y-6">
            <Card className="text-center">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Verification Status</h3>
              <div className="flex justify-center mb-4">
                <StatusBadge status={bankData.verificationStatus as any} />
              </div>
              <p className="text-xs text-gray-500">
                Your bank details are currently under review. Payouts will be processed once verified.
              </p>
            </Card>

            <Card>
              <h3 className="font-bold text-[#232F46] mb-4">Verification Proof</h3>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm font-bold text-[#232F46]">Cancelled Cheque</p>
                    <p className="text-xs text-gray-500">Upload for faster verification</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2 text-gray-600" onClick={() => alert('Upload feature coming soon.')}>
                <Download className="w-4 h-4" /> Upload Proof
              </Button>
            </Card>
          </div>
        </div>
      )}
    </motion.div>
  );
}
