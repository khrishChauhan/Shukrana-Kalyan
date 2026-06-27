import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockBankDetails } from '../../data/mockBusinessData';
import { Landmark, Download, ShieldCheck, Edit3 } from 'lucide-react';

export default function BankDetailsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [bankData, setBankData] = useState(mockBankDetails);

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="font-bold text-[#232F46] flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#ED8C32]" /> Account Information
            </h3>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="gap-2">
              <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Details'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Account Holder Name</label>
              <input 
                type="text"
                disabled={!isEditing}
                value={bankData.accountHolder}
                onChange={(e) => setBankData({...bankData, accountHolder: e.target.value})}
                className={`w-full p-2.5 border rounded-lg text-sm font-bold text-[#232F46] ${isEditing ? 'border-[#ED8C32] focus:outline-none' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bank Name</label>
              <input 
                type="text"
                disabled={!isEditing}
                value={bankData.bankName}
                onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                className={`w-full p-2.5 border rounded-lg text-sm font-bold text-[#232F46] ${isEditing ? 'border-[#ED8C32] focus:outline-none' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Account Number</label>
              <input 
                type="text"
                disabled={!isEditing}
                value={bankData.accountNumber}
                onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                className={`w-full p-2.5 border rounded-lg text-sm font-bold text-[#232F46] ${isEditing ? 'border-[#ED8C32] focus:outline-none' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">IFSC Code</label>
              <input 
                type="text"
                disabled={!isEditing}
                value={bankData.ifsc}
                onChange={(e) => setBankData({...bankData, ifsc: e.target.value})}
                className={`w-full p-2.5 border rounded-lg text-sm font-bold text-[#232F46] uppercase ${isEditing ? 'border-[#ED8C32] focus:outline-none' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Branch Name</label>
              <input 
                type="text"
                disabled={!isEditing}
                value={bankData.branch}
                onChange={(e) => setBankData({...bankData, branch: e.target.value})}
                className={`w-full p-2.5 border rounded-lg text-sm font-bold text-[#232F46] ${isEditing ? 'border-[#ED8C32] focus:outline-none' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">UPI ID (Optional)</label>
              <input 
                type="text"
                disabled={!isEditing}
                value={bankData.upi}
                onChange={(e) => setBankData({...bankData, upi: e.target.value})}
                className={`w-full p-2.5 border rounded-lg text-sm font-bold text-[#232F46] ${isEditing ? 'border-[#ED8C32] focus:outline-none' : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button className="bg-[#ED8C32] text-white hover:bg-[#D97A24] px-8" onClick={() => setIsEditing(false)}>
                Save Changes
              </Button>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="text-center">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Verification Status</h3>
            <div className="flex justify-center mb-4">
              <StatusBadge status={bankData.verificationStatus} />
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
                  <p className="text-xs text-gray-500">Uploaded on Oct 25, 2023</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2 text-gray-600">
              <Download className="w-4 h-4" /> Download Proof
            </Button>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
