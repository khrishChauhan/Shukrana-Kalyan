import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockWithdrawals, mockBankDetails } from '../../data/mockBusinessData';
import { Banknote, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function WithdrawalCenterPage() {
  const [amount, setAmount] = useState<number | ''>('');
  
  const tds = amount ? Number(amount) * 0.05 : 0;
  const adminCharges = amount ? Number(amount) * 0.05 : 0;
  const donation = amount ? Number(amount) * 0.02 : 0; // Configurable logic based on settings
  const netPayable = amount ? Number(amount) - tds - adminCharges - donation : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Withdrawal Center"
        description="Request payout withdrawals directly to your registered bank account."
        breadcrumbs={[{ label: 'Business' }, { label: 'Wallet Center' }, { label: 'Withdrawals' }]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#232F46] text-white flex flex-col justify-center">
          <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">Available Balance</p>
          <p className="text-2xl font-black text-[#ED8C32]">₹{mockWithdrawals.availableBalance.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Pending Requests</p>
          <p className="text-xl font-bold text-[#232F46]">{mockWithdrawals.pendingRequests}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Completed Withdrawals</p>
          <p className="text-xl font-bold text-green-600">{mockWithdrawals.completedWithdrawals}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Rejected</p>
          <p className="text-xl font-bold text-red-600">{mockWithdrawals.rejectedWithdrawals}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <Banknote className="w-5 h-5 text-[#232F46]" />
            <h3 className="font-bold text-[#232F46]">New Withdrawal</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Requested Amount (₹)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder={`Min ₹${mockWithdrawals.minWithdrawal}`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
              />
              {amount && amount < mockWithdrawals.minWithdrawal && (
                <p className="text-xs text-red-500 mt-1">Minimum withdrawal is ₹{mockWithdrawals.minWithdrawal}</p>
              )}
              {amount && amount > mockWithdrawals.availableBalance && (
                <p className="text-xs text-red-500 mt-1">Amount exceeds available balance.</p>
              )}
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Bank Details</h4>
              <p className="text-sm font-bold text-[#232F46]">{mockBankDetails.accountHolder}</p>
              <p className="text-sm text-gray-600">{mockBankDetails.bankName} - {mockBankDetails.accountNumber}</p>
              <p className="text-xs text-gray-500 mt-1">IFSC: {mockBankDetails.ifsc}</p>
            </div>

            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 space-y-2">
              <h4 className="text-xs font-bold text-[#ED8C32] uppercase mb-2">Preview</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Requested Amount</span>
                <span className="font-bold text-[#232F46]">₹{amount || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-500">TDS (5%)</span>
                <span className="font-bold text-red-500">-₹{tds}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-500">Admin Charges (5%)</span>
                <span className="font-bold text-red-500">-₹{adminCharges}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-500">Donation (2%)</span>
                <span className="font-bold text-blue-500">-₹{donation}</span>
              </div>
              <div className="pt-2 mt-2 border-t border-orange-200 flex justify-between">
                <span className="font-bold text-[#232F46]">Net Payable</span>
                <span className="font-black text-green-600 text-lg">₹{netPayable}</span>
              </div>
            </div>

            <Button className="w-full bg-[#ED8C32] hover:bg-[#D97A24] text-white">
              Submit Request
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden flex flex-col p-0">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-[#232F46]">Withdrawal History</h3>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Requested</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">TDS</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Admin</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Donation</th>
                  <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-right">Net</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTR</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Processed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockWithdrawals.history.map((record, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 text-xs font-medium text-[#232F46]">{record.date}</td>
                    <td className="p-3 text-xs text-right font-bold text-[#232F46]">₹{record.amount}</td>
                    <td className="p-3 text-xs text-right text-red-500">-₹{record.tds}</td>
                    <td className="p-3 text-xs text-right text-red-500">-₹{record.admin}</td>
                    <td className="p-3 text-xs text-right text-blue-500">-₹{record.donation}</td>
                    <td className="p-3 text-xs text-right font-bold text-green-600 bg-green-50/30">₹{record.net}</td>
                    <td className="p-3 text-center">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="p-3 text-xs font-mono text-gray-500">{record.utr}</td>
                    <td className="p-3 text-xs text-gray-500">{record.processed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
